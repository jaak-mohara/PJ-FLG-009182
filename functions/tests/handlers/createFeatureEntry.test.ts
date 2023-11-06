import * as functions from 'firebase-functions-test';
import createFeatureEntry from '../../src/handlers/createFeatureEntry';
import { Request, Response } from 'express';

const testEnv = functions();

describe('myFunction', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = { method: 'POST', body: { message: 'test message' } } as Request;
    res = {
      send: jest.fn(),
      status: function(this: Response, code: number) { 
        this.statusCode = code; 
        return this; 
      },
    } as unknown as Response;
  });

  it('should respond with the message from the request', () => {
    createFeatureEntry(req, res);
    expect(res.send).toHaveBeenCalledWith({ message: 'You sent: test message' });
  });

  it('should respond with 405 for non-POST requests', () => {
    req.method = 'GET';
    createFeatureEntry(req, res);
    expect(res.statusCode).toBe(405);
    expect(res.send).toHaveBeenCalledWith('Method Not Allowed');
  });
});

afterAll(() => {
  testEnv.cleanup();
});
