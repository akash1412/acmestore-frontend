import React from 'react';
import { Box, Icon } from '@chakra-ui/react';
import Navbar from '../Navbar/Navbar';

import DrawerContainer from '../DrawerContainer/DrawerContainer';
import DrawerContextProvider from '../../context/DrawerContext';
import Sidebar from './../Sidebar/Sidebar';

interface MainCompProps {
	children: React.ReactNode;
}

const Main: React.FC<MainCompProps> = ({ children }) => {
	const [openSidebar, setOpenSidebar] = React.useState(false);

	const handleSidebarToggle = () => {
		setOpenSidebar(prevState => !prevState);
	};

	return (
		<Box d='flex' flexDir='column' position='relative'>
			<DrawerContextProvider>
				<Navbar toggleSidebar={handleSidebarToggle} />
				<Sidebar open={openSidebar} close={handleSidebarToggle} />
				<Box mt='4.5rem' pos='relative'>
					<Box
						minH='calc(100vh - 4.5rem)'
						position='relative'
						w='100%'
						bgColor='#fff'>
						{children}
					</Box>
				</Box>
				<DrawerContainer />
			</DrawerContextProvider>
		</Box>
	);
};

export default Main;
