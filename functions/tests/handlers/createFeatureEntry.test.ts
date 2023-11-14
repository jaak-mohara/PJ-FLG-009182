const mockSend = jest.fn();
const mockCheckIfFlagExists = jest.fn();
const mockCreateFeatureEntry = jest.fn().mockResolvedValue({
  id: 'test-id',
});


import * as functions from 'firebase-functions-test';
import createFeatureEntry from '../../src/handlers/createFeatureEntry';

import { Request, Response } from 'express';

const testEnv = functions();

jest.mock('../../src/repositories/featureFlagsRepository', () => ({
  checkIfFlagNameExists: mockCheckIfFlagExists,
  createFeatureEntry: mockCreateFeatureEntry,
}));

describe('myFunction', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    jest.clearAllMocks();
    req = {
      method: 'POST',
      body: {
        name: 'test feature',
        isEnabled: true,
        description: 'test description',
      }
    } as Request;

    res = {
      send: jest.fn(),
      status: function(this: Response, code: number) { 
        this.statusCode = code; 
        return {
          ...this,
          send: mockSend,
        }; 
      },
    } as unknown as Response;
  });

  it('should respond with the message from the request', async () => {
    await createFeatureEntry(req, res);
    expect(mockSend).toHaveBeenCalledWith({
      message: "Feature flag created.",
      id: 'test-id',
    });
  });

  it('should respond with 405 for non-POST requests', async () => {
    req.method = 'GET';
    await createFeatureEntry(req, res);
    expect(res.statusCode).toBe(405);
    expect(mockSend).toHaveBeenCalledWith({message: "Method Not Allowed."});
  });
});

afterAll(() => {
  testEnv.cleanup();
});
