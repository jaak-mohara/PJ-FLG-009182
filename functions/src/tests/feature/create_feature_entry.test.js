const mockCheckIfFlagNameExists = jest.fn();
const mockCreateFeatureEntry = jest.fn();

const mockResponse = {
  status: jest.fn().mockImplementation(() => mockResponse),
  send: jest.fn().mockImplementation(() => mockResponse),
  json: jest.fn().mockImplementation(() => mockResponse),
};

const { createFeatureEntry } = require('../../../index');

jest.mock('../../../src/repositories/featureFlagsRepository', () => ({
  checkIfFlagNameExists: mockCheckIfFlagNameExists,
  createFeatureEntry: mockCreateFeatureEntry,
}));

describe('create_feature_entry', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return a truthy response', async () => {
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
    expect(mockResponse.send).toHaveBeenCalledWith({
      message: 'Feature flag created.',
      id: 1,
    });
  });
});