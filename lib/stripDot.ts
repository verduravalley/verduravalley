/** Removes a trailing period from Arabic text (titles only). */
export function stripDot(text: string, isAr: boolean): string {
  if (isAr && typeof text === 'string' && text.endsWith('.')) {
    return text.slice(0, -1);
  }
  return text;
}
