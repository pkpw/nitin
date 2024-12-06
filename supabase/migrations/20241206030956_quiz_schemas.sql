create table "public"."answers" (
    "id" uuid not null default gen_random_uuid(),
    "question_id" uuid,
    "answer" text,
    "is_correct" boolean,
    "order" bigint
);


alter table "public"."answers" enable row level security;

create table "public"."questions" (
    "id" uuid not null default gen_random_uuid(),
    "quiz_id" uuid,
    "question" text,
    "order" bigint
);


alter table "public"."questions" enable row level security;

create table "public"."quizzes" (
    "id" uuid not null default gen_random_uuid(),
    "owner_id" uuid default auth.uid(),
    "created_at" timestamp without time zone default now(),
    "title" text,
    "color" text
);


alter table "public"."quizzes" enable row level security;

CREATE UNIQUE INDEX answers_pkey ON public.answers USING btree (id);

CREATE UNIQUE INDEX questions_pkey ON public.questions USING btree (id);

CREATE UNIQUE INDEX quizzes_pkey ON public.quizzes USING btree (id);

CREATE UNIQUE INDEX unique_quiz_title_per_owner ON public.quizzes USING btree (owner_id, title);

alter table "public"."answers" add constraint "answers_pkey" PRIMARY KEY using index "answers_pkey";

alter table "public"."questions" add constraint "questions_pkey" PRIMARY KEY using index "questions_pkey";

alter table "public"."quizzes" add constraint "quizzes_pkey" PRIMARY KEY using index "quizzes_pkey";

alter table "public"."answers" add constraint "answers_question_id_fkey" FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE not valid;

alter table "public"."answers" validate constraint "answers_question_id_fkey";

alter table "public"."questions" add constraint "questions_quiz_id_fkey" FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE not valid;

alter table "public"."questions" validate constraint "questions_quiz_id_fkey";

alter table "public"."quizzes" add constraint "quizzes_owner_id_fkey" FOREIGN KEY (owner_id) REFERENCES profiles(id) not valid;

alter table "public"."quizzes" validate constraint "quizzes_owner_id_fkey";

alter table "public"."quizzes" add constraint "unique_quiz_title_per_owner" UNIQUE using index "unique_quiz_title_per_owner";

grant delete on table "public"."answers" to "anon";

grant insert on table "public"."answers" to "anon";

grant references on table "public"."answers" to "anon";

grant select on table "public"."answers" to "anon";

grant trigger on table "public"."answers" to "anon";

grant truncate on table "public"."answers" to "anon";

grant update on table "public"."answers" to "anon";

grant delete on table "public"."answers" to "authenticated";

grant insert on table "public"."answers" to "authenticated";

grant references on table "public"."answers" to "authenticated";

grant select on table "public"."answers" to "authenticated";

grant trigger on table "public"."answers" to "authenticated";

grant truncate on table "public"."answers" to "authenticated";

grant update on table "public"."answers" to "authenticated";

grant delete on table "public"."answers" to "service_role";

grant insert on table "public"."answers" to "service_role";

grant references on table "public"."answers" to "service_role";

grant select on table "public"."answers" to "service_role";

grant trigger on table "public"."answers" to "service_role";

grant truncate on table "public"."answers" to "service_role";

grant update on table "public"."answers" to "service_role";

grant delete on table "public"."questions" to "anon";

grant insert on table "public"."questions" to "anon";

grant references on table "public"."questions" to "anon";

grant select on table "public"."questions" to "anon";

grant trigger on table "public"."questions" to "anon";

grant truncate on table "public"."questions" to "anon";

grant update on table "public"."questions" to "anon";

grant delete on table "public"."questions" to "authenticated";

grant insert on table "public"."questions" to "authenticated";

grant references on table "public"."questions" to "authenticated";

grant select on table "public"."questions" to "authenticated";

grant trigger on table "public"."questions" to "authenticated";

grant truncate on table "public"."questions" to "authenticated";

grant update on table "public"."questions" to "authenticated";

grant delete on table "public"."questions" to "service_role";

grant insert on table "public"."questions" to "service_role";

grant references on table "public"."questions" to "service_role";

grant select on table "public"."questions" to "service_role";

grant trigger on table "public"."questions" to "service_role";

grant truncate on table "public"."questions" to "service_role";

grant update on table "public"."questions" to "service_role";

grant delete on table "public"."quizzes" to "anon";

grant insert on table "public"."quizzes" to "anon";

grant references on table "public"."quizzes" to "anon";

grant select on table "public"."quizzes" to "anon";

grant trigger on table "public"."quizzes" to "anon";

grant truncate on table "public"."quizzes" to "anon";

