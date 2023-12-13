//get data from mks website and export to json file with date

const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const cors = require('cors'); // Import the 'cors' package

const app = express();
const port = 3000; // Choose a port for your API

// Enable CORS for all routes
app.use(cors());

app.get('/data', async (req, res) => {
    try {
        const html = await axios.get('https://mkspamp.com.my/m/prices.xhtml');
        const $ = await cheerio.load(html.data);
        let data = [];

        $('table.table-full tbody tr:contains("Gold   : 1 Kilo 999.9 (MYR)")').each((i, elem) => {
            console.log($(elem).find('td.darkteal label').text())
            if (i <= 1) {
                data.push({
                    oneKilo: $(elem).find('td.darkteal label').text()
                })
            }
        });

        $('table.table-full tbody tr:contains("Gold   : 100 GM 999.9 (MYR)")').each((i, elem) => {
            if (i <= 1) {
                data.push({
                    oneHundredGram: $(elem).find('td.darkteal label').text()
                })
            }
        });

        $('table.table-full tbody tr:contains("Gold   : 50 GM 999.9 (MYR)")').each((i, elem) => {
            if (i <= 1) {
                data.push({
                    fiftyGram: $(elem).find('td.darkteal label').text()
                })
            }
        });

        $('table.table-full tbody tr:contains("Gold   : 1 Tael 999.9 (MYR)")').each((i, elem) => {
            if (i <= 1) {
                data.push({
                    index: $(elem).find('td.darkteal label').text()
                })
            }
        });
        // Respond with JSON data
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'An error occurred'});
    }
});

app.listen(port, () => {
    console.log(`API server is running on port ${port}`);
});