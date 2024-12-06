create table "public"."classroom_decks" (
    "id" uuid not null default gen_random_uuid(),
    "classroom_id" uuid,
    "deck_id" uuid,
    "created_at" timestamp without time zone default now()
);


alter table "public"."classroom_decks" enable row level security;

create table "public"."classrooms" (
    "id" uuid not null default gen_random_uuid(),
    "name" character varying(32) not null,
    "description" text,
    "owner_id" uuid not null default gen_random_uuid(),
    "created_at" timestamp without time zone not null default now(),
    "updated_at" timestamp without time zone not null default now()
);

CREATE UNIQUE INDEX classroom_decks_pkey ON public.classroom_decks USING btree (id);

CREATE UNIQUE INDEX classrooms_pkey ON public.classrooms USING btree (id);

CREATE UNIQUE INDEX unique_classroom_deck ON public.classroom_decks USING btree (classroom_id, deck_id);

alter table "public"."classroom_decks" add constraint "classroom_decks_pkey" PRIMARY KEY using index "classroom_decks_pkey";

alter table "public"."classrooms" add constraint "classrooms_pkey" PRIMARY KEY using index "classrooms_pkey";

alter table "public"."classroom_decks" add constraint "classroom_decks_deck_id_fkey" FOREIGN KEY (deck_id) REFERENCES decks(id) ON DELETE CASCADE not valid;

alter table "public"."classroom_decks" validate constraint "classroom_decks_deck_id_fkey";

alter table "public"."classroom_decks" add constraint "unique_classroom_deck" UNIQUE using index "unique_classroom_deck";

grant delete on table "public"."classroom_decks" to "anon";

grant insert on table "public"."classroom_decks" to "anon";

grant references on table "public"."classroom_decks" to "anon";

grant select on table "public"."classroom_decks" to "anon";

grant trigger on table "public"."classroom_decks" to "anon";

grant truncate on table "public"."classroom_decks" to "anon";

grant update on table "public"."classroom_decks" to "anon";

grant delete on table "public"."classroom_decks" to "authenticated";

grant insert on table "public"."classroom_decks" to "authenticated";

grant references on table "public"."classroom_decks" to "authenticated";

grant select on table "public"."classroom_decks" to "authenticated";

grant trigger on table "public"."classroom_decks" to "authenticated";

grant truncate on table "public"."classroom_decks" to "authenticated";

grant update on table "public"."classroom_decks" to "authenticated";

grant delete on table "public"."classroom_decks" to "service_role";

grant insert on table "public"."classroom_decks" to "service_role";

grant references on table "public"."classroom_decks" to "service_role";

grant select on table "public"."classroom_decks" to "service_role";

grant trigger on table "public"."classroom_decks" to "service_role";

grant truncate on table "public"."classroom_decks" to "service_role";

grant update on table "public"."classroom_decks" to "service_role";

grant delete on table "public"."classrooms" to "anon";

grant insert on table "public"."classrooms" to "anon";

grant references on table "public"."classrooms" to "anon";

grant select on table "public"."classrooms" to "anon";

grant trigger on table "public"."classrooms" to "anon";

grant truncate on table "public"."classrooms" to "anon";

grant update on table "public"."classrooms" to "anon";

grant delete on table "public"."classrooms" to "authenticated";

grant insert on table "public"."classrooms" to "authenticated";

grant references on table "public"."classrooms" to "authenticated";

grant select on table "public"."classrooms" to "authenticated";

grant trigger on table "public"."classrooms" to "authenticated";

grant truncate on table "public"."classrooms" to "authenticated";

grant update on table "public"."classrooms" to "authenticated";

grant delete on table "public"."classrooms" to "service_role";

grant insert on table "public"."classrooms" to "service_role";

grant references on table "public"."classrooms" to "service_role";

grant select on table "public"."classrooms" to "service_role";

grant trigger on table "public"."classrooms" to "service_role";

grant truncate on table "public"."classrooms" to "service_role";

grant update on table "public"."classrooms" to "service_role";

create policy "Read Decks in Classroom"
on "public"."classroom_decks"
as permissive
for select
to authenticated
using (true);



