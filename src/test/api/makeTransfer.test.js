const { makeAxiosRequestWithExpectedStatus } = require('../../utilities/common')

describe('GIVEN a valid user ID for sender and receiver and a valid amount of money from sender', () => {  
  const sender = 3;
  const receiver = 2;
  const amount = 800;

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

  it('AND sender can afford the transfer', async () => {
    balance = getSenderUserApiResponse.data.balance;
    
    // P.n: If the sender can't afford the transfer, this "expect" clauses will catch the error, but Jest will not stop.
    // Jest will continue to test even though this test is FAIL at this point.
    // I tried to use "--bail" options in both package.json and jest.config.js but it seems not be suitable for the case ...
    expect(balance).toBeGreaterThanOrEqual(0);
    expect(balance).toBeGreaterThanOrEqual(amount);

  });

  describe('WHEN make the transfer', () => {

    const expectedStatus = 201;
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

    it('THEN transfer is successful', () => {

      // Checking if returned value are the same of transfer
      expect(makeTransferResponse.data.sender).toBe(sender);
      expect(makeTransferResponse.data.receiver).toBe(receiver);
      expect(makeTransferResponse.data.amount).toBe(amount);
  
    });
   
  });

});