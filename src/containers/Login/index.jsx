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
				<Form>
					<InputContainer>
						<label for="input-email">Email</label>
						<input type="email" id="input-email" />
					</InputContainer>

					<InputContainer>
						<label for="input-password">Senha</label>
						<input type="password" id="input-password" />
					</InputContainer>
					<Button>Entrar</Button>
				</Form>
				<p>
					Não possui conta? <a href="/">Clique aqui.</a>
				</p>
			</RightContainer>
		</Container>
	);
}
