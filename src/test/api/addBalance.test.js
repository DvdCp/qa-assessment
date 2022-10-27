const { makeAxiosRequestWithExpectedStatus } = require('../../utilities/common')

// P.N: This addBalance funtionality is not working properly... at this stage of development, test outcome is FAIL.
// From frontend side, this functionality seems to work properly.

describe('GIVEN a valid user ID and a valid amount', () => {  
  const userId = 2;
  const topup = -80;

  let oldBalance;

  it('AND get this account', async () => {

    const expectedStatus = 200;

    const requestParams = {
      url: `http://localhost:8080/api/users/${userId}`, 
      method: 'GET',
    };

    getUserApiResponse = await makeAxiosRequestWithExpectedStatus(requestParams, expectedStatus);

    actualBalance = getUserApiResponse.data.balance;

  });

  describe('WHEN add balance to user', () => {

    const expectedStatus = 204;
    const addBalanceRequestParams = {
      url: `http://localhost:8080/api/users/${userId}`,
      method: 'PUT',
      data: {
        topup
      }
    }

    let addBalanceResponse;

    beforeAll(async () => {
      // At this point the test fails because the response is wrong.
      addBalanceResponse= await makeAxiosRequestWithExpectedStatus(addBalanceRequestParams, expectedStatus);
    });

    it('THEN the balance is successfully updated', () => {

      // Checking returned value
      expect(addBalanceResponse.data.id).toBe(userId);
      expect(addBalanceResponse.data.balance).toBe(oldBalance + topup);
      expect(addBalanceResponse.data.message).toBe(`User was updated successfully.`);
    });
   
  });

});