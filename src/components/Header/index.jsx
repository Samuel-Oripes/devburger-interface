// Importa os componentes estilizados específicos para o cabeçalho
import {
	Container,      // Container principal
	Content,        // Container do conteúdo
	HeaderLink,     // Links de navegação estilizados
	LinkContainer,  // Container para links
	Logout,         // Botão de logout estilizado
	Navigation,     // Container para navegação
	Options,        // Container para opções do usuário
	Profile,        // Container para informações do perfil
} from './styles';

// Importa ícones da biblioteca phosphor-icons
import { ShoppingCart, UserCircle } from '@phosphor-icons/react';
// Importa hooks do React Router para navegação e resolução de caminho
import { useNavigate, useResolvedPath } from 'react-router-dom';
// Importa o hook personalizado para acesso ao contexto do usuário
import { useUser } from '../../hooks/UserContext';

// Define o componente Header que será o cabeçalho da aplicação
export function Header() {
	// Hook para navegação programática entre rotas
	const navigate = useNavigate();
	// Obtém as funções e dados do contexto do usuário
	const { logout, userInfo } = useUser();

	// Obtém o caminho atual da URL para determinar qual link está ativo
	const { pathname } = useResolvedPath();

	// Função para realizar o logout do usuário
	function logoutUser() {
		// Chama a função logout do contexto de usuário
		logout();
		// Redireciona o usuário para a página de login
		navigate('/login');
	}

	// Retorna a estrutura do componente
	return (
		// Container principal do cabeçalho
		<Container>
			{/* Container para o conteúdo do cabeçalho */}
			<Content>
				{/* Seção de navegação com links para as páginas principais */}
				<Navigation>
					<div>
						{/* Link para a página inicial, destacado se estiver ativo */}
						<HeaderLink to="/" $isActive={pathname === '/'}>
							Home
						</HeaderLink>
						{/* Separador visual */}
						<hr />
						{/* Link para a página de cardápio, destacado se estiver ativo */}
						<HeaderLink to="/cardapio" $isActive={pathname === '/cardapio'}>
							Cardápio
						</HeaderLink>
					</div>
				</Navigation>
				{/* Seção de opções do usuário (perfil e carrinho) */}
				<Options>
					{/* Container do perfil do usuário */}
					<Profile>
						{/* Ícone de usuário */}
						<UserCircle color="#FFFF" size={24} />
						<div>
							{/* Saudação personalizada com o nome do usuário */}
							<p>
								Olá, <span>{userInfo.name}</span>
							</p>
							{/* Botão para fazer logout, que chama a função logoutUser quando clicado */}
							<Logout onClick={logoutUser}>Sair</Logout>
						</div>
					</Profile>
					{/* Container do link para o carrinho */}
					<LinkContainer>
						{/* Ícone de carrinho de compras */}
						<ShoppingCart color="#FFFF" size={24} />
						{/* Link para a página do carrinho */}
						<HeaderLink to="/carrinho">Carrinho</HeaderLink>
					</LinkContainer>
				</Options>
			</Content>
		</Container>
	);
}