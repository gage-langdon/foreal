import React, { Component } from 'react';
import SocketIO from '../../../services/socket.io';

export default class Game extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col">game</div>
                </div>
            </div>
        );
    }
}
