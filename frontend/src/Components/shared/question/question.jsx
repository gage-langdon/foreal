import React from 'react';
export default ({ data }) => {
	let { text, dateCreated } = data;
	let date = new Date(dateCreated);
	return (
		<div className="">
			<div className="">
				<ul>
					<li>{text}</li>
					<li>{dateCreated}</li>
				</ul>
			</div>
		</div>
	);
};
