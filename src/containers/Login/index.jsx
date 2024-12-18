import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { api } from '../../services/api';

import Logo from '../../assets/logo-login.png';
import {
	Container,
	Form,
	InputContainer,
	LeftContainer,
	RightContainer,
	Title,
} from './styles';

import { Button } from '../../components/Button';

export function Login() {
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
		const response = await api.post('/session', {
			email: data.email,
			password: data.password,
		});

		console.log(response);
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
					Não possui conta? <a href="/">Clique aqui.</a>
				</p>
			</RightContainer>
		</Container>
	);
}
