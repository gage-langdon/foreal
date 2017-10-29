import React from 'react';

export default ({}) => {
	let { text, dateCreated } = data;
	let date = new Date(dateCreated);
	return (
		<div>
			<div className="row justify-content-center">
				<div className="col-1 text-left pl-0">
					<button className="btn btn-secondary" onClick={this.onRefresh}>
						<i className="material-icons align-middle">
							{this.state.isLoading ? <Loading isLoading={this.state.isLoading} /> : 'refresh'}
						</i>
					</button>
				</div>
				<div className="col-10 text-center">{question ? <h1>{question.text}</h1> : <Loading isLoading={true} />}</div>
				<div className="col-1 text-right pl-0">
					{/* <button className="btn btn-secondary" onClick={this.onToggleModal}>
													Share
												</button> */}
				</div>
				<div className="col-12 px-0">
					<hr />
				</div>
				<div className="px-0 pt-0 pb-2 text-center">
					<h5>Share this link to get responses: {`foreal.io/${question._id}`}</h5>
				</div>
			</div>

			<div className="row justify-content-center">{Responses}</div>
			<div className="row justify-content-center py-2">
				<div className="col-1">
					<Loading isLoading={this.state.isLoading} color="#e6f2ff" />
				</div>
			</div>
		</div>
	);
};
