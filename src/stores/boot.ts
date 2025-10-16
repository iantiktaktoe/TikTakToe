import { writable } from 'svelte/store';

// Use sessionStorage so boot sequence shows once per browser session
// Will reset on page refresh or new tab, but persists during navigation
const isBooted = sessionStorage.getItem('isBooted') === 'true';

export const bootComplete = writable<boolean>(isBooted);

bootComplete.subscribe((value) => {
  sessionStorage.setItem('isBooted', value.toString());
});
