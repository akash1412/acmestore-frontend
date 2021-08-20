import { FC, createContext, useContext, useState } from 'react';
import useFetch from './../hooks/useFetch';

interface ICreateContext {
	searchInput: string;
	handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface Props {
	children: React.ReactNode;
}

const SearchContext = createContext<ICreateContext>({
	searchInput: '',
	handleInputChange: () => {},
});

const SearchProvider: FC<Props> = ({ children }) => {
	const [searchInput, setSearchInput] = useState('');

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchInput(e.target.value);
	};

	const handleSearchSubmit = () => {};

	return (
		<SearchContext.Provider value={{ searchInput, handleInputChange }}>
			{children}
		</SearchContext.Provider>
	);
};

export default SearchProvider;
