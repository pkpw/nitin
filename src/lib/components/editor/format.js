import { writable } from "svelte/store";

export const formatStore = writable({
  isBold: false,
  isItalic: false,
	isUnderline: false,
	isStrikethrough: false,
	isNumberedList: false,
	isBulletedList: false
})