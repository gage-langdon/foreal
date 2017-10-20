const CONFIG = require('../config');
const SocketIO = require('socket.io-client');
const Socket = SocketIO(CONFIG.socket);

const emit = async (eventname, data) => {
    await Socket.emit(eventname, data);
};

export default { emit };
