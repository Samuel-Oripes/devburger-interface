// Importação da biblioteca axios para fazer requisições HTTP
import axios from 'axios';

// Criação de uma instância personalizada do axios com uma URL base configurada
// Esta instância será usada para todas as chamadas de API na aplicação
export const api = axios.create({
	baseURL: 'http://localhost:3001', // URL base da API que será prefixada em todas as requisições
});

// Configuração de um interceptor de requisição
// Interceptores permitem executar código antes que as requisições sejam enviadas
api.interceptors.request.use((config) => {
	// Busca os dados do usuário armazenados no localStorage
	const userData = localStorage.getItem('devburger:userData');

	// Extrai o token JWT do objeto userData, se ele existir
	const token = userData && JSON.parse(userData).token;

	// Adiciona o token de autenticação ao cabeçalho Authorization de todas as requisições
	// Formato: "Bearer [token]", padrão para autenticação JWT
	config.headers.authorization = `Bearer ${token}`;

	// Retorna o objeto config modificado para continuar o processo de requisição
	return config;
});