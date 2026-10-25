import assert from 'node:assert/strict';
import test from 'node:test';
import { numberHeadings } from '../app/article-outline.ts';

const headings = levels => levels.map((level, i) => ({ level, id: String(i), title: String(i) }));
test('outline numbers nested sections and resets children under new parents', () => {
  const result = numberHeadings(headings([2, 2, 3, 4, 4, 3, 2, 3]));
  assert.deepEqual(result.map(h => h.number), ['1', '2', '2.1', '2.1.1', '2.1.2', '2.2', '3', '3.1']);
});
test('skipped levels use the nearest parent without zero or missing sections', () => {
  const result = numberHeadings(headings([2, 4, 6, 3, 2]));
  assert.deepEqual(result.map(h => h.number), ['1', '1.1', '1.1.1', '1.2', '2']);
  assert.deepEqual(result.map(h => h.depth), [0, 1, 2, 1, 0]);
  assert.deepEqual(numberHeadings([]), []);
});
