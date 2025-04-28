// Importa o resolvedor do Yup para integração com o React Hook Form
import { yupResolver } from '@hookform/resolvers/yup';
// Importa o hook useForm para gerenciar formulários
import { useForm } from 'react-hook-form';
// Importa o hook useNavigate para navegação entre rotas
import { useNavigate } from 'react-router-dom';
// Importa o toast para exibir notificações ao usuário
import { toast } from 'react-toastify';
// Importa a biblioteca Yup para validação de formulários
import * as yup from 'yup';
// Importa o hook personalizado useUser que gerencia dados do usuário via contexto
import { useUser } from '../../hooks/UserContext';
// Importa a instância configurada do axios para requisições à API
import { api } from '../../services/api';

// Importa a imagem do logo para a tela de login
import Logo from '../../assets/logo-login.png';
// Importa os componentes estilizados específicos para a página de login
import {
	Container,
	Form,
	InputContainer,
	LeftContainer,
	Link,
	RightContainer,
	Title,
} from './styles';

// Importa o componente de botão reutilizável
import { Button } from '../../components/Button';

// Define o componente funcional Login
export function Login() {
	// Inicializa o hook de navegação
	const navigate = useNavigate();
	// Extrai a função putUserData do contexto de usuário
	const { putUserData } = useUser();

	// Define o esquema de validação usando Yup
	const schema = yup
		.object({
			// Valida o campo de email - deve ter formato válido e é obrigatório
			email: yup
				.string()
				.email('Digite um e-mail válido')
				.required('O e-mail é obrigatório'),
			// Valida o campo de senha - mínimo de 6 caracteres e é obrigatório
			password: yup
				.string()
				.min(6, 'A senha deve ter pelo menos 6 caracteres')
				.required('Digite uma senha'),
		})
		.required();

	// Inicializa o hook useForm com o resolvedor do Yup
	const {
		register, // Função para registrar campos do formulário
		handleSubmit, // Função para gerenciar o envio do formulário
		formState: { errors }, // Objeto contendo erros de validação
	} = useForm({
		resolver: yupResolver(schema),
	});

	// Função assíncrona executada quando o formulário é enviado
	const onSubmit = async (data) => {
		try {
			// Faz uma requisição POST à API para autenticar o usuário
			const { status, data: userData } = await api.post(
				'/session',
				{
					email: data.email,
					password: data.password,
				},
				{
					// Aceita qualquer status HTTP para tratamento personalizado
					validateStatus: () => true,
				},
			);

			// Verifica o status da resposta da API
			if (status === 200 || status === 201) {
				// Adiciona um atraso antes da navegação
				setTimeout(() => {
					// Redireciona para rotas diferentes baseado no tipo de usuário (admin ou não)
					if(userData?.admin) {
						navigate('/admin/pedidos');
					} else {
						navigate('/');
					}
				}, 1000);
				// Exibe mensagem de sucesso
				toast.success('Seja Bem-Vindo(a)!');
			} else if (status === 401) {
				// Exibe mensagem de erro para credenciais inválidas
				toast.error('Email ou senha incorretos');
			} else {
				// Lança um erro para qualquer outro status
				throw new Error();
			}

			// Armazena os dados do usuário no contexto
			putUserData(userData);
		} catch (error) {
			// Exibe mensagem genérica para outros erros
			toast.error('Algo deu errado! Tente novamente mais tarde.');
		}
	};

	// Renderiza a interface do componente
	return (
		<Container>
			{/* Lado esquerdo com o logo */}
			<LeftContainer>
				<img src={Logo} alt="logo-devburger" />
			</LeftContainer>
			
			{/* Lado direito com o formulário de login */}
			<RightContainer>
				{/* Título da página com destaques em span */}
				<Title>
					Olá, seja bem vindo ao <span>Dev Burguer!</span>
					<br />
					Acesse com seu <span>Login e senha.</span>
				</Title>
				
				{/* Formulário que utiliza a função handleSubmit do React Hook Form */}
				<Form onSubmit={handleSubmit(onSubmit)}>
					{/* Container para o campo de email */}
					<InputContainer>
						<label htmlFor="input-email">Email</label>
						<input type="email" id="input-email" {...register('email')} />
						{/* Exibe mensagem de erro de validação, se houver */}
						<p>{errors.email?.message}</p>
					</InputContainer>

					{/* Container para o campo de senha */}
					<InputContainer>
						<label htmlFor="input-password">Senha</label>
						<input
							type="password"
							id="input-password"
							{...register('password')}
						/>
						{/* Exibe mensagem de erro de validação, se houver */}
						<p>{errors.password?.message}</p>
					</InputContainer>
					
					{/* Botão para enviar o formulário */}
					<Button type="submit">Entrar</Button>
				</Form>
				
				{/* Link para a página de cadastro */}
				<p>
					Não possui conta? <Link to="/cadastro">Clique aqui.</Link>
				</p>
			</RightContainer>
		</Container>
	);
}