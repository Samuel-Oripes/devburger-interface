// Importação de bibliotecas e componentes necessários
import { yupResolver } from '@hookform/resolvers/yup'; // Integra o Yup com o React Hook Form para validação
import { useForm } from 'react-hook-form'; // Hook para gerenciamento de formulários
import { useNavigate } from 'react-router-dom'; // Hook para navegação entre rotas
import { toast } from 'react-toastify'; // Biblioteca para exibir notificações toast
import * as yup from 'yup'; // Biblioteca para validação de esquemas
import { api } from '../../services/api'; // Serviço de API personalizado (provavelmente axios configurado)

// Importação de assets
import Logo from '../../assets/logo-login.png'; // Imagem do logo para a página de registro

// Importação de componentes estilizados
import {
	Container,
	Form,
	InputContainer,
	LeftContainer,
	Link,
	RightContainer,
	Title,
} from './styles'; // Componentes estilizados para esta página

// Importação de componentes personalizados
import { Button } from '../../components/Button'; // Componente de botão reutilizável

// Componente funcional principal de registro
export function Register() {
	// Hook para navegação programática
	const navigate = useNavigate();

	// Definição do esquema de validação usando Yup
	const schema = yup
		.object({
			name: yup.string().required('O nome é obrigatório'), // Validação do campo nome
			email: yup
				.string()
				.email('Digite um e-mail válido') // Verifica se é um e-mail válido
				.required('O e-mail é obrigatório'), // Campo obrigatório
			password: yup
				.string()
				.min(6, 'A senha deve ter pelo menos 6 caracteres') // Senha mínima de 6 caracteres
				.required('Digite uma senha'), // Campo obrigatório
			confirmPassword: yup
				.string()
				.oneOf([yup.ref('password')], 'As senhas devem ser iguais') // Verifica se é igual ao campo password
				.required('Confirme sua senha'), // Campo obrigatório
		})
		.required();

	// Configuração do React Hook Form com validação Yup
	const {
		register, // Função para registrar campos do formulário
		handleSubmit, // Função para lidar com o envio do formulário
		formState: { errors }, // Estado que contém os erros de validação
	} = useForm({
		resolver: yupResolver(schema), // Integração com o esquema Yup
	});

	// Função assíncrona que lida com o envio do formulário
	const onSubmit = async (data) => {
		try {
			// Requisição POST para criar um novo usuário
			const { status } = await api.post(
				'/users',
				{
					name: data.name,
					email: data.email,
					password: data.password,
				},
				{
					validateStatus: () => true, // Aceita qualquer status HTTP como válido para tratamento manual
				},
			);

			// Tratamento baseado no status da resposta
			if (status === 200 || status === 201) {
				// Se sucesso (criado)
				setTimeout(() => {
					navigate('/login'); // Redireciona para página de login após 1 segundo
				}, 1000);
				toast.success('Conta criada com sucesso!'); // Exibe notificação de sucesso
			} else if (status === 409) {
				// Se houver conflito (email já existe)
				toast.error('Email já cadastrado!'); // Exibe notificação de erro
			} else {
				// Para outros erros HTTP
				throw new Error(); // Lança erro para ser capturado pelo catch
			}
		} catch (error) {
			// Tratamento genérico de erros
			toast.error('Algo deu errado! Tente novamente mais tarde.');
		}
	};

	// Renderização do componente
	return (
		<Container>
			{/* Lado esquerdo com logo */}
			<LeftContainer>
				<img src={Logo} alt="logo-devburger" />
			</LeftContainer>
			
			{/* Lado direito com formulário */}
			<RightContainer>
				<Title>Criar Conta</Title>
				
				{/* Formulário de registro com validação */}
				<Form onSubmit={handleSubmit(onSubmit)}>
					{/* Campo de nome */}
					<InputContainer>
						<label for="input-nome">Nome</label>
						<input type="text" id="input-nome" {...register('name')} />
						<p>{errors.name?.message}</p> {/* Exibe mensagem de erro se houver */}
					</InputContainer>
					
					{/* Campo de email */}
					<InputContainer>
						<label for="input-email">Email</label>
						<input type="email" id="input-email" {...register('email')} />
						<p>{errors.email?.message}</p> {/* Exibe mensagem de erro se houver */}
					</InputContainer>
					
					{/* Campo de senha */}
					<InputContainer>
						<label for="input-password">Senha</label>
						<input
							type="password"
							id="input-password"
							{...register('password')}
						/>
						<p>{errors.password?.message}</p> {/* Exibe mensagem de erro se houver */}
					</InputContainer>
					
					{/* Campo de confirmação de senha */}
					<InputContainer>
						<label for="input-confirm">Confirmar Senha</label>
						<input
							type="password"
							id="input-confirm"
							{...register('confirmPassword')}
						/>
						<p>{errors.confirmPassword?.message}</p> {/* Exibe mensagem de erro se houver */}
					</InputContainer>
					
					{/* Botão de envio do formulário */}
					<Button type="submit">Criar Conta</Button>
				</Form>
				
				{/* Link para página de login */}
				<p>
					Já possui conta? <Link to="/login">Clique aqui.</Link>
				</p>
			</RightContainer>
		</Container>
	);
}