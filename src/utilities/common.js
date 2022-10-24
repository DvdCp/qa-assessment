const axios = require('axios');

exports.makeAxiosRequestWithExpectedStatus = async (requestParams, expectedStatus) => {
  const cleanedRequestParams = {
    ...requestParams,
    headers: exports.removeUndefinedValuesFromObject(requestParams.headers),
  };
  try {
    const response = await axios({ ...defaultAxiosRequestParams, ...cleanedRequestParams });
    if (response.status !== expectedStatus) {
      // eslint-disable-next-line no-console
      console.error(`Expected status: ${expectedStatus} but received status ${response.status}`);
      throw response;
    }
    return response;
  } catch (error) {
    const attemptedRequestDetailsMessage = `Failed to make request with: ${JSON.stringify(cleanedRequestParams)}`;
    const receivedErrorMessage = `Received error: ${JSON.stringify(error.data || error)}`;
    // eslint-disable-next-line no-console
    console.error(`${attemptedRequestDetailsMessage}\n${receivedErrorMessage}`);
    expect(error.data || error).toBe(null);
  }
};

const defaultAxiosRequestParams = {
  /* Allow any status so we always get the standard axios response
  even when we are expecting a typically unhealthy status response */
  validateStatus: () => true,
};

exports.removeUndefinedValuesFromObject = (object) => {
  if (!object) {
    return undefined;
  }
  return Object.fromEntries(Object.entries(object).filter((entry) => entry[1] !== undefined));
};
