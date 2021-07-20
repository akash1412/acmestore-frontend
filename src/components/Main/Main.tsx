import React from 'react';
import { Box, Icon } from '@chakra-ui/react';
import Navbar from '../Navbar/Navbar';
import { IoCaretDownCircleOutline } from 'react-icons/io5';
import ModalContextProvider from '../../context/ModalContext';
import DrawerContainer from '../DrawerContainer/DrawerContainer';
import DrawerContextProvider from '../../context/DrawerContext';

interface MainCompProps {
	children: React.ReactNode;
}

const Main: React.FC<MainCompProps> = ({ children }) => {
	const [openSidebar, setOpenSidebar] = React.useState(false);

	const handleSidebarToggle = () => {
		setOpenSidebar(prevState => !prevState);
	};

	return (
		<Box d='flex' flexDir='column'>
			<DrawerContextProvider>
				<Navbar toggleSidebar={handleSidebarToggle} />
				<Box mt='4.5rem' pos='relative'>
					<Box
						minH='calc(100vh - 4.5rem)'
						d='flex'
						w='100%'
						h='100%'
						bgColor='#faf9f9'>
						{children}
					</Box>
				</Box>
				<DrawerContainer />
			</DrawerContextProvider>
		</Box>
	);
};

export default Main;
