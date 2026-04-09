import { describe, it, expect } from 'vitest';
import { calculateReadingTime, formatReadingTime } from '@/lib/utils';

describe('Utils Library', () => {

  describe('calculateReadingTime', () => {
    it('should calculate reading time for 200 words as 1 minute', () => {
      const text = 'word '.repeat(200); // Exactly 200 words
      const time = calculateReadingTime(text);
      expect(time).toBe(1);
    });

    it('should calculate reading time for 600 words as 3 minutes', () => {
      const text = 'word '.repeat(600); // 600 words
      const time = calculateReadingTime(text);
      expect(time).toBe(3);
    });

    it('should round up partial minutes', () => {
      const text = 'word '.repeat(250); // 250 words = 1.25 minutes
      const time = calculateReadingTime(text);
      expect(time).toBe(2); // Should round up to 2
    });

    it('should handle short content (less than 200 words)', () => {
      const text = 'word '.repeat(50); // 50 words
      const time = calculateReadingTime(text);
      expect(time).toBe(1); // Minimum 1 minute
    });

    it('should handle empty content', () => {
      const text = '';
      const time = calculateReadingTime(text);
      expect(time).toBe(1); // Math.ceil(0/200) = 1 minimum
    });

    it('should handle content with multiple spaces', () => {
      const text = 'word  word   word    word'; // Multiple spaces
      const time = calculateReadingTime(text);
      expect(time).toBeGreaterThan(0);
    });

    it('should handle newlines and whitespace', () => {
      const text = 'word\nword\n\nword\t\tword';
      const time = calculateReadingTime(text);
      expect(time).toBeGreaterThan(0);
    });
  });

  describe('formatReadingTime', () => {
    it('should format 1 minute correctly (singular)', () => {
      const formatted = formatReadingTime(1);
      expect(formatted).toBe('1 min de lectura');
    });

    it('should format multiple minutes correctly (plural)', () => {
      const formatted = formatReadingTime(5);
      expect(formatted).toBe('5 min de lectura');
    });

    it('should format 0 minutes', () => {
      const formatted = formatReadingTime(0);
      expect(formatted).toBe('0 min de lectura');
    });

    it('should format large numbers', () => {
      const formatted = formatReadingTime(45);
      expect(formatted).toBe('45 min de lectura');
    });
  });

  describe('Integration: calculateReadingTime + formatReadingTime', () => {
    it('should calculate and format reading time for typical blog post', () => {
      // Typical blog post might be 400-800 words
      const content = 'word '.repeat(500);
      const minutes = calculateReadingTime(content);
      const formatted = formatReadingTime(minutes);

      expect(minutes).toBe(3); // 500 words / 200 = 2.5, rounded up to 3
      expect(formatted).toBe('3 min de lectura');
    });

    it('should handle very short content', () => {
      const content = 'Just a few words here';
      const minutes = calculateReadingTime(content);
      const formatted = formatReadingTime(minutes);

      expect(minutes).toBe(1);
      expect(formatted).toBe('1 min de lectura');
    });

    it('should handle long-form content', () => {
      const content = 'word '.repeat(2000); // Long article
      const minutes = calculateReadingTime(content);
      const formatted = formatReadingTime(minutes);

      expect(minutes).toBe(10);
      expect(formatted).toBe('10 min de lectura');
    });
  });
});
