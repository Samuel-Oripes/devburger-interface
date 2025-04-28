// Importação do StrictMode do React, que ajuda a identificar práticas inseguras no código
import { StrictMode } from 'react';
// Importação da função createRoot para renderização do React 18
import { createRoot } from 'react-dom/client';
// Importação do componente ToastContainer da biblioteca react-toastify para exibir notificações
import { ToastContainer } from 'react-toastify';

// Importação do BrowserRouter do react-router-dom para gerenciamento de rotas
import { BrowserRouter } from 'react-router-dom';
// Importação do contexto AppProvider que gerencia estados globais da aplicação
import AppProvider from './hooks';
// Importação do componente Router que define as rotas da aplicação
import { Router } from './routes';

// Importação dos estilos globais da aplicação
import GlobalStyles from './styles/globalStyles';
// Importação do componente Elements do Stripe para processamento de pagamentos
import { Elements } from '@stripe/react-stripe-js';
// Importação da configuração do Stripe
import stripePromise from './config/stripeConfig';
// Importação do ThemeProvider do styled-components para gerenciamento de temas
import { ThemeProvider } from 'styled-components';
// Importação do tema padrão da aplicação
import { standardTheme } from './styles/themes/standard';

// Cria a raiz do React e renderiza toda a aplicação no elemento com id 'root'
createRoot(document.getElementById('root')).render(
	// StrictMode ativa verificações e avisos adicionais durante o desenvolvimento
	<StrictMode>
		{/* ThemeProvider fornece o tema para todos os componentes styled-components */}
		<ThemeProvider theme={standardTheme}>
			{/* AppProvider disponibiliza os contextos globais para toda a aplicação */}
			<AppProvider>
				{/* Elements configura o Stripe para processar pagamentos na aplicação */}
				<Elements stripe={stripePromise}>
					{/* BrowserRouter habilita a navegação baseada em URL no navegador  */}
					<BrowserRouter>
						{/* Router contém a definição de todas as rotas da aplicação */}
						<Router />
					</BrowserRouter>
				</Elements>
				{/* Aplica os estilos globais em toda a aplicação */}
				<GlobalStyles />
				{/* Configura o componente de notificações toast com fechamento automático em 2 segundos e tema colorido */}
				<ToastContainer autoClose={2000} theme="colored" />
			</AppProvider>
		</ThemeProvider>
	</StrictMode>,
);