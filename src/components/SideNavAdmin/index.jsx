// Importa o ícone SignOut da biblioteca phosphor-icons
import { SignOut } from '@phosphor-icons/react';
// Importa a imagem de logo da aplicação
import Logo from '../../assets/logo-login.png';
// Importa o hook personalizado para acesso ao contexto do usuário
import { useUser } from '../../hooks/UserContext';
// Importa os links de navegação do arquivo navLinks.jsx
import { navLinks } from './navLinks';
// Importa os componentes estilizados específicos para este componente
import { Container, Footer, NavLink, NavLinkContainer } from './styles';
// Importa o hook useResolvedPath do React Router para obter o caminho atual
import { useResolvedPath } from 'react-router-dom';

// Define o componente SideNavAdmin que representa a barra lateral de navegação da área administrativa
export function SideNavAdmin() {
	// Obtém a função logout do contexto do usuário
	const { logout } = useUser();
	// Obtém o caminho atual da URL para determinar qual link está ativo
	const { pathname } = useResolvedPath();

	// Retorna a estrutura do componente
	return (
		// Container principal da barra lateral
		<Container>
			{/* Logo no topo da barra lateral */}
			<img src={Logo} alt="Hamburguer Logo DevBurger" />
			{/* Container para os links de navegação */}
			<NavLinkContainer>
				{/* Mapeia os links de navegação importados do arquivo navLinks */}
				{navLinks.map((link) => (
					// Cria um link de navegação para cada item na array navLinks
					<NavLink 
					key={link.id} // Usa o ID como chave única para o React
					to={link.path} // Define a rota para onde o link direciona
					$isActive={pathname === link.path} // Destaca o link se estiver na página atual
					>
						{/* Ícone do link */}
						{link.icon}
						{/* Texto/nome do link */}
						<span>{link.label}</span>
					</NavLink>
				))}
			</NavLinkContainer>
			{/* Rodapé da barra lateral contendo o link de logout */}
			<Footer>
				{/* Link de logout que redireciona para a página de login e executa a função logout */}
				<NavLink to="/login" onClick={logout}>
					{/* Ícone de saída */}
					<SignOut />
					{/* Texto "Sair" */}
					<span>Sair</span>
				</NavLink>
			</Footer>
		</Container>
	);
}