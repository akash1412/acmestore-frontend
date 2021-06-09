import { useContext } from "react";
import { Box } from "@chakra-ui/react";

import { AuthContext } from "../../context/AuthContext";

const ProfileOverview = () => {
	// const { user } = useContext(AuthContext);

	return (
		<Box fontSize='.8rem' ml='.6rem'>
			<Box as='span' fontWeight='bold'>
				Hello,{" "}
			</Box>
			{/* {!user && <Box as='span'>John Doe</Box>}
			{user && <Box as='span'>{user.name}</Box>} */}
		</Box>
	);
};

export default ProfileOverview;
