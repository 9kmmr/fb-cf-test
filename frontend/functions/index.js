const functions = require('firebase-functions');
const axios = require('axios');
require('dotenv').config();
const cmc_api_key = process.env.CMC_KEY;
const finage_api_key = process.env.FINAGE_API_KEY;

const express = require('express');
const bodyParser = require('body-parser');

const app = express()
const main = express()

main.use('/api/v1', app)
main.use(bodyParser.json())
exports.webApi = functions.https.onRequest(main)

app.get('/test', (req, res) => {
  res.status(200).send({status: "ok", message: 'API TEST'})
})

app.get('/coins', async (req, res) => {

  let topcoins = await getTopCoins();
  if (topcoins.length) {
    let allCoinsData = await getCoinsData(topcoins.map(coin => coin.symbol.toUpperCase()).join());
    res.status(200).send(allCoinsData);
  }

});

async function getTopCoins() {
  try {
    const topcoins = await axios.get(`https://api.finage.co.uk/list/cryptocurrency?apikey=${finage_api_key}&limit=200`);
    return await topcoins.data.results;
  } catch (error) {
    console.log(error)
  }
}
async function getCoinsData(symbols) {
  try {
    const coinData = await axios.get(`https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?symbol=${symbols}`, {
      headers: {
        'X-CMC_PRO_API_KEY': cmc_api_key
      },
      json: true,
      gzip: true
    });
    if (!coinData.data.status.error_code) {
      return await coinData.data.data;
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = main;