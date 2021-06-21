import React from "react";
import { Box } from "@chakra-ui/react";
import Navbar from "../Navbar/Navbar";

import ModalContextProvider from "../../context/ModalContext";
import DrawerContainer from "../DrawerContainer/DrawerContainer";
import DrawerContextProvider from "../../context/DrawerContext";

interface MainCompProps {
	children: string | React.ReactNode;
}

const Main: React.FC<MainCompProps> = ({ children }) => {
	const [openSidebar, setOpenSidebar] = React.useState(false);

	const handleSidebarToggle = () => {
		setOpenSidebar(prevState => !prevState);
	};

	console.log(openSidebar);
	return (
		<Box d='flex' flexDir='column'>
			<DrawerContextProvider>
				<Navbar toggleSidebar={handleSidebarToggle} />

				<Box mt='4.5rem' pos='relative'>
					<Box
						minH='calc(100vh - 4.5rem)'
						position='absolute'
						d='flex'
						w='100%'
						bgColor='#f1faee'>
						{children}
					</Box>
				</Box>

				<DrawerContainer />
			</DrawerContextProvider>
		</Box>
	);
};

export default Main;
