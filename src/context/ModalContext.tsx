import React from "react";

interface ModalContextInterface {
	isOpen: boolean;
	toggleModal: () => void;
}

interface ModalChildInterface {
	children: React.ReactNode;
}
export const ModalContext = React.createContext<ModalContextInterface>({
	isOpen: false,
	toggleModal: () => {},
});

export const useModalContext = () => React.useContext(ModalContext);

const ModalContextProvider: React.FC<ModalChildInterface> = ({ children }) => {
	const [isOpen, setIsOpen] = React.useState<boolean>(false);

	const toggleModal = (): void => {
		setIsOpen(prevState => !prevState);
	};

	return (
		<ModalContext.Provider value={{ isOpen, toggleModal }}>
			{children}
		</ModalContext.Provider>
	);
};

export default ModalContextProvider;
