import { checkIfFlagNameExists } from '../../src/repositories/featureFlagsRepository';

jest.mock('firebase-admin', () => {
  return {
    firestore: jest.fn().mockReturnValue({
      collection: jest.fn().mockReturnValue({
        where: jest.fn().mockImplementation((
          field: string,
          operator: string,
          flagName: string) => ({
          get: jest.fn().mockImplementation(() => {
            return Promise.resolve({
              empty: flagName !== 'existing-flag',
            });
          }),
        })),
      }),
    }),
    initializeApp: jest.fn(),
  };
});

describe('checkIfFlagNameExists', () => {
  it('should return true if a flag with the given name exists', async () => {
    const exists = await checkIfFlagNameExists('existing-flag');
    expect(exists).toBe(true);
  });

  it('should return false if a flag with the given name does not exist', async () => {
    const exists = await checkIfFlagNameExists('nonexistent-flag');
    expect(exists).toBe(false);
  });
});
