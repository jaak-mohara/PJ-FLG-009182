import { capitalise } from '../src/helpers/stringHelper';

describe('name utilities', () => {
  test('the function should return successfully with a string type', () => {
    const result = capitalise('word');

    expect(typeof result).toBe('string');
    expect(result).toBe('WORD');
  });
})