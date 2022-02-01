//get data from mks website and export to json file with date

const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const webScraper = async () => {
    const html = await axios.get('https://www.mkspm.com/m/prices.xhtml');
    const $ = await cheerio.load(html.data);
    let data = [];
    $('table.table-full tbody tr:nth-child(1)').each((i, elem) => {
        var beli = $(elem).find('td.royalblue label').text();
        var jual = $(elem).find('td.darkteal label').text();
        var currentdate = new Date(); 
        if (i <= 1) {
            data.push({
                date: currentdate,
                buy: beli.replace(/\s/g, '') / 1000,
                sell: jual.replace(/\s/g, '') / 1000
            })
        }
    });
    fs.writeFile('./mks.json', JSON.stringify(data), (error) => {
        if (error) throw error;
    })
    console.log(data);
}
webScraper();
