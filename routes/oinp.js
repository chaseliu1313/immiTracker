const URL1 =
  'https://www.ontario.ca/page/2020-ontario-immigrant-nominee-program-updates';
const axios = require('axios');
const cheerio = require('cheerio');
var express = require('express');
const puppeteer = require('puppeteer');

var router = express.Router();
let result;

//scrapping the web content to an array
async function scrapData() {
  let updateTime;
  let result;
  let updates = [];

  try {
    const browser = await puppeteer.launch({
      headless: false,
      devtools: true,
      slowMo: 350,
      userDataDir: 'C:\\userData'
    });
    const page = await browser.newPage();
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36'
    );

    await page.goto(URL1, {
      waitUntil: ['load']
    });

    result = await page.content();

    const $ = cheerio.load(result);
    updateTime = $('.clearfix')
      .first()
      .text();

    //seperate data into pieces
    $('h3', '#pagebody').each((i, ele) => {
      let content = $(ele)
        .append($(ele).nextUntil('h3'))
        .html();

      updates.push(content);
    });

    await browser.close();
    return { updateTime, updates };
  } catch (error) {
    console.log(error);
  }
}

router.get('/oinp/', async (req, res) => {
  try {
    const updates = await scrapData();

    console.log(updates);
    res.status(200).json('OINP is runing');
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;
