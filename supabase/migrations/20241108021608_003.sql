alter table "public"."decks" add column "created_flashcards" bigint not null default '0'::bigint;

alter table "public"."flashcards" alter column "title" set not null;

CREATE UNIQUE INDEX unique_deck_title ON public.decks USING btree (owner_id, title);

CREATE UNIQUE INDEX unique_flashcard_title ON public.flashcards USING btree (deck_id, title);

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


