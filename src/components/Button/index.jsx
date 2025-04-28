// Importação da biblioteca PropTypes para validação de propriedades
import PropTypes from 'prop-types'; // Permite definir os tipos esperados para as props do componente
import { ContainerButton } from './styles'; // Importa o componente estilizado do botão

// Componente funcional Button - Um botão reutilizável em toda aplicação
// Recebe children (conteúdo interno) e outras props via spread operator
export function Button({ children, ...props }) {
	// Renderiza o botão estilizado, passando todas as props recebidas para ele
	// O children é renderizado dentro do botão (geralmente o texto do botão)
	return <ContainerButton {...props}>{children}</ContainerButton>;
}

// Definição das PropTypes para validação
// Especifica que children deve ser uma string
Button.propTypes = {
	children: PropTypes.string,
};