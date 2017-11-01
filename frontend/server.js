const Express = require('express');
const Server = Express();
const path = require('path');

Server.use(Express.static(path.join(__dirname, './build')));

Server.listen('3000', () => console.log('server started on 3000'));
