import { createContext, useContext, useEffect, useState } from 'react';

// Cria um contexto React vazio para gerenciar as informações do usuário
const UserContext = createContext({});

/**
 * Componente Provider que fornece acesso ao contexto de usuário 
 * para todos os componentes filhos na árvore de componentes
 */
export const UserProvider = ({ children }) => {
	// Estado para armazenar as informações do usuário logado
	const [userInfo, setUserInfo] = useState({});

	/**
	 * Função para salvar/atualizar os dados do usuário
	 * Atualiza o estado e persiste no localStorage
	 */
	const putUserData = (userInfo) => {
		// Atualiza o estado com as informações do usuário
		setUserInfo(userInfo);

		// Salva as informações do usuário no localStorage para persistência
		localStorage.setItem('devburger:userData', JSON.stringify(userInfo));
	};

	/**
	 * Função para realizar o logout do usuário
	 * Limpa o estado e remove os dados do localStorage
	 */
	const logout = () => {
		// Limpa o estado de informações do usuário
		setUserInfo({});
		// Remove os dados do usuário do localStorage
		localStorage.removeItem('devburger:userData');
	};

	/**
	 * Effect que é executado uma vez na montagem do componente
	 * Verifica se há dados do usuário salvos no localStorage
	 * e restaura o estado a partir desses dados
	 */
	useEffect(() => {
		// Recupera dados do usuário do localStorage (se existirem)
		const userInfoLocalStorage = localStorage.getItem('devburger:userData');

		// Se existirem dados salvos, atualiza o estado com esses dados
		if (userInfoLocalStorage) {
			setUserInfo(JSON.parse(userInfoLocalStorage));
		}
	}, []); // Array de dependências vazio indica que o efeito roda apenas uma vez

	// Fornece o contexto com todos os valores e funções para os componentes filhos
	return (
		<UserContext.Provider value={{ userInfo, putUserData, logout }}>
			{children}
		</UserContext.Provider>
	);
};

/**
 * Hook personalizado para facilitar o acesso ao contexto do usuário
 * em qualquer componente da aplicação
 */
export const useUser = () => {
	// Obtém o contexto do usuário
	const context = useContext(UserContext);

	// Verificação para garantir que o hook seja usado dentro do Provider
	if (!context) {
		throw new Error('useUser must be a valid context');
	}

	// Retorna o contexto para uso nos componentes
	return context;
};