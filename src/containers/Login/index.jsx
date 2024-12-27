import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useUser } from '../../hooks/UserContext';
import { api } from '../../services/api';

import Logo from '../../assets/logo-login.png';
import {
	Container,
	Form,
	InputContainer,
	LeftContainer,
	Link,
	RightContainer,
	Title,
} from './styles';

import { Button } from '../../components/Button';

export function Login() {
	const navigate = useNavigate();
	const { putUserData } = useUser();

	const schema = yup
		.object({
			email: yup
				.string()
				.email('Digite um e-mail válido')
				.required('O e-mail é obrigatório'),
			password: yup
				.string()
				.min(6, 'A senha deve ter pelo menos 6 caracteres')
				.required('Digite uma senha'),
		})
		.required();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});
	const onSubmit = async (data) => {
		try {
			const { status, data: userData } = await api.post(
				'/session',
				{
					email: data.email,
					password: data.password,
				},
				{
					validateStatus: () => true,
				},
			);

			if (status === 200 || status === 201) {
				setTimeout(() => {
					navigate('/');
				}, 1000);
				toast.success('Seja Bem-Vindo(a)!');
			} else if (status === 401) {
				toast.error('Email ou senha incorretos');
			} else {
				throw new Error();
			}

			putUserData(userData);
		} catch (error) {
			toast.error('Algo deu errado! Tente novamente mais tarde.');
		}
	};

	return (
		<Container>
			<LeftContainer>
				<img src={Logo} alt="logo-devburger" />
			</LeftContainer>
			<RightContainer>
				<Title>
					Olá, seja bem vindo ao <span>Dev Burguer!</span>
					<br />
					Acesse com seu <span>Login e senha.</span>
				</Title>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<InputContainer>
						<label for="input-email">Email</label>
						<input type="email" id="input-email" {...register('email')} />
						<p>{errors.email?.message}</p>
					</InputContainer>

					<InputContainer>
						<label for="input-password">Senha</label>
						<input
							type="password"
							id="input-password"
							{...register('password')}
						/>
						<p>{errors.password?.message}</p>
					</InputContainer>
					<Button type="submit">Entrar</Button>
				</Form>
				<p>
					Não possui conta? <Link to="/cadastro">Clique aqui.</Link>
				</p>
			</RightContainer>
		</Container>
	);
}
