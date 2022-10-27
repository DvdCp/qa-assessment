const { makeAxiosRequestWithExpectedStatus } = require('../../utilities/common')

describe('GIVEN a valid user ID for sender and receiver and a invalid amount of money from sender', () => {  
  const sender = 3;
  const receiver = 2;
  const amount = -10;

  it('AND get these two accounts', async () => {

    const expectedStatus = 200;

    const senderUserRequestParams = {
      url: `http://localhost:8080/api/users/${sender}`, 
      method: 'GET',
    };

    const receiverUserRequestParams = {
      url: `http://localhost:8080/api/users/${receiver}`,
      method: 'GET',
    };

    getSenderUserApiResponse = await makeAxiosRequestWithExpectedStatus(senderUserRequestParams, expectedStatus);
    getReceiverUserApiResponse = await makeAxiosRequestWithExpectedStatus(receiverUserRequestParams, expectedStatus);

  });

  describe('WHEN make the transfer', () => {

    const expectedStatus = 500;
    const makeTransferRequestParams = {
      url: `http://localhost:8080/api/transactions/`,
      method: 'POST',
      data: {
        sender,
        receiver,
        amount
      }
    }

    let makeTransferResponse;

    beforeAll(async () => {
      makeTransferResponse= await makeAxiosRequestWithExpectedStatus(makeTransferRequestParams, expectedStatus);
    });

    it('THEN transfer is unsuccessful', () => {

      // Checking if returned value are the same of transfer.
      // This is test is going to fail because despite the invalid amount of money, the transfer is going to be completed anyway.
      expect(makeTransferResponse.data.message).toBe(`Error updating balance of sender User with id=${sender}`);

    });
   
  });

});