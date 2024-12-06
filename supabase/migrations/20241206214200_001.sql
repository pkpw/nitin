

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE EXTENSION IF NOT EXISTS "pg_net" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";






COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE TYPE "public"."theme" AS ENUM (
    'system',
    'light',
    'dark'
);


ALTER TYPE "public"."theme" OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO ''
    AS $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$;


ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."answers" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "question_id" "uuid",
    "answer" "text",
    "is_correct" boolean,
    "order" bigint
);


ALTER TABLE "public"."answers" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."classroom_decks" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "classroom_id" "uuid",
    "deck_id" "uuid",
    "created_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."classroom_decks" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."classrooms" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" character varying(32) NOT NULL,
    "description" "text",
    "owner_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp without time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp without time zone DEFAULT "now"() NOT NULL,
    "created_by" "uuid"
);


ALTER TABLE "public"."classrooms" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."decks" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "owner_id" "uuid" NOT NULL,
    "title" "text",
    "color" "text"
);


ALTER TABLE "public"."decks" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."flashcards" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "title" "text" NOT NULL,
    "front" "json" DEFAULT '[{"insert":""}]'::"json",
    "back" "json" DEFAULT '[{"insert":""}]'::"json",
    "deck_id" "uuid" NOT NULL,
    "order" bigint NOT NULL
);


ALTER TABLE "public"."flashcards" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "id" "uuid" NOT NULL,
    "first_name" "text",
    "last_name" "text",
    "email" "text" NOT NULL,
    "is_onboarded" boolean DEFAULT false NOT NULL,
    "avatar_color" "text",
    "created_at" timestamp without time zone DEFAULT "now"() NOT NULL,
    "onboarded_at" timestamp without time zone,
    "theme" "public"."theme" DEFAULT 'system'::"public"."theme" NOT NULL,
    "updated_at" timestamp without time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."profiles" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."questions" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "quiz_id" "uuid",
    "question" "text",
    "order" bigint
);


ALTER TABLE "public"."questions" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."quizzes" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "owner_id" "uuid" DEFAULT "auth"."uid"(),
    "created_at" timestamp without time zone DEFAULT "now"(),
    "title" "text",
    "color" "text"
);


ALTER TABLE "public"."quizzes" OWNER TO "postgres";


ALTER TABLE ONLY "public"."answers"
    ADD CONSTRAINT "answers_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."classroom_decks"
    ADD CONSTRAINT "classroom_decks_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."classrooms"
    ADD CONSTRAINT "classrooms_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."decks"
    ADD CONSTRAINT "decks_id_key" UNIQUE ("id");



ALTER TABLE ONLY "public"."decks"
    ADD CONSTRAINT "decks_pkey" PRIMARY KEY ("id", "owner_id");



ALTER TABLE ONLY "public"."flashcards"
    ADD CONSTRAINT "flashcards_pkey" PRIMARY KEY ("id", "deck_id");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_email_key" UNIQUE ("email");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."questions"
    ADD CONSTRAINT "questions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."quizzes"
    ADD CONSTRAINT "quizzes_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."classroom_decks"
    ADD CONSTRAINT "unique_classroom_deck" UNIQUE ("classroom_id", "deck_id");



ALTER TABLE ONLY "public"."quizzes"
    ADD CONSTRAINT "unique_quiz_title_per_owner" UNIQUE ("owner_id", "title");



CREATE INDEX "decks_owner_id_idx" ON "public"."decks" USING "hash" ("owner_id");



CREATE INDEX "flashcards_deck_id_idx" ON "public"."flashcards" USING "hash" ("deck_id");



CREATE UNIQUE INDEX "unique_deck_title" ON "public"."decks" USING "btree" ("owner_id", "title");



CREATE UNIQUE INDEX "unique_flashcard_title" ON "public"."flashcards" USING "btree" ("deck_id", "title");



