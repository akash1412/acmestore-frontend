import { FC } from 'react';
import { Box, List, ListItem } from '@chakra-ui/react';
import Logo from '../Logo/Logo';
import { Link as LinkUI } from '@chakra-ui/react';

const Sidebar: FC<{ open: boolean; close: () => void }> = ({ open, close }) => {
	return (
		<>
			{open && <BackDrop onClick={close} />}
			<Box
				position='fixed'
				top='0'
				left='0'
				height='100vh'
				w='60%'
				bgColor='#fff'
				color='#000'
				overflowY='scroll'
				zIndex='6'
				transition='transform .3s'
				transform={open ? 'translateX(0)' : 'translateX(-100%)'}
				overflow='hidden'
				p='1.2rem'
				d='flex'
				flexDir='column'>
				<Logo />
				<List mt='1rem' fontSize='1.2rem'>
					<ListItem
						d='inline-block'
						pb='.3rem'
						color='black'
						borderBottom='1px solid #000'
						my='.5rem'>
						<LinkUI
							href='/auth'
							textDecor='none'
							opacity='.6'
							_hover={{ opacity: '1' }}>
							login
						</LinkUI>
					</ListItem>
					<br />
					<ListItem
						d='inline-block'
						pb='.3rem'
						color='black'
						borderBottom='1px solid #000'
						my='.5rem'>
						<LinkUI
							href='/s/men'
							textDecor='none'
							opacity='.6'
							_hover={{ opacity: '1' }}>
							Mens
						</LinkUI>
					</ListItem>
					<br />
					<ListItem
						d='inline-block'
						pb='.3rem'
						borderBottom='1px solid #000'
						my='.5rem'>
						<LinkUI
							href='/s/women'
							color='black'
							opacity='.6'
							_hover={{ opacity: '1' }}>
							Womens
						</LinkUI>
					</ListItem>
					<br />
					<ListItem
						d='inline-block'
						pb='.3rem'
						borderBottom='1px solid #000'
						my='.5rem'>
						<LinkUI
							href='/s/jacket'
							color='black'
							opacity='.6'
							_hover={{ opacity: '1' }}>
							Jackets
						</LinkUI>
					</ListItem>
					<br />
					<ListItem
						d='inline-block'
						pb='.3rem'
						borderBottom='1px solid #000'
						my='.5rem'>
						<LinkUI
							href='/s/sneaker'
							color='black'
							opacity='.6'
							_hover={{ opacity: '1' }}>
							Sneakers
						</LinkUI>
					</ListItem>
					<br />
					<ListItem
						d='inline-block'
						pb='.3rem'
						borderBottom='1px solid #000'
						my='.5rem'>
						<LinkUI
							href='/s/hat'
							color='black'
							opacity='.6'
							_hover={{ opacity: '1' }}>
							Hats
						</LinkUI>
					</ListItem>
				</List>
			</Box>
		</>
	);
};

const BackDrop: FC<{ onClick: () => void }> = props => {
	return (
		<Box
			bgColor='rgba(0, 0, 0, 0.3)'
			pos='absolute'
			top='0'
			left='0'
			zIndex='6'
			h='100%'
			w='100%'
			cursor='pointer'
			{...props}>
			{'\u00A0'}
		</Box>
	);
};

export default Sidebar;
