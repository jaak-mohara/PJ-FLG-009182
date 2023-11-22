const {generateToken} = require('../../new_cloud_function');

describe('new_cloud_function', () => {
  beforeEach(() => {
    this.targetAudience = 'https://us-central1-pj-flg-009182-b5059.cloudfunctions.net/createFeatureEntry';
  });
  it('should return a truthy response', async () => {
    expect(await generateToken(this.targetAudience)).toBeTruthy();
  });
  it('should return a string response', async () => {
    expect(typeof await generateToken(this.targetAudience)).toBe('string');
  })
});
