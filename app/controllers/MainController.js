const puppeteerSearchService = require('../services/PuppeteerSearchService');

exports.search = async (req, res) => {
    const query = req.query.query;

    /**
     * Return error if query not present
     */
    if (!query) {
        return res.status(400).json({error: 'Search query is required'});
    }

    try {
        /**
         * Search query and scrape titles
         */
        const titles = await puppeteerSearchService.searchAndScrape(query);
        res.status(200).json({query, titles});
    } catch (error) {
        res.status(500).json({error});
    }
};
