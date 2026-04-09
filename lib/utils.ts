export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return minutes;
}

export function formatReadingTime(minutes: number): string {
  if (minutes === 1) return '1 min de lectura';
  return `${minutes} min de lectura`;
}
