
describe('GIVEN valid data for a user', () => {
  const name = 'Alex';
  const balance = '1000';

  describe('GIVEN that I can create a user', () => {
    const createUserUrl = 'http://localhost:8081/create';

    beforeAll(async () => {
      await page.goto(createUserUrl);

      // enter name
      await page.waitForSelector('#name', { visible: true });
      const fieldName = await page.$('#name');
      await fieldName.click({ clickCount: 3 })
      await fieldName.type(name);

      // enter balance
      await page.waitForSelector('#balance', { visible: true });
      const fieldBalance = await page.$('#balance');
      await fieldBalance.click({ clickCount: 3 })
      await fieldBalance.type(balance);

      // click submit
      await page.waitForSelector('#createUser', { visible: true });
      await page.click('#createUser');
    });

    it('THEN I can see the success message', async () => {
      const isSuccessMessageVisible = await page.waitForSelector('#successMessage', { visible: true });
      expect(isSuccessMessageVisible).toBeTruthy();
    });
  });
});