import { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { CategoryButton, Container, ContainerItems, Title } from './styles';

export function CategoriesCarousel() {
	const [categories, setCategories] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		async function loadCategories() {
			const { data } = await api.get('/categories');

			setCategories(data);
			console.log(data);
		}

		loadCategories();
	}, []);

	const responsive = {
		superLargeDesktop: {
			breakpoint: { max: 4000, min: 3000 },
			items: 4,
		},
		desktop: {
			breakpoint: { max: 3000, min: 1280 },
			items: 4,
		},
		superLargeTablet: {
			breakpoint: { max: 1280, min: 900 },
			items: 3,
		},
		tablet: {
			breakpoint: { max: 900, min: 600 },
			items: 2,
		},
		mobile: {
			breakpoint: { max: 600, min: 0 },
			items: 1,
		},
	};

	return (
		<Container>
			<Title>CATEGORIAS</Title>
			<Carousel
				responsive={responsive}
				infinite={true}
				partialVisbile={false}
				itemClass="carousel-item"
			>
				{categories.map((category) => (
					<ContainerItems key={category.id} imageUrl={category.url}>
						<CategoryButton
							to={{
								pathname: '/cardapio',
								search: `?categoria=${category.id}`,
							}}
						>
							{category.name}
						</CategoryButton>
					</ContainerItems>
				))}
			</Carousel>
		</Container>
	);
}