ALTER TABLE ONLY "public"."answers"
    ADD CONSTRAINT "answers_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "public"."questions"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."classroom_decks"
    ADD CONSTRAINT "classroom_decks_deck_id_fkey" FOREIGN KEY ("deck_id") REFERENCES "public"."decks"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."classrooms"
    ADD CONSTRAINT "classrooms_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."decks"
    ADD CONSTRAINT "decks_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."flashcards"
    ADD CONSTRAINT "flashcards_deck_id_fkey" FOREIGN KEY ("deck_id") REFERENCES "public"."decks"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."questions"
    ADD CONSTRAINT "questions_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "public"."quizzes"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."quizzes"
    ADD CONSTRAINT "quizzes_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "public"."profiles"("id");



CREATE POLICY "Answers policy" ON "public"."answers" USING (true);



CREATE POLICY "Enable delete for owners" ON "public"."quizzes" FOR DELETE USING (("auth"."uid"() = "owner_id"));



CREATE POLICY "Enable delete for quiz owners" ON "public"."answers" FOR DELETE USING ((EXISTS ( SELECT 1
   FROM ("public"."questions" "q"
     JOIN "public"."quizzes" "qz" ON (("q"."quiz_id" = "qz"."id")))
  WHERE (("q"."id" = "answers"."question_id") AND ("qz"."owner_id" = "auth"."uid"())))));



CREATE POLICY "Enable delete for quiz owners" ON "public"."questions" FOR DELETE USING ((EXISTS ( SELECT 1
   FROM "public"."quizzes"
  WHERE (("quizzes"."id" = "questions"."quiz_id") AND ("quizzes"."owner_id" = "auth"."uid"())))));



CREATE POLICY "Enable insert for authenticated users only" ON "public"."quizzes" FOR INSERT WITH CHECK (("auth"."uid"() = "owner_id"));



CREATE POLICY "Enable insert for quiz owners" ON "public"."answers" FOR INSERT WITH CHECK ((EXISTS ( SELECT 1
   FROM ("public"."questions" "q"
     JOIN "public"."quizzes" "qz" ON (("q"."quiz_id" = "qz"."id")))
  WHERE (("q"."id" = "answers"."question_id") AND ("qz"."owner_id" = "auth"."uid"())))));



CREATE POLICY "Enable insert for quiz owners" ON "public"."questions" FOR INSERT WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."quizzes"
  WHERE (("quizzes"."id" = "questions"."quiz_id") AND ("quizzes"."owner_id" = "auth"."uid"())))));



CREATE POLICY "Enable read access for all users" ON "public"."answers" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."questions" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."quizzes" FOR SELECT USING (true);



CREATE POLICY "Enable update for owners" ON "public"."quizzes" FOR UPDATE USING (("auth"."uid"() = "owner_id"));



CREATE POLICY "Enable update for quiz owners" ON "public"."answers" FOR UPDATE USING ((EXISTS ( SELECT 1
   FROM ("public"."questions" "q"
     JOIN "public"."quizzes" "qz" ON (("q"."quiz_id" = "qz"."id")))
  WHERE (("q"."id" = "answers"."question_id") AND ("qz"."owner_id" = "auth"."uid"())))));



CREATE POLICY "Enable update for quiz owners" ON "public"."questions" FOR UPDATE USING ((EXISTS ( SELECT 1
   FROM "public"."quizzes"
  WHERE (("quizzes"."id" = "questions"."quiz_id") AND ("quizzes"."owner_id" = "auth"."uid"())))));



CREATE POLICY "Owners can modify their flashcard decks." ON "public"."decks" USING ((( SELECT "auth"."uid"() AS "uid") = "owner_id"));



CREATE POLICY "Owners of a flashcard deck can modify the flashcards in it." ON "public"."flashcards" USING (("deck_id" IN ( SELECT "decks"."id"
   FROM "public"."decks"
  WHERE ("decks"."owner_id" = ( SELECT "auth"."uid"() AS "uid")))));



CREATE POLICY "Questions policy" ON "public"."questions" USING (true);



CREATE POLICY "Quizzes policy" ON "public"."quizzes" USING (("auth"."uid"() = "owner_id"));



CREATE POLICY "User can see their own profile only." ON "public"."profiles" FOR SELECT TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "id"));



