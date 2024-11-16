const puppeteer = require('puppeteer');
const {headless} = require('../config/config');

exports.searchAndScrape = async (query) => {
    const browser = await puppeteer.launch({
        headless
    });

    const page = await browser.newPage();

    /**
     * Set view port 1920 * 1080 for higher screen
     */
    await page.setViewport({
        width: 1920,
        height: 1080
    })

    /**
     * Set user agent for real like results
     */
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

    /**
     * Go to google.com
     */
    await page.goto('https://www.google.com');

    /**
     * Find search box for search query results
     */
    await page.type('textarea[name="q"]', query);
    await page.keyboard.press('Enter');

    await page.waitForSelector('h3');

    /**
     * Just wait for 1 second to load results
     */
    await page.evaluate(async () => {
        setTimeout(function () {
            // wait
        }, 1000)
    })


    /**
     * Scrape titles from query result
     *
     * @type {*[]}
     */
    const titles = await page.evaluate(() => {
        const results = [];
        const items = document.querySelectorAll('h3');
        console.log(items.length)
        for (let i = 0; i < Math.min(10, items.length); i++) {
            results.push(items[i].innerText);
        }
        return results;
    });

    await browser.close();

    return titles;
};
