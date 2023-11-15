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
    txt = txt.replace(/\\n/g, "\\n")
              .replace(/\\'/g, "\\'")
              .replace(/\\"/g, '\\"')
              .replace(/\\&/g, "\\&")
              .replace(/\\r/g, "\\r")
              .replace(/\\t/g, "\\t")
              .replace(/\\b/g, "\\b")
              .replace(/\\f/g, "\\f");
    txt.replace(regex, '')
    return JSON.parse(txt);
  } catch (_) {
    throw('Error parsing JSON')
  }
};