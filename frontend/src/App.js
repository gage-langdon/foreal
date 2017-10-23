import React, { Component } from 'react';
import Routes from './Components/utilities/routes.jsx';
import Navbar from './Components/shared/navbar/navbar.jsx';
import Footer from './Components/shared/footer/footer.jsx';

class App extends Component {
	render() {
		return (
			<div style={{ overflowX: 'hidden' }}>
				<Navbar />
				<Routes />
				<Footer />
			</div>
		);
	}
}

export default App;
