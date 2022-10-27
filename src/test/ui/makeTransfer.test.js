
describe('GIVEN valid data for a transfer (userId and amount)', () => {
  const userId = 3;
  const amount = '1000';

  describe('GIVEN that I can make a transition user-to-user', () => {
    const makeTransferUrl = `http://localhost:8081/transfer/${userId}`;

    beforeAll(async () => {
      await page.goto(makeTransferUrl);
    });

    describe('WHEN preparing the transaction', () => {

      beforeAll(async () => {
  
        // select receiver
        await page.waitForSelector('#receiver', { visible: true });
        const fieldReceiver = await page.$('#receiver');
        await fieldReceiver.click({ clickCount: 1 })
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('Enter');
  
        // enter amount
        await page.waitForSelector('#amount', { visible: true });
        const fieldAmount = await page.$('#amount');
        await fieldAmount.click({ clickCount: 3 })
        await fieldAmount.type(amount);
  
        // click submit
        await page.waitForSelector('#createTransaction', { visible: true });
        await page.click('#createTransaction');
      });

      it('THEN I can see the success message', async () => {
        const isSuccessMessageVisible = await page.waitForSelector('#message', { visible: true });
        expect(isSuccessMessageVisible).toBeTruthy();
      });
    });
  });
});