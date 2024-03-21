const fs = require("fs");
const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    userDataDir: "./tmp",
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:95.0) Gecko/20100101 Firefox/95.0');
  await page.goto("https://wellfound.com/company/typeset");

  const jobItems = await page.$$('.styles_content__pKhb0');

  // Array to store job data
  const jobData = [];

  for (const jobItem of jobItems) {
    const location = await page.evaluate(el => el.querySelector('ul > li > a').textContent, jobItem);
    const title = await page.evaluate(el => el.querySelector('h3 > div > a').textContent, jobItem);
    const website = await page.evaluate(el => el.querySelector('div > ul > button').textContent, jobItem);

    console.log("Title:", title);
    console.log("Location:", location);
    console.log("Website:", website);

    jobData.push({ title, location, website });
  }

  // Prepare CSV data
  const csvData = jobData.map(job => `${job.title.replace(/,/g, ".")},${job.location},${job.website}\n`).join('');

  // Write data to CSV file
  fs.writeFile('results.csv', csvData, 'utf8', function (err) {
    if (err) {
      console.error("Error writing to CSV:", err);
    } else {
      console.log("Data written to CSV file successfully!");
    }
  });

  await browser.close();
})();
