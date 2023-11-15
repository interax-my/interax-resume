import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const tryParseJson = (str: string) => {
  try {
    const regex = /\,(?!\s*?[\{\[\"\'\w])/g;

    let txt = str.replaceAll('```json', '');
    txt = txt.replaceAll('```', '');
    txt.replace(regex, '')
    return JSON.parse(txt);
  } catch (e) {
    console.log('Error parsing JSON');
  }
};