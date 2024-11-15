alter table "public"."decks" add column "created_flashcards" bigint not null default '0'::bigint;

alter table "public"."flashcards" alter column "title" set not null;

CREATE UNIQUE INDEX unique_flashcard_title ON public.flashcards USING btree (deck_id, title);

