import { getProfile, onboardProfile, saveProfile } from './models/profile';
import {
	createDeck,
	deleteDeck,
	getDeck,
	getDecks,
	getAllDecks,
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
import {
	getClassroomById,
	getAllClassrooms,
	createClassroom,
	deleteClassroom,
	renameClassroom,
	addDeckToClassroom,
	getDecksForClassroom
} from './models/classroom';


export const db = {
	// Profile
	getProfile,
	saveProfile,
	onboardProfile,
	// Decks
	getDeck,
	getDecks,
	getAllDecks,
	getFlashcards,
	createDeck,
	deleteDeck,
	renameDeck,
	// Flashcards
	getFlashcard,
	saveFlashcard,
	createFlashcard,
	deleteFlashcard,
	renameFlashcard,
	// Classrooms
	getClassroomById, 
	getAllClassrooms,
	createClassroom,
	deleteClassroom,
	renameClassroom,
	addDeckToClassroom,
	getDecksForClassroom
};
