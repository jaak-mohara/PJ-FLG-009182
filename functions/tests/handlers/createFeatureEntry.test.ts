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

describe('createFeatureEntry', () => {
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

  it('should respond with 422 if name is not provided', async () => {
    delete req.body.name;
    await createFeatureEntry(req, res);
    expect(res.statusCode).toBe(422);
    expect(mockSend).toHaveBeenCalledWith({message: "Name is required."});
  });

  it('should respond with 422 if isEnabled is not provided', async () => {
    delete req.body.isEnabled;
    await createFeatureEntry(req, res);
    expect(res.statusCode).toBe(422);
    expect(mockSend).toHaveBeenCalledWith({message: "isEnabled is required."});
  });

  it('should respond with 409 if the name already exists', async () => {
    mockCheckIfFlagExists.mockResolvedValue(true);
    await createFeatureEntry(req, res);
    expect(res.statusCode).toBe(409);
    expect(mockSend).toHaveBeenCalledWith({message: "Name already exists."});
  });
});

afterAll(() => {
  testEnv.cleanup();
});
