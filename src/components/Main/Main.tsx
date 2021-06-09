import React from "react";
import { Box } from "@chakra-ui/react";
import Navbar from "../Navbar/Navbar";

import ModalContextProvider from "../../context/ModalContext";
import BucketContainer from "./../BucketContainer/BucketContainer";
interface MainCompProps {
	children: string | React.ReactNode;
}

const Main: React.FC<MainCompProps> = ({ children }) => {
	return (
		<React.Fragment>
			<Navbar />
			<Box mt='4.5rem'>
				<Box minH='calc(100vh - 4.5rem)' d='flex'>
					{children}
				</Box>
			</Box>
			{/* <BucketContainer /> */}
		</React.Fragment>
	);
};

export default Main;
