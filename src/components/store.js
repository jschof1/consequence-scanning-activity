import { writable } from "svelte/store";

export const unintendedConsequenceSuggestions = writable([
]);

export const intendedConsequenceSuggestions = writable([
]);

export const consequenceState = writable({
  unintendedIsComplete: false,
  intendedIsComplete: false,
});
export const projectData = writable({});