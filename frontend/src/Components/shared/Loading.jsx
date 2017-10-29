import React from 'react';
import Spinner from 'react-spinkit';

export default ({ isLoading,color }) => {
	if (isLoading) return <Spinner name="wave" noFadeIn color={color || "#161616"} />;
	else return null;
};
