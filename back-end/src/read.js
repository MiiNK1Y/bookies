import fs from 'fs';

export function readBookiesFile() {
  const file = fs.readFileSync('./bookies_sample.json', 'utf8');

  return JSON.parse(file);
}
