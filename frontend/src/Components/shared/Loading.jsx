import React from 'react';
import Spinner from 'react-spinkit';

export default ({ isLoading,color }) => {
	if (isLoading) return <Spinner name="wave" fadeIn="none" color={color || "#161616"} />;
	else return null;
};
