import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
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

export function Register() {
	const navigate = useNavigate();

	const schema = yup
		.object({
			name: yup.string().required('O nome é obrigatório'),
			email: yup
				.string()
				.email('Digite um e-mail válido')
				.required('O e-mail é obrigatório'),
			password: yup
				.string()
				.min(6, 'A senha deve ter pelo menos 6 caracteres')
				.required('Digite uma senha'),
			confirmPassword: yup
				.string()
				.oneOf([yup.ref('password')], 'As senhas devem ser iguais')
				.required('Confirme sua senha'),
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
			const { status } = await api.post(
				'/users',
				{
					name: data.name,
					email: data.email,
					password: data.password,
				},
				{
					validateStatus: () => true,
				},
			);

			if (status === 200 || status === 201) {
				setTimeout(() => {
					navigate('/login');
				}, 1000);
				toast.success('Conta criada com sucesso!');
			} else if (status === 409) {
				toast.error('Email já cadastrado!');
			} else {
				throw new Error();
			}
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
				<Title>Criar Conta</Title>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<InputContainer>
						<label for="input-nome">Nome</label>
						<input type="text" id="input-nome" {...register('name')} />
						<p>{errors.name?.message}</p>
					</InputContainer>
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
					<InputContainer>
						<label for="input-confirm">Confirmar Senha</label>
						<input
							type="password"
							id="input-confirm"
							{...register('confirmPassword')}
						/>
						<p>{errors.confirmPassword?.message}</p>
					</InputContainer>
					<Button type="submit">Criar Conta</Button>
				</Form>
				<p>
					Já possui conta? <Link to="/login">Clique aqui.</Link>
				</p>
			</RightContainer>
		</Container>
	);
}
