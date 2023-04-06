const https = require('https');
const querystring = require('querystring');

const request = async () => {
	var path='/v1/checkouts/086256175331F43D38BC40A346359D95.uat01-vm-tx02/payment';
	// path += '?entityId=8a8294174b7ecb28014b9699220015ca';
	const options = {
		port: 443,
		host: 'eu-test.oppwa.com',
		path: path,
		method: 'GET',
		headers: {
			'Authorization':'Bearer OGE4Mjk0MTc0YjdlY2IyODAxNGI5Njk5MjIwMDE1Y2N8c3k2S0pzVDg='
		}
	};
	return new Promise((resolve, reject) => {
		const postRequest = https.request(options, function(res) {
			const buf = [];
			res.on('data', chunk => {
				buf.push(Buffer.from(chunk));
			});
			res.on('end', () => {
				const jsonString = Buffer.concat(buf).toString('utf8');
				try {
					resolve(JSON.parse(jsonString));
				} catch (error) {
					reject(error);
				}
			});
		});
		postRequest.on('error', reject);
		postRequest.end();
	});
};

request().then(console.log).catch(console.error);