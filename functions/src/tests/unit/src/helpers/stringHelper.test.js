const { split } = require('@helpers/stringHelper');

describe('stringHelper', () => {
  it('should return an array of parts', () => {
    const result = split('test');
    expect(typeof result).toBe('object');
    expect(result.length).toBe(1)
  });

  it('should split by spaces', () => {
    const result = split('test test');
    expect(typeof result).toBe('object');
    expect(result.length).toBe(2)
  });

  it('should split camelCase', () => {
    const result = split('testTest');
    expect(typeof result).toBe('object');
    expect(result.length).toBe(2)
  });

  it('should split kebab-case', () => {
    const result = split('test-test');
    expect(typeof result).toBe('object');
    expect(result.length).toBe(2)
  });

  it('should split snake_case', () => {
    const result = split('test_test');
    expect(typeof result).toBe('object');
    expect(result.length).toBe(2)
  });

  it('should not split acronyms', () => {
    const result = split('API test');
    expect(typeof result).toBe('object');
    expect(result.length).toBe(2)
  });
});
