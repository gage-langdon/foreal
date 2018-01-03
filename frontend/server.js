const Express = require('express');
const Compression = require('compression');
const Server = Express();
const path = require('path');

Server.use(Compression());
Server.use(Express.static(path.join(__dirname, './build')));

Server.get('*', (req, res) => {
	res.sendFile(`${__dirname}/build/index.html`);
});
Server.listen('3000', () => console.log('server started on 3000'));
