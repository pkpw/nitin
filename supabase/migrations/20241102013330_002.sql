drop policy "Owners can modify their flashcard decks." on "public"."decks";

drop policy "Owners of a flashcard deck can modify the flashcards in it." on "public"."flashcards";

CREATE INDEX decks_owner_id_idx ON public.decks USING hash (owner_id);

CREATE INDEX flashcards_deck_id_idx ON public.flashcards USING hash (deck_id);

CREATE UNIQUE INDEX unique_deck_title_per_user ON public.decks USING btree (owner_id, title);

create policy "Owners can modify their flashcard decks."
on "public"."decks"
as permissive
for all
to public
using ((( SELECT auth.uid() AS uid) = owner_id));


create policy "Owners of a flashcard deck can modify the flashcards in it."
on "public"."flashcards"
as permissive
for all
to public
using ((deck_id IN ( SELECT decks.id
   FROM decks
  WHERE (decks.owner_id = ( SELECT auth.uid() AS uid)))));



