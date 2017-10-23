import React, { Component } from 'react';

export default class Footer extends Component {
	render() {
		return (
			<div className="container-fluid" style={{ position: 'absolute', bottom: 0, right: 0 }}>
				<div className="row">
					<div className="col text-right pr-5">Gage Langdon 2017</div>
				</div>
			</div>
		);
	}
}
