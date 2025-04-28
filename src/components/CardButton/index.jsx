// Importação da imagem do carrinho de compras para ser utilizada no botão
import Cart from '../../assets/carrinho.png'; // Ícone de carrinho de compras

// Importação do componente estilizado que define a aparência do botão
import { ContainerButton } from './styles'; // Estilo específico para este botão

// Componente funcional CartButton - Um botão especializado com ícone de carrinho
// Recebe todas as props via spread operator para permitir flexibilidade
export function CartButton({ ...props }) {
	// Renderiza o botão estilizado com a imagem do carrinho dentro
	// Passa todas as props recebidas para o ContainerButton (como onClick, etc.)
	return (
		<ContainerButton {...props}>
			{/* Imagem do ícone de carrinho com texto alternativo para acessibilidade */}
			<img src={Cart} alt="carrinho-de-compras" />
		</ContainerButton>
	);
}