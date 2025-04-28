import { CartProvider } from './CartContext';
import { UserProvider } from './UserContext';

/**
 * Componente AppProvider
 * 
 * Este componente combina múltiplos context providers em um único provider
 * para simplificar a estrutura da árvore de componentes na aplicação
*/
const AppProvider = ({ children }) => {
	return (
		// Envolve a aplicação com o UserProvider para fornecer contexto de usuário
		<UserProvider>
			{/* Aninha o CartProvider dentro do UserProvider 
                Isso permite que o CartProvider tenha acesso ao contexto de usuário se necessário */}
			<CartProvider>{children}</CartProvider>
		</UserProvider>
	);
};

// Exporta o AppProvider como exportação padrão do arquivo
export default AppProvider;