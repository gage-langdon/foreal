import React from 'react';
import { Helmet } from 'react-helmet';

const title = 'Foreal.io';
const forealUrl = 'www.foreal.io';
const description = 'Ask questions, get anonymous answers';
const image = null;
const imageWidth = null;
const imageHeight = null;

export default () => (
	<Helmet>
		<meta charSet="utf-8" />
		<title>{title}</title>
		<link rel="canonical" href={forealUrl} />

		<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />

		<meta name="description" content={description} />

		{/*Schema.org markup for Google+*/}
		<meta itemProp="name" content={title} />
		<meta itemProp="description" content={description} />
		{/* <meta itemProp="image" content={imageUrl || defaults.image} /> */}

		{/* Twitter Card data */}
		{/* <meta name="twitter:site" content="@foreal" /> */}
		<meta name="twitter:title" content={title} />
		<meta name="twitter:description" content={description} />
		{/* Twitter summary card with large image must be at least 280x150px */}
		{/* <meta name="twitter:image:src" content={imageUrl || defaults.image} /> */}

		{/* Open Graph data */}
		<meta property="og:url" content={forealUrl} />
		<meta property="og:type" content={'Website'} />
		<meta property="og:title" content={title} />
		<meta property="og:description" content={description} />
		<meta property="og:image" content={image} />
		<meta property="og:image:width" content={imageWidth} />
		<meta property="og:image:height" content={imageHeight} />
	</Helmet>
);