grant update on table "public"."quizzes" to "anon";

grant delete on table "public"."quizzes" to "authenticated";

grant insert on table "public"."quizzes" to "authenticated";

grant references on table "public"."quizzes" to "authenticated";

grant select on table "public"."quizzes" to "authenticated";

grant trigger on table "public"."quizzes" to "authenticated";

grant truncate on table "public"."quizzes" to "authenticated";

grant update on table "public"."quizzes" to "authenticated";

grant delete on table "public"."quizzes" to "service_role";

grant insert on table "public"."quizzes" to "service_role";

grant references on table "public"."quizzes" to "service_role";

grant select on table "public"."quizzes" to "service_role";

grant trigger on table "public"."quizzes" to "service_role";

grant truncate on table "public"."quizzes" to "service_role";

grant update on table "public"."quizzes" to "service_role";

create policy "Answers policy"
on "public"."answers"
as permissive
for all
to public
using (true);


create policy "Enable delete for quiz owners"
on "public"."answers"
as permissive
for delete
to public
using ((EXISTS ( SELECT 1
   FROM (questions q
     JOIN quizzes qz ON ((q.quiz_id = qz.id)))
  WHERE ((q.id = answers.question_id) AND (qz.owner_id = auth.uid())))));


create policy "Enable insert for quiz owners"
on "public"."answers"
as permissive
for insert
to public
with check ((EXISTS ( SELECT 1
   FROM (questions q
     JOIN quizzes qz ON ((q.quiz_id = qz.id)))
  WHERE ((q.id = answers.question_id) AND (qz.owner_id = auth.uid())))));


create policy "Enable read access for all users"
on "public"."answers"
as permissive
for select
to public
using (true);


create policy "Enable update for quiz owners"
on "public"."answers"
as permissive
for update
to public
using ((EXISTS ( SELECT 1
   FROM (questions q
     JOIN quizzes qz ON ((q.quiz_id = qz.id)))
  WHERE ((q.id = answers.question_id) AND (qz.owner_id = auth.uid())))));


create policy "Users can manage answers"
on "public"."answers"
as permissive
for all
to public
using ((auth.uid() IN ( SELECT quizzes.owner_id
   FROM quizzes
  WHERE (quizzes.id = ( SELECT questions.quiz_id
           FROM questions
          WHERE (questions.id = answers.question_id))))));


create policy "Users can view answers"
on "public"."answers"
as permissive
for select
to public
using (true);


create policy "Enable delete for quiz owners"
on "public"."questions"
as permissive
for delete
to public
using ((EXISTS ( SELECT 1
   FROM quizzes
  WHERE ((quizzes.id = questions.quiz_id) AND (quizzes.owner_id = auth.uid())))));


create policy "Enable insert for quiz owners"
on "public"."questions"
as permissive
for insert
to public
with check ((EXISTS ( SELECT 1
   FROM quizzes
  WHERE ((quizzes.id = questions.quiz_id) AND (quizzes.owner_id = auth.uid())))));


create policy "Enable read access for all users"
on "public"."questions"
as permissive
for select
to public
using (true);


create policy "Enable update for quiz owners"
on "public"."questions"
as permissive
for update
to public
using ((EXISTS ( SELECT 1
   FROM quizzes
  WHERE ((quizzes.id = questions.quiz_id) AND (quizzes.owner_id = auth.uid())))));


create policy "Questions policy"
on "public"."questions"
as permissive
for all
to public
using (true);


create policy "Users can manage questions"
on "public"."questions"
as permissive
for all
to public
using ((auth.uid() IN ( SELECT quizzes.owner_id
   FROM quizzes
  WHERE (quizzes.id = questions.quiz_id))));


create policy "Users can view questions"
on "public"."questions"
as permissive
for select
to public
using (true);


create policy "Enable delete for owners"
on "public"."quizzes"
as permissive
for delete
to public
using ((auth.uid() = owner_id));


create policy "Enable insert for authenticated users only"
on "public"."quizzes"
as permissive
for insert
to public
with check ((auth.uid() = owner_id));


create policy "Enable read access for all users"
on "public"."quizzes"
as permissive
for select
to public
using (true);


create policy "Enable update for owners"
on "public"."quizzes"
as permissive
for update
to public
using ((auth.uid() = owner_id));


create policy "Quizzes policy"
on "public"."quizzes"
as permissive
for all
to public
using ((auth.uid() = owner_id));


create policy "Users can manage their own quizzes"
on "public"."quizzes"
as permissive
for all
to public
using ((auth.uid() = owner_id));


create policy "Users can view quizzes"
on "public"."quizzes"
as permissive
for select
to public
using (true);



