import React, { Component } from 'react';
import { Route } from 'react-router';

import Home from '../pages/home/home.jsx';
import Game from '../pages/game/game';

export default class Routes extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Home} />
                <Route exact path="/:gameId" component={Game} />
            </div>
        );
    }
}
