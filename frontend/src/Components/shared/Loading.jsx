import React from 'react';
import Spinner from 'react-spinkit';

export default ({ isLoading = true, color }) => {
	if (isLoading) return <Spinner name="wave" fadeIn="none" color={color || 'rgb(0,0,0,.35)'} />;
	else return null;
};
