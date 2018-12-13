const express = require('express');

const scraper = require('./scraper');

const app = express();

app.get('/', (req, res) => {
	res.json({
		message: 'Scrapping is Fun!'
	});
});

app.get('/search/:title', (req, res) => {
	scraper.searchAnimes(req.params.title).then(animes => {
		res.json(animes);
	});
});

app.get('/anime/:episodeId', (req, res) => {
	scraper.getAnime(req.params.episodeId).then(anime => {
		res.json(anime);
	});
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Listening on ${port}`);
});
