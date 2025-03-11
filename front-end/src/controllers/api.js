// NOTE: Sample data.
import { ref } from 'vue';
import sampleBookies from '@/assets/samples/Bookies.json';
export const sample = ref(sampleBookies);

const serverHost = import.meta.env.VITE_SERVER_HOST;
const bookiesEndpoint = serverHost + "bookies";

/**
 * Get bookies from API endpoint.
 * Made for testing purposes and will be replaced by \
 * some form of authentication and validation.
 *
 * @public
 * @function getBookies
 */
export async function getBookies() {
  try {
    const res = await fetch(bookiesEndpoint);
    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.log(error.message);
    return;
  }
}
