import React, { Component } from 'react';
import Routes from './Components/utilities/routes.jsx';
import Navbar from './Components/shared/navbar/navbar.jsx';
import Wrapper from './Components/shared/page-wrapper/page-wrapper.jsx';
import Meta from './Components/utilities/meta/meta.jsx';
//import Footer from './Components/shared/footer/footer.jsx';

class App extends Component {
	render() {
		return (
			<div>
				<Meta />
				<Navbar />
				<Wrapper>
					<Routes />
				</Wrapper>
			</div>
		);
	}
}

export default App;
