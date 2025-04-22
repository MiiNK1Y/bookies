import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import { state, bookies } from '@/stores/bookies.js';
import { Rebuild } from '@/lib/bookies/rebuild.js';
import { Flatten } from '@/lib/bookies/flatten.js';

import data from './tests/shared-samples/Bookies.json';


const app = createApp(App);

app.use(router);


// Initialize the sample bookies object (.json file).
bookies.regular = data;
bookies.flat = new Flatten(bookies.regular).flat;

console.log("inital loaded bookies:\n", bookies.regular);
console.log("inital loaded FLAT bookies:\n", bookies.flat);

state.value.bookies.regular = bookies.regular;
state.value.bookies.flat = bookies.flat;


app.mount('#app');
