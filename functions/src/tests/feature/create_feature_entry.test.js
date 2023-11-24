const mockCheckIfFlagNameExists = jest.fn();
const mockCreateFeatureEntry = jest.fn();

const mockResponse = {
  status: jest.fn().mockImplementation(() => mockResponse),
  send: jest.fn().mockImplementation(() => mockResponse),
  json: jest.fn().mockImplementation(() => mockResponse),
};

const crypto = require('crypto');
const { createFeatureEntry } = require('../../../index');

jest.mock('../../../src/repositories/featureFlagsRepository', () => ({
  checkIfFlagNameExists: mockCheckIfFlagNameExists,
  createFeatureEntry: mockCreateFeatureEntry,
}));

describe('create_feature_entry', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should create a new feature flag entry', async () => {
    const uuid = 'test-uuid';
    jest.spyOn(crypto, 'randomUUID').mockReturnValueOnce(uuid);
    mockCheckIfFlagNameExists.mockReturnValueOnce(false);
    mockCreateFeatureEntry.mockResolvedValueOnce({ id: 1 });
    await createFeatureEntry({
      method: 'POST',
      body: {
        name: 'test',
        isEnabled: true,
      },
    }, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockCreateFeatureEntry).toHaveBeenCalledWith({
      name: 'TEST',
      isEnabled: true,
      description: 'No description provided.',
      uuid,
    });
    expect(mockResponse.send).toHaveBeenCalledWith({
      message: 'Feature flag created.',
      id: 1,
    });
  });
});