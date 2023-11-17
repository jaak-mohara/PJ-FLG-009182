// // const checkUserMock = jest.fn();
// // const generateAuthTokenMock = jest.fn()
// //   .mockResolvedValue('test-token');
// const mockSend = jest.fn();

// import * as functions from 'firebase-functions-test';
// import getAuthToken from '../../src/handlers/getAuthToken';
// import {Request} from 'express';

// const testEnv = functions();

// describe('getAuthToken', () => {
//   let res: Response;

//   beforeAll(() => {
//     jest.clearAllMocks();
//     res = {
//       send: jest.fn(),
//       status: function(this: Response, code: number) { 
//         this.statusCode = code; 
//         return {
//           ...this,
//           send: mockSend,
//         }; 
//       },
//     } as unknown as Response;
//   });

//   afterAll(() => {
//     testEnv.cleanup();
//   });

//   it('should return with a test-token', async () => {
//     const data = {
//       body: {
//         email: 'test@email.com',
//       }
//     } as Request;

//     const context = {};

//     const result = await getAuthToken(data, context);
//     expect(result).toBeTruthy()
//   });
// });
