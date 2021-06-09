import React from "react";
import {
	InputGroup,
	Input,
	InputRightElement,
	Icon,
	Button,
} from "@chakra-ui/react";
import { GrFormView, GrFormViewHide } from "react-icons/gr";

interface Props {
	name: string;
	value: string;
	onChange: (e: React.ChangeEvent) => void;
	placeholder?: string;
}

const PasswordInput: React.FC<Props> = props => {
	const [show, setShow] = React.useState<boolean>(false);
	const handleClick = () => setShow(!show);

	return (
		<InputGroup>
			<Input
				pr='4.5rem'
				borderRadius='none'
				type={show ? "text" : "password"}
				isRequired
				{...props}
				placeholder={props.placeholder || "Enter password"}
			/>
			<InputRightElement width='4.5rem'>
				<Button h='1.75rem' borderRadius='none' size='sm' onClick={handleClick}>
					{show ? <Icon as={GrFormView} /> : <Icon as={GrFormViewHide} />}
				</Button>
			</InputRightElement>
		</InputGroup>
	);
};

export default PasswordInput;
