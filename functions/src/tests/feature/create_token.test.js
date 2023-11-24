const mockTokenClient = jest.fn().mockImplementation(() => ({
  idTokenProvider: {
    fetchIdToken: jest.fn().mockImplementation(() => 'test_token'),
  },
}));

const { generateToken } = require('../../../create_token');

jest.mock('google-auth-library', () => ({
  GoogleAuth: jest.fn().mockImplementation(() => ({
    getIdTokenClient: mockTokenClient,
  })),
}));

describe('create_token', () => {
  beforeEach(() => {
    this.targetAudience = 'https://us-central1-pj-flg-009182-b5059.cloudfunctions.net/createFeatureEntry';
  });

  it('should return a truthy response', async () => {
    const result = await generateToken(this.targetAudience);
    expect(result).toBeTruthy();
  });

  it('should return a string response', async () => {
    const result = await generateToken(this.targetAudience);
    expect(typeof result).toBe('string');
  });

  it('should call getIdTokenClient with the target audience', async () => {
    await generateToken(this.targetAudience);
    expect(mockTokenClient).toHaveBeenCalledWith(this.targetAudience);
  });
});
