import React, { Component } from 'react';
import Routes from './Components/utilities/routes.jsx';
import Navbar from './Components/shared/navbar/navbar.jsx';

class App extends Component {
	render() {
		return (
			<div className="container-fluid">
				<div className="row">
					<div className="col">
						<Navbar />
						<Routes />
					</div>
				</div>
			</div>
		);
	}
}

export default App;
