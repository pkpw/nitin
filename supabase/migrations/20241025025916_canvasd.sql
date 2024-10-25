create table "public"."flashcard_canvas" (
    "id" boolean not null,
    "flashcard_id" uuid not null default gen_random_uuid(),
    "canvas_data" text
);


alter table "public"."flashcard_canvas" enable row level security;

CREATE UNIQUE INDEX flashcard_canvas_pkey ON public.flashcard_canvas USING btree (id);

alter table "public"."flashcard_canvas" add constraint "flashcard_canvas_pkey" PRIMARY KEY using index "flashcard_canvas_pkey";

grant delete on table "public"."flashcard_canvas" to "anon";

grant insert on table "public"."flashcard_canvas" to "anon";

grant references on table "public"."flashcard_canvas" to "anon";

grant select on table "public"."flashcard_canvas" to "anon";

grant trigger on table "public"."flashcard_canvas" to "anon";

grant truncate on table "public"."flashcard_canvas" to "anon";

grant update on table "public"."flashcard_canvas" to "anon";

grant delete on table "public"."flashcard_canvas" to "authenticated";

grant insert on table "public"."flashcard_canvas" to "authenticated";

grant references on table "public"."flashcard_canvas" to "authenticated";

grant select on table "public"."flashcard_canvas" to "authenticated";

grant trigger on table "public"."flashcard_canvas" to "authenticated";

grant truncate on table "public"."flashcard_canvas" to "authenticated";

grant update on table "public"."flashcard_canvas" to "authenticated";

grant delete on table "public"."flashcard_canvas" to "service_role";

grant insert on table "public"."flashcard_canvas" to "service_role";

grant references on table "public"."flashcard_canvas" to "service_role";

grant select on table "public"."flashcard_canvas" to "service_role";

grant trigger on table "public"."flashcard_canvas" to "service_role";

grant truncate on table "public"."flashcard_canvas" to "service_role";

grant update on table "public"."flashcard_canvas" to "service_role";


