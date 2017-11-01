import React from 'react';

const Wrapper = ({ children }) => (
	<div className="container-fluid">
		<div className="row align-items-center justify-content-center">
			<div className="col">
				<div className="jumbotron p-0" style={{ backgroundColor: '#ffffff', border: 'solid #e6f2ff 1px', borderBottom: 'none' }}>
					<div className="container-fluid p-1" style={{ height: '100vh' }}>
						{children}
					</div>
				</div>
			</div>
		</div>
	</div>
);
export default Wrapper;
