import React, { Component } from 'react';
import CopyToClipboard from 'copy-to-clipboard';
import { ShareButtons, generateShareIcon } from 'react-share';

const { FacebookShareButton, TwitterShareButton, LinkedinShareButton, RedditShareButton } = ShareButtons;
const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const LinkedinIcon = generateShareIcon('linkedin');
const RedditIcon = generateShareIcon('reddit');

export default class Share extends Component {
	constructor() {
		super();

		this.state = {
			wasCopied: false
		};
	}
	onCopyLink(text) {
		CopyToClipboard(text);
		this.setState({ wasCopied: true }, () =>
			setTimeout(() => {
				this.setState({ wasCopied: false });
			}, 3000)
		);
	}
	render() {
		const { title, description, path } = this.props;
		try {
			return (
				<div className="row justify-content-center">
					<div className="col-4 px-0">
						<div className="row justify-content-center">
							<div className="col-1">
								<FacebookShareButton url={`foreal.io/${path}`} quote={title}>
									<FacebookIcon size={30} round={true} />
								</FacebookShareButton>
							</div>
							<div className="col-1">
								<TwitterShareButton url={`foreal.io/${path}`} title={`${title}  - Answer anonymously at: http://foreal.io/${path}`}>
									<TwitterIcon size={30} round={true} />
								</TwitterShareButton>
							</div>
							<div className="col-1">
								<LinkedinShareButton
									url={`foreal.io/${path}`}
									title={`${title}  - Answer anonymously at: http://foreal.io/${path}`}
									description={description}
								>
									<LinkedinIcon size={30} round={true} />
								</LinkedinShareButton>
							</div>
							<div className="col-1">
								<RedditShareButton url={`foreal.io/${path}`} title={title}>
									<RedditIcon size={30} round={true} />
								</RedditShareButton>
							</div>
						</div>
					</div>
					<div className="col-7 px-0">
						<button className="btn btn-secondary p-1" onClick={() => this.onCopyLink(`foreal.io/${path}`)}>
							{this.state.wasCopied ? 'copied to clipboard' : `foreal.io/${path}`}
						</button>
					</div>
				</div>
			);
		} catch (err) {
			return (
				<div className="row">
					<div className="col-12 text-center">
						<h4>{`Share this to get responses: foreal.io/${path}`}</h4>
					</div>
				</div>
			);
		}
	}
}
