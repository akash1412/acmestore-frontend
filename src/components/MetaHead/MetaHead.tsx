import React from 'react';
import { Helmet } from 'react-helmet';

interface MetaProps {
	title: string | string[];
}

const MetaHead: React.FC<MetaProps> = ({ title }) => {
	return (
		<Helmet>
			<meta charSet='utf-8' />
			<title>{title}</title>
		</Helmet>
	);
};

export default MetaHead;
