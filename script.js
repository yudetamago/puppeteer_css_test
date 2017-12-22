const puppeteer = require('puppeteer');
(async() => {
  const url = "http://127.0.0.1:8080/"
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, {waitUntil: 'networkidle2'});
  const selector = '#main'
  await page.waitForSelector(selector);
  const rect = await page.evaluate(selector => {
    const element = document.querySelector(selector);
    const {x, y, width, height} = element.getBoundingClientRect();
    return {x: x, y: y, width: width, height: height}
  }, selector);
  console.log(rect)
  await page.screenshot({path: 'ss.png', clip: rect})
  await browser.close();
})();
