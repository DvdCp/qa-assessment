const { makeAxiosRequestWithExpectedStatus } = require('../../utilities/common')

describe('GIVEN valid data for a dummy user', () => {  // Using this GIVEN as BACKGROUND clause
  const name = 'Dummy';
  const balance = 1500;
  let userId;

  describe('WHEN I create dummy user', () => {

    const expectedStatus = 201;
    const requestParams = {
      url: 'http://localhost:8080/api/users',
      method: 'POST',
      data: {
        name,
        balance,
      }
    };

    let createUserApiResponse;

    beforeAll(async () => {
      createUserApiResponse = await makeAxiosRequestWithExpectedStatus(requestParams, expectedStatus);
    });

    it('AND delete it', async () => {
      const expectedStatus = 200;
      userId = createUserApiResponse.data.id;
      
      const requestParams = {
        url: `http://localhost:8080/api/users/${userId}`,
        method: 'DELETE',
      };
      await makeAxiosRequestWithExpectedStatus(requestParams, expectedStatus);
    });

    it('AND try to GET delete dummy user', async () => {
      const expectedStatus = 404;
      const requestParams = {
        url: `http://localhost:8080/api/users/${userId}`,
        method: 'GET',
      };

      deleteUserApiResponse = await makeAxiosRequestWithExpectedStatus(requestParams, expectedStatus);
    
    });

    it('THEN dummy user is deleted correctly (it doesnt exist anymore)', () => {

      // Checking if returned value are the same of deleted user
      expect(deleteUserApiResponse.data.message).toBe(`Cannot find User with id=${userId}.`);
    });

  });

});