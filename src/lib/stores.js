// src/lib/stores.js
import { writable } from 'svelte/store';

export const classrooms = writable([]);  // This store holds the classroom data reactively
export const profiles = writable([]);    // For holding user profiles in a classroom