CREATE POLICY "Users can create a profile." ON "public"."profiles" FOR INSERT TO "authenticated" WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "id"));



CREATE POLICY "Users can delete a profile." ON "public"."profiles" FOR DELETE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "id"));



CREATE POLICY "Users can manage answers" ON "public"."answers" USING (("auth"."uid"() IN ( SELECT "quizzes"."owner_id"
   FROM "public"."quizzes"
  WHERE ("quizzes"."id" = ( SELECT "questions"."quiz_id"
           FROM "public"."questions"
          WHERE ("questions"."id" = "answers"."question_id"))))));



CREATE POLICY "Users can manage questions" ON "public"."questions" USING (("auth"."uid"() IN ( SELECT "quizzes"."owner_id"
   FROM "public"."quizzes"
  WHERE ("quizzes"."id" = "questions"."quiz_id"))));



CREATE POLICY "Users can manage their own quizzes" ON "public"."quizzes" USING (("auth"."uid"() = "owner_id"));



CREATE POLICY "Users can update their own profile." ON "public"."profiles" FOR UPDATE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "id")) WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "id"));



CREATE POLICY "Users can view answers" ON "public"."answers" FOR SELECT USING (true);



CREATE POLICY "Users can view questions" ON "public"."questions" FOR SELECT USING (true);



CREATE POLICY "Users can view quizzes" ON "public"."quizzes" FOR SELECT USING (true);



CREATE POLICY "allow_inserts_based_on_classroom_owner" ON "public"."classroom_decks" FOR INSERT TO "authenticated" WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."classrooms"
  WHERE (("classrooms"."id" = "classroom_decks"."classroom_id") AND ("classrooms"."created_by" = "auth"."uid"())))));



CREATE POLICY "allow_select_based_on_classroom_owner" ON "public"."classroom_decks" FOR SELECT TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "public"."classrooms"
  WHERE (("classrooms"."id" = "classroom_decks"."classroom_id") AND ("classrooms"."created_by" = "auth"."uid"())))));



ALTER TABLE "public"."answers" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."classroom_decks" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."decks" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."flashcards" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."questions" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."quizzes" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";





GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";


























































































































































































GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";


















GRANT ALL ON TABLE "public"."answers" TO "anon";
GRANT ALL ON TABLE "public"."answers" TO "authenticated";
GRANT ALL ON TABLE "public"."answers" TO "service_role";



GRANT ALL ON TABLE "public"."classroom_decks" TO "anon";
GRANT ALL ON TABLE "public"."classroom_decks" TO "authenticated";
GRANT ALL ON TABLE "public"."classroom_decks" TO "service_role";



GRANT ALL ON TABLE "public"."classrooms" TO "anon";
GRANT ALL ON TABLE "public"."classrooms" TO "authenticated";
GRANT ALL ON TABLE "public"."classrooms" TO "service_role";



GRANT ALL ON TABLE "public"."decks" TO "anon";
GRANT ALL ON TABLE "public"."decks" TO "authenticated";
GRANT ALL ON TABLE "public"."decks" TO "service_role";



GRANT ALL ON TABLE "public"."flashcards" TO "anon";
GRANT ALL ON TABLE "public"."flashcards" TO "authenticated";
GRANT ALL ON TABLE "public"."flashcards" TO "service_role";



GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";



GRANT ALL ON TABLE "public"."questions" TO "anon";
GRANT ALL ON TABLE "public"."questions" TO "authenticated";
GRANT ALL ON TABLE "public"."questions" TO "service_role";



GRANT ALL ON TABLE "public"."quizzes" TO "anon";
GRANT ALL ON TABLE "public"."quizzes" TO "authenticated";
GRANT ALL ON TABLE "public"."quizzes" TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";






























RESET ALL;

--
-- Dumped schema changes for auth and storage
--

CREATE OR REPLACE TRIGGER "on_auth_user_created" AFTER INSERT ON "auth"."users" FOR EACH ROW EXECUTE FUNCTION "public"."handle_new_user"();



