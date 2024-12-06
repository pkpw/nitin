drop policy "Answers policy" on "public"."answers";

drop policy "Enable delete for quiz owners" on "public"."answers";

drop policy "Enable insert for quiz owners" on "public"."answers";

drop policy "Enable read access for all users" on "public"."answers";

drop policy "Enable update for quiz owners" on "public"."answers";

drop policy "Users can manage answers" on "public"."answers";

drop policy "Users can view answers" on "public"."answers";

drop policy "Read Decks in Classroom" on "public"."classroom_decks";

drop policy "Enable delete for quiz owners" on "public"."questions";

drop policy "Enable insert for quiz owners" on "public"."questions";

drop policy "Enable read access for all users" on "public"."questions";

drop policy "Enable update for quiz owners" on "public"."questions";

drop policy "Questions policy" on "public"."questions";

drop policy "Users can manage questions" on "public"."questions";

drop policy "Users can view questions" on "public"."questions";

drop policy "Enable delete for owners" on "public"."quizzes";

drop policy "Enable insert for authenticated users only" on "public"."quizzes";

drop policy "Enable read access for all users" on "public"."quizzes";

drop policy "Enable update for owners" on "public"."quizzes";

drop policy "Quizzes policy" on "public"."quizzes";

drop policy "Users can manage their own quizzes" on "public"."quizzes";

drop policy "Users can view quizzes" on "public"."quizzes";

revoke delete on table "public"."answers" from "anon";

revoke insert on table "public"."answers" from "anon";

revoke references on table "public"."answers" from "anon";

revoke select on table "public"."answers" from "anon";

revoke trigger on table "public"."answers" from "anon";

revoke truncate on table "public"."answers" from "anon";

revoke update on table "public"."answers" from "anon";

revoke delete on table "public"."answers" from "authenticated";

revoke insert on table "public"."answers" from "authenticated";

revoke references on table "public"."answers" from "authenticated";

revoke select on table "public"."answers" from "authenticated";

revoke trigger on table "public"."answers" from "authenticated";

revoke truncate on table "public"."answers" from "authenticated";

revoke update on table "public"."answers" from "authenticated";

revoke delete on table "public"."answers" from "service_role";

revoke insert on table "public"."answers" from "service_role";

revoke references on table "public"."answers" from "service_role";

revoke select on table "public"."answers" from "service_role";

revoke trigger on table "public"."answers" from "service_role";

revoke truncate on table "public"."answers" from "service_role";

revoke update on table "public"."answers" from "service_role";

revoke delete on table "public"."questions" from "anon";

revoke insert on table "public"."questions" from "anon";

revoke references on table "public"."questions" from "anon";

revoke select on table "public"."questions" from "anon";

revoke trigger on table "public"."questions" from "anon";

revoke truncate on table "public"."questions" from "anon";

revoke update on table "public"."questions" from "anon";

revoke delete on table "public"."questions" from "authenticated";

revoke insert on table "public"."questions" from "authenticated";

revoke references on table "public"."questions" from "authenticated";

revoke select on table "public"."questions" from "authenticated";

revoke trigger on table "public"."questions" from "authenticated";

revoke truncate on table "public"."questions" from "authenticated";

revoke update on table "public"."questions" from "authenticated";

revoke delete on table "public"."questions" from "service_role";

revoke insert on table "public"."questions" from "service_role";

revoke references on table "public"."questions" from "service_role";

revoke select on table "public"."questions" from "service_role";

revoke trigger on table "public"."questions" from "service_role";

revoke truncate on table "public"."questions" from "service_role";

revoke update on table "public"."questions" from "service_role";

revoke delete on table "public"."quizzes" from "anon";

revoke insert on table "public"."quizzes" from "anon";

revoke references on table "public"."quizzes" from "anon";

revoke select on table "public"."quizzes" from "anon";

revoke trigger on table "public"."quizzes" from "anon";

revoke truncate on table "public"."quizzes" from "anon";

revoke update on table "public"."quizzes" from "anon";

revoke delete on table "public"."quizzes" from "authenticated";

revoke insert on table "public"."quizzes" from "authenticated";

revoke references on table "public"."quizzes" from "authenticated";

revoke select on table "public"."quizzes" from "authenticated";

revoke trigger on table "public"."quizzes" from "authenticated";

revoke truncate on table "public"."quizzes" from "authenticated";

revoke update on table "public"."quizzes" from "authenticated";

revoke delete on table "public"."quizzes" from "service_role";

revoke insert on table "public"."quizzes" from "service_role";

revoke references on table "public"."quizzes" from "service_role";

revoke select on table "public"."quizzes" from "service_role";

revoke trigger on table "public"."quizzes" from "service_role";

revoke truncate on table "public"."quizzes" from "service_role";

revoke update on table "public"."quizzes" from "service_role";

alter table "public"."answers" drop constraint "answers_question_id_fkey";

alter table "public"."questions" drop constraint "questions_quiz_id_fkey";

alter table "public"."quizzes" drop constraint "quizzes_owner_id_fkey";

alter table "public"."quizzes" drop constraint "unique_quiz_title_per_owner";

alter table "public"."answers" drop constraint "answers_pkey";

alter table "public"."questions" drop constraint "questions_pkey";

alter table "public"."quizzes" drop constraint "quizzes_pkey";

drop index if exists "public"."answers_pkey";

drop index if exists "public"."questions_pkey";

drop index if exists "public"."quizzes_pkey";

drop index if exists "public"."unique_quiz_title_per_owner";

drop table "public"."answers";

drop table "public"."questions";

drop table "public"."quizzes";

alter table "public"."classrooms" add column "created_by" uuid;

alter table "public"."decks" add column "created_flashcards" bigint not null default '0'::bigint;

alter table "public"."flashcards" alter column "back" drop default;

alter table "public"."flashcards" alter column "front" drop default;

alter table "public"."classrooms" add constraint "classrooms_created_by_fkey" FOREIGN KEY (created_by) REFERENCES profiles(id) ON DELETE CASCADE not valid;

alter table "public"."classrooms" validate constraint "classrooms_created_by_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.increment_created_flashcards(deck_id uuid)
 RETURNS integer
 LANGUAGE plpgsql
AS $function$DECLARE
    new_value INTEGER;
BEGIN
    UPDATE decks
    SET created_flashcards = created_flashcards + 1
    WHERE id = deck_id
    RETURNING created_flashcards INTO new_value;
    RETURN new_value;
END;$function$
;

create policy "allow_inserts_based_on_classroom_owner"
on "public"."classroom_decks"
as permissive
for insert
to authenticated
with check ((EXISTS ( SELECT 1
   FROM classrooms
  WHERE ((classrooms.id = classroom_decks.classroom_id) AND (classrooms.created_by = auth.uid())))));


create policy "allow_select_based_on_classroom_owner"
on "public"."classroom_decks"
as permissive
for select
to authenticated
using ((EXISTS ( SELECT 1
   FROM classrooms
  WHERE ((classrooms.id = classroom_decks.classroom_id) AND (classrooms.created_by = auth.uid())))));



