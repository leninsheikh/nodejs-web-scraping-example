const rp = require('request-promise');
const $ = require('cheerio');
var fs = require('fs');

const laptops = 'https://www.startech.com.bd/laptop-notebook/laptop?limit=1000';

console.log('► Starting scraping');

const data = [];

rp(laptops)
    .then(res => {
        const laptopCard = $('.product-thumb', res);

        laptopCard.map((i, el) => {
            data.push({
                name: $('.product-name', el).text().trim(),
                price: $('.price span', el).text().trim(),
                url: $('.product-name a', el)[0].attribs.href
            });
        });
    })
    .then(() => {
        let json = JSON.stringify(data);
        fs.writeFile('laptops.json', json, err => {
            if (err) throw err;
            console.log(
                '\x1b[32m',
                '► Scraping is complete!',
                '\x1b[33m',
                data.length,
                '\x1b[0m',
                'Laptops are found!',
            );
        })

    });
