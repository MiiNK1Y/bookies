import { Bookies } from './bookies.js';
import data from '../assets/samples/Bookies.json';
import { ref } from 'vue';

export const b = new Bookies(data);
export const flat = ref(b.flatBookies)
export const bookies = ref(b.bookies)
