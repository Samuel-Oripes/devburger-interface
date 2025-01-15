import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext({});

export const CartProvider = ({ children }) => {
	const [cartProducts, setCartProducts] = useState([]);

	const putProductInCart = (product) => {
        console.log(product)
    };

	const clearCart = (product) => {};

	const deleteProduct = (product) => {};

	const increaseProduct = (productId) => {};

	const decreaseProduct = (productId) => {};

	return (
		<CartContext.Provider
			value={
				(cartProducts,
				putProductInCart,
				clearCart,
				deleteProduct,
				// biome-ignore lint/style/noCommaOperator: <explanation>
				increaseProduct,
				decreaseProduct)
			}
		>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => {
	const context = useContext(CartContext);

	if (!context) {
		throw new Error('useCart must be used with a context');
	}

	return context;
};
