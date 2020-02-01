const url =
  'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/submit-profile/rounds-invitations.html';

const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

const router = express.Router();

async function scrapData() {
  const result = [];
  try {
    const page = await axios.get(url);
    const $ = cheerio.load(page.data);

    console.log($('#results').html());
    $('p').each((i, e) => {
      result.push($(e).text());
    });

    let processedResult;
    let ind1;
    let ind2;

    result.forEach(e => {
      if (e.includes('Ministerial Instructions')) {
        ind1 = result.indexOf(e);
      } else if (e.includes('Return to footnote')) {
        ind2 = result.indexOf(e);
      }

      if (ind1 !== undefined && ind2 !== undefined) {
        processedResult = result.slice(ind1, ind2);
      }
    });

    console.log(processedResult);
    return processedResult;
  } catch (error) {
    console.log(error);
  }
}

router.get('/express_entry', async (req, res) => {
  try {
    let data = await scrapData();
    //console.log(data);
    res.status(200).json('Express Entry');
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;
