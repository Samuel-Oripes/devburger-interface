import { CategoriesCarousel, OffersCarousel } from '../../components';
import { Banner, Container } from './styles';

// Componente funcional principal da página Home
export function Home() {
	return (
		<main>
			<Banner>
				<h1>Bem Vindo(a)!</h1>
			</Banner>
			<Container>
				<div>
					<CategoriesCarousel />
					<OffersCarousel />
				</div>
			</Container>
		</main>
	);
}
