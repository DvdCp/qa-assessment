
describe('GIVEN valid user and topup value', () => {
  const userId = "user-1";
  const topupAmount = '1000';

  describe('GIVEN that I can add balance to a user', () => {

    beforeAll(async () => {
      const indexUrl = 'http://localhost:8081/users';
      await page.goto(indexUrl);

      await page.waitForSelector(`#${userId}`, { visible: true });
      const userLabel = await page.$(`#${userId}`);
      await userLabel.click({clickCount: 1})

      await page.waitForSelector('#addBalance', { visible: true });
      const addBalanceButton = await page.$(`#addBalance`);
      await addBalanceButton.click({clickCount: 1})
    });

    describe('WHEN preparing the topup', () => {

      beforeAll(async () => {
  
        // select topup field and insert topup 
        await page.waitForSelector('#topup', { visible: true });
        const topupField = await page.$('#topup');
        await topupField.click({ clickCount: 1 })
        await topupField.type(topupAmount);
    
        // click Add Balance button
        await page.waitForSelector('#updateBalance', { visible: true });
        const addBalanceButton = await page.$('#updateBalance');
        await addBalanceButton.click({ clickCount: 1 });
      });

      // At this point the test is going to fail because there is no success message after the operation. Also topup field is not cleaned after operation.
      // There is no hint that operation is successful.
      it('THEN I can see the success message', async () => {
        const isSuccessMessageVisible = await page.waitForSelector('#message', { visible: true, timeout: 5000 });
        expect(isSuccessMessageVisible).toBeTruthy();
      });
    });
  });
});