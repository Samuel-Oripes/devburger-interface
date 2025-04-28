import { createContext, useContext, useEffect, useState } from 'react';

// Cria um contexto React vazio para gerenciar o estado do carrinho
const CartContext = createContext({});

// Componente Provider que irá fornecer acesso ao contexto do carrinho para os componentes filhos
export const CartProvider = ({ children }) => {
	// Estado para armazenar os produtos no carrinho
	const [cartProducts, setCartProducts] = useState([]);

	/**
	 * Função para adicionar um produto no carrinho
	 * Se o produto já existe, aumenta a quantidade
	 * Se o produto é novo, adiciona com quantidade 1
	 */
	const putProductInCart = (product) => {
		// Verifica se o produto já existe no carrinho
		const cartIndex = cartProducts.findIndex((prd) => prd.id === product.id);

		let newProductsInCart = [];

		if (cartIndex >= 0) {
			// Se o produto já existe no carrinho
			newProductsInCart = cartProducts;

			// Aumenta a quantidade do produto existente
			newProductsInCart[cartIndex].quantity =
				newProductsInCart[cartIndex].quantity + 1;

			setCartProducts(newProductsInCart);
		} else {
			// Se é um produto novo, adiciona com quantidade 1
			product.quantity = 1;
			newProductsInCart = [...cartProducts, product];
			setCartProducts(newProductsInCart);
		}

		// Salva o estado atualizado no localStorage
		updateLocalStorage(newProductsInCart);
	};

	/**
	 * Função para limpar todos os produtos do carrinho
	 */
	const clearCart = () => {
		updateLocalStorage([]);
		setCartProducts([]);
	};

	/**
	 * Função para remover um produto específico do carrinho
	 */
	const deleteProduct = (productId) => {
		// Filtra todos os produtos exceto o que deve ser removido
		const newCart = cartProducts.filter((prd) => prd.id !== productId);

		setCartProducts(newCart);
		updateLocalStorage(newCart);
	};

	/**
	 * Função para aumentar a quantidade de um produto específico
	 */
	const increaseProduct = (productId) => {
		// Mapeia o carrinho e aumenta a quantidade apenas do produto específico
		const newCart = cartProducts.map((prd) => {
			return prd.id === productId
				? { ...prd, quantity: prd.quantity + 1 }
				: prd;
		});

		setCartProducts(newCart);
		updateLocalStorage(newCart);
	};

	/**
	 * Função para diminuir a quantidade de um produto específico
	 * Só diminui se a quantidade for maior que 1
	 */
	const decreaseProduct = (productId) => {
		// Encontra o índice do produto no carrinho
		const cartIndex = cartProducts.findIndex((prd) => prd.id === productId);

		// Só diminui se a quantidade for maior que 1
		if (cartProducts[cartIndex].quantity > 1) {
			const newCart = cartProducts.map((prd) => {
				return prd.id === productId
					? { ...prd, quantity: prd.quantity - 1 }
					: prd;
			});

			setCartProducts(newCart);
			updateLocalStorage(newCart);
		}
	};

	/**
	 * Função auxiliar para atualizar o localStorage com o estado atual do carrinho
	 */
	const updateLocalStorage = (products) => {
		localStorage.setItem('devburger:cartInfo', JSON.stringify(products));
	};

	/**
	 * Effect que roda uma vez na montagem do componente
	 * Recupera os dados do carrinho salvos no localStorage (persistência)
	 */
	useEffect(() => {
		const clientCartData = localStorage.getItem('devburger:cartInfo');

		if (clientCartData) {
			setCartProducts(JSON.parse(clientCartData));
		}
	}, []);

	// Fornece o contexto com todos os valores e funções para os componentes filhos
	return (
		<CartContext.Provider
			value={{
				cartProducts,
				putProductInCart,
				clearCart,
				deleteProduct,
				increaseProduct,
				decreaseProduct,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

/**
 * Hook personalizado para facilitar o acesso ao contexto do carrinho
 * em qualquer componente da aplicação
 */
export const useCart = () => {
	const context = useContext(CartContext);

	// Verificação para garantir que o hook seja usado dentro do Provider
	if (!context) {
		throw new Error('useCart must be used with a context');
	}

	return context;
};