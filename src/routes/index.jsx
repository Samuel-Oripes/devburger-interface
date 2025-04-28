// Importação dos componentes de roteamento do react-router-dom
import { Route, Routes } from 'react-router-dom';

// Importação de todos os componentes de contêineres que serão usados nas rotas
import {
	Cart,           // Componente para exibir o carrinho de compras
	Checkout,       // Componente para finalização da compra
	CompletePayment, // Componente para confirmar pagamento concluído
	EditProduct,    // Componente para edição de produtos (admin)
	Home,           // Componente da página inicial
	Login,          // Componente da página de login
	Menu,           // Componente para exibir o cardápio
	NewProduct,     // Componente para criar novos produtos (admin)
	Orders,         // Componente para gerenciar pedidos (admin)
	Products,       // Componente para listar produtos (admin)
	Register,       // Componente para registro de novos usuários
} from '../containers';

// Importação dos layouts que serão usados para envolver rotas específicas
import { UserLayout } from '../layouts/UserLayout';    // Layout para usuários comuns
import { AdminLayout } from '../layouts/AdminLayout';  // Layout para administradores

// Componente principal de roteamento que define todas as rotas da aplicação
export function Router(){
	return (
		<Routes>
			{/* Grupo de rotas para usuários comuns, todas compartilham o UserLayout */}
			<Route path='/' element={<UserLayout />}>
				<Route path='/' element={<Home />} />                 {/* Rota para a página inicial */}
				<Route path='/cardapio' element={<Menu />} />         {/* Rota para visualizar o cardápio */}
				<Route path='/carrinho' element={<Cart />} />         {/* Rota para o carrinho de compras */}
				<Route path='/checkout' element={<Checkout />} />     {/* Rota para finalização da compra */}
				<Route path='/complete' element={<CompletePayment />} /> {/* Rota para confirmação de pagamento */}
			</Route>

			{/* Grupo de rotas para administradores, todas compartilham o AdminLayout */}
			<Route path='/admin' element={<AdminLayout />}>
				<Route path='/admin/pedidos' element={<Orders/>} />           {/* Rota para gerenciar pedidos */}
				<Route path='/admin/novo-produto' element={<NewProduct/>} />  {/* Rota para adicionar produtos */}
				<Route path='/admin/editar-produto' element={<EditProduct/>} /> {/* Rota para editar produtos */}
				<Route path='/admin/produtos' element={<Products/>} />        {/* Rota para listar produtos */}
			</Route>

			{/* Rotas independentes sem layout específico */}
			<Route path='/login' element={<Login />} />         {/* Rota para página de login */}
			<Route path='/cadastro' element={<Register />} />   {/* Rota para página de cadastro */}
		</Routes>
	)
}