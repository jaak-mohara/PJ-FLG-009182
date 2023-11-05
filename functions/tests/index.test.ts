import { capitalise, split } from '../src/helpers/stringHelper';

describe('name utilities', () => {
  test('the capitalise should return successfully with a string type', () => {
    const result = capitalise('word');

    expect(typeof result).toBe('string');
    expect(result).toEqual('WORD');
  });

  test('the split function should return an array', () => {
    const result = split('');

    expect(Array.isArray(result)).toBe(true);
  });

  test('the split function should cater for camel case', () => {
    const result = split('wordOne');

    expect(result).toHaveLength(2);
    expect(result).toEqual(['word', 'One']);
  });

  test('the split function should cater for spaces', () => {
    const result = split('word one');

    expect(result).toHaveLength(2);
    expect(result).toEqual(['word', 'one']);
  });

  test('the split function should cater for numbers', () => {
    const result = split('word1');

    expect(result).toHaveLength(2);
    expect(result).toEqual(['word', '1']);
  });

  test('the split function should cater for snake case', () => {
    const result = split('word_one');

    expect(result).toHaveLength(2);
    expect(result).toEqual(['word', 'one']);
  });

  test('the split function should cater for kebab case', () => {
    const result = split('word-one');

    expect(result).toHaveLength(2);
    expect(result).toEqual(['word', 'one']);
  });
})