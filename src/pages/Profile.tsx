import { FC, useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import axios from "./../API/API";
import { useAuthContext } from "../context/AuthContext";

interface UserDetail {
	name: string;
	email: string;
	photo?: string;
}

const ProfilePage = () => {
	const [isLoading, setIsLoading] = useState(false);

	const [userDetail, setUserDetail] = useState<null | UserDetail>(null);

	const { user } = useAuthContext();

	useEffect(() => {
		axios({
			url: "/users/me",
			method: "GET",
			headers: {
				authorization: `Bearer ${user?.token}`,
			},
		}).then(res => console.log(res.data.data));
	});

	return <Box>Profile Page</Box>;
};

export default ProfilePage;
