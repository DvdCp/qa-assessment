module.exports = {
  launch: {
    headless: false,
    slowMo: 10,
    defaultViewport: null,
    args: ['--window-size=1920,1080', '--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security', '--disable-dev-shm-usage', '--shm-size=6gb',
      '--disable-features=IsolateOrigins', '--disable-site-isolation-trials']
  },
  product: 'chromium',
  browserContext: 'default',
  executablePath: '/usr/bin/chromium-browser'
};
