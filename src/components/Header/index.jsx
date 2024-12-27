import {
	Container,
	HeaderLink,
	LinkContainer,
	Logout,
	Navigation,
	Options,
	Profile,
	Content,
} from './styles';

import { ShoppingCart, UserCircle } from '@phosphor-icons/react';

export function Header() {
	return (
		<Container>
			<Content>
				<Navigation>
					<div>
						<HeaderLink>Home</HeaderLink>
						<HeaderLink>Cardápio</HeaderLink>
					</div>
				</Navigation>
				<Options>
					<Profile>
						<UserCircle color="#FFFF" size={24} />
						<div>
							<p>
								Olá, <span>Rodolfo</span>
							</p>
							<Logout>Sair</Logout>
						</div>
					</Profile>
					<LinkContainer>
						<ShoppingCart color="#FFFF" size={24} />
						<HeaderLink>Carrinho</HeaderLink>
					</LinkContainer>
				</Options>
			</Content>
		</Container>
	);
}
