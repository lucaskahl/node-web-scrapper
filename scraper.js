const fetch = require('node-fetch');
const cheerio = require('cheerio');

const searchUrl = 'https://www1.anitube.info/busca/?search_query=';
const animeUrl = 'https://www1.anitube.info/vd/';

function searchAnimes(searchTerm) {
	return fetch(`${searchUrl}${searchTerm}`)
		.then(response => response.text())
		.then(body => {
			const animes = [];
			const $ = cheerio.load(body);
			$('.well-sm').each(function(i, element) {
				const $element = $(element);
				const $image = $element.find('a div img');
				const $title = $element.find('a span.video-title');
				const $url = $element.find('a');

				const episodeId = $url.attr('href').match(/vd\/(.*)\//)[1];

				const anime = {
					image: $image.attr('src'),
					title: $title.text(),
					episodeId
				};
				animes.push(anime);
			});
			return animes;
		});
}

function getAnime(episodeId) {
	return fetch(`${animeUrl}${episodeId}`)
		.then(response => response.text())
		.then(body => {
			const $ = cheerio.load(body);
			const $title = $('h1.big-title-truncate.m-t-0').text();
			const $videoUrl = $('video').attr('src');

			const categories = [];

			$('.tag').each(function(i, element) {
				const category = $(element).text();
				categories.push(category);
			});

			return {
				title: $title,
				categories
			};
		});
}

module.exports = {
	searchAnimes,
	getAnime
};
