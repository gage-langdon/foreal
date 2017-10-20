import React, { Component } from 'react';
import Routes from './Components/utilities/routes.jsx';

class App extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <Routes />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
