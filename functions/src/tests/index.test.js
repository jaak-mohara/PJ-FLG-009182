const mockInitializeApp = jest.fn()
  .mockImplementation(() => ({ result: true }));

const test = require('firebase-functions-test')();

jest.mock('firebase-admin/app', () => ({
  initializeApp: mockInitializeApp,
}));

describe('index', () => {
  it('should call initializeApp', () => {
    require('../../index');
    expect(mockInitializeApp).toHaveBeenCalled();
  });
});