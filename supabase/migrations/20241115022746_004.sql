alter table "public"."decks" drop column "created_flashcards";

alter table "public"."flashcards" alter column "back" set default '[{"insert":""}]'::json;

alter table "public"."flashcards" alter column "front" set default '[{"insert":""}]'::json;


