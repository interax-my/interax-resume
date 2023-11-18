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
    return parseAgain(str);
  }
};

const parseAgain = (str: string) => {
  try {
    const index = str.indexOf("{");
    const lastIndex = str.lastIndexOf("}");
    const regex = /\,(?!\s*?[\{\[\"\'\w])/g;

    let txt = str.substring(index, lastIndex + 1);
    txt = txt.replace(/\n/g, '');
    txt = txt.replace(/\\/g, '');
    txt = txt.replace(/\\n/g, "\\n")
        .replace(/\\'/g, "\\'")
        .replace(/\\"/g, '\\"')
        .replace(/\\&/g, "\\&")
        .replace(/\\r/g, "\\r")
        .replace(/\\t/g, "\\t")
        .replace(/\\b/g, "\\b")
        .replace(/\\f/g, "\\f");
    txt.replace(regex, '');
    return JSON.parse(txt);
  } catch (_) {
    throw new Error('Error parsing JSON');
  }
 };

export function removeNumericList(input: string): string {
  const regex = /\d+\.\s/g;
  return input.replace(regex, '');
}