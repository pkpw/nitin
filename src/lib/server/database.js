import { getProfile, onboardProfile, saveProfile } from './models/profile';
import {
	createDeck,
	deleteDeck,
	getDeck,
	getDecks,
	getFlashcards,
	renameDeck
} from './models/deck';
import {
	createFlashcard,
	deleteFlashcard,
	getFlashcard,
	renameFlashcard,
	saveFlashcard
} from './models/flashcard';

export const db = {
	// Profile
	getProfile,
	saveProfile,
	onboardProfile,
	// Decks
	getDeck,
	getDecks,
	getFlashcards,
	createDeck,
	deleteDeck,
	renameDeck,
	// Flashcards
	getFlashcard,
	saveFlashcard,
	createFlashcard,
	deleteFlashcard,
	renameFlashcard
};
