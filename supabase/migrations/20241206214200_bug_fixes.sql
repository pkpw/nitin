drop policy "Read Decks in Classroom" on "public"."classroom_decks";

alter table "public"."classrooms" add column "created_by" uuid;

alter table "public"."classrooms" add constraint "classrooms_created_by_fkey" FOREIGN KEY (created_by) REFERENCES profiles(id) ON DELETE CASCADE not valid;

alter table "public"."classrooms" validate constraint "classrooms_created_by_fkey";

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



