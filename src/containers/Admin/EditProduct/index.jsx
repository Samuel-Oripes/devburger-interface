import { yupResolver } from '@hookform/resolvers/yup'; // Importa o resolver do Yup para integração com react-hook-form
import { Image } from '@phosphor-icons/react'; // Importa o ícone de imagem da biblioteca phosphor
import { useEffect, useState } from 'react'; // Importa hooks do React para gerenciar estado e efeitos
import { Controller, useForm } from 'react-hook-form'; // Importa hooks para gerenciar formulários
import { useLocation, useNavigate } from 'react-router-dom'; // Importa hooks para navegação e acesso aos parâmetros da URL
import { toast } from 'react-toastify'; // Importa biblioteca para exibição de notificações
import * as yup from 'yup'; // Importa biblioteca de validação de esquemas
import { api } from '../../../services/api'; // Importa a instância configurada da API
import {
	Container,
	ContainerCheckbox,
	ErrorMessage,
	Form,
	Input,
	InputGroup,
	Label,
	LabelUpload,
	Select,
	SubmitButton,
} from './styles'; // Importa componentes estilizados

/**
 * Schema de validação Yup para o formulário de edição de produto
 * Define regras e mensagens de erro para cada campo
 */
const schema = yup.object({
	// Validação para o nome do produto - obrigatório
	name: yup.string().required('Digite o nome do produto'),
	
	// Validação para o preço - número positivo e obrigatório
	price: yup
		.number()
		.positive()
		.required('Digite o preço do produto')
		.typeError('Digite o preço do produto'),
	
	// Validação para a categoria - objeto obrigatório
	category: yup.object().required('Escolha a categoria'),
	
	// Campo de oferta - boolean, opcional
	offer: yup.bool(),
	
	// Validação complexa para o arquivo de imagem
	file: yup
		.mixed()
		.nullable() // Torna o campo explicitamente opcional
		.test('fileValidation', '', function (value) {
			// Se não tem arquivo, não precisa validar
			if (!value || value.length === 0) {
				return true;
			}

			// Validar tamanho (5MB em bytes)
			const fiveMB = 5 * 1024 * 1024;
			const isValidSize = value[0].size <= fiveMB;
			if (!isValidSize) {
				return this.createError({
					path: 'file',
					message: 'Carregue arquivo de até 5MB',
				});
			}

			// Validar tipo do arquivo (apenas PNG ou JPEG)
			const isValidType =
				value[0].type === 'image/jpeg' || value[0].type === 'image/png';

			if (!isValidType) {
				return this.createError({
					path: 'file',
					message: 'Carregue apenas imagens PNG ou JPEG',
				});
			}

			return true;
		}),
});

/**
 * Componente EditProduct
 * Responsável por exibir e processar o formulário de edição de produtos
 */
export function EditProduct() {
	// Estado para armazenar o nome do arquivo selecionado
	const [fileName, setFileName] = useState(null);
	// Estado para armazenar as categorias carregadas da API
	const [categories, setCategories] = useState([]);

	// Hook para navegação programática
	const navigate = useNavigate();

	// Obtém o produto a ser editado do estado da navegação
	const {
		state: { product },
	} = useLocation();

	/**
	 * Efeito para carregar as categorias da API quando o componente é montado
	 */
	useEffect(() => {
		async function loadCategories() {
			const { data } = await api.get('/categories');

			setCategories(data);
		}

		loadCategories();
	}, []); // Array vazio: executa apenas uma vez na montagem

	// Configuração do react-hook-form com validação Yup
	const {
		register, // Função para registrar campos no formulário
		handleSubmit, // Função para processar o envio do formulário
		control, // Controle para componentes não-nativos (como o Select)
		formState: { errors }, // Estado do formulário, incluindo erros
	} = useForm({
		resolver: yupResolver(schema), // Integração com o Yup para validação
	});
	
	/**
	 * Função chamada quando o formulário é enviado e validado
	 */
	const onSubmit = async (data) => {
		// Cria um FormData para enviar dados multipart (necessário para upload de arquivos)
		const productFormData = new FormData();

		// Adiciona os dados do formulário ao FormData
		productFormData.append('name', data.name);
		productFormData.append('price', data.price * 100); // Converte para centavos
		productFormData.append('category_id', data.category.id);
		// Apenas adiciona o arquivo se ele existir
		if (data.file && data.file.length > 0) {
			productFormData.append('file', data.file[0]);
		}
		productFormData.append('offer', data.offer);

		// Envia os dados para a API com feedback visual usando toast
		await toast.promise(api.put(`/products/${product.id}`, productFormData), {
			pending: 'Editando o produto',
			success: 'Produto editado com sucesso',
			error: 'Falha ao editar o produto, tente novamente',
		});

		// Redireciona para a lista de produtos após um pequeno delay
		setTimeout(() => {
			navigate('/admin/produtos');
		}, 1000);
	};

	return (
		<Container>
			<Form onSubmit={handleSubmit(onSubmit)}>
				{/* Campo de nome do produto */}
				<InputGroup>
					<Label>Nome</Label>
					<Input
						type="text"
						{...register('name')} // Registra o campo no react-hook-form
						defaultValue={product.name} // Preenche com o valor atual do produto
					/>
					<ErrorMessage>{errors?.name?.message}</ErrorMessage>
				</InputGroup>

				{/* Campo de preço do produto */}
				<InputGroup>
					<Label>Preço</Label>
					<Input
						type="number"
						{...register('price')}
						defaultValue={product.price / 100} // Converte de centavos para reais
					/>
					<ErrorMessage>{errors?.price?.message}</ErrorMessage>
				</InputGroup>

				{/* Campo de upload de imagem */}
				<InputGroup>
					<Label>Imagem</Label>
					<LabelUpload>
						<Image /> {/* Ícone de imagem */}
						<input
							type="file"
							{...register('file')}
							accept="image/png, image/jpeg" // Limita os tipos de arquivo aceitos
							onChange={(value) => {
								// Atualiza o nome do arquivo exibido
								setFileName(value?.target?.files[0]?.name);
								// Mantém a funcionalidade padrão do register
								register('file').onChange(value);
							}}
						/>
						{fileName || 'Upload do Produto'} {/* Exibe o nome do arquivo ou texto padrão */}
					</LabelUpload>
					<ErrorMessage>{errors?.file?.message}</ErrorMessage>
				</InputGroup>
				
				{/* Campo de seleção de categoria */}
				<InputGroup>
					<Label>Categoria</Label>
					<Controller
						name="category"
						control={control}
						defaultValue={product.category}
						render={({ field }) => (
							<Select
								{...field}
								options={categories} // Lista de categorias carregadas da API
								getOptionLabel={(category) => category.name} // Como exibir o nome da categoria
								getOptionValue={(category) => category.id} // Como identificar o valor da categoria
								placeholder="Categorias"
								menuPortalTarget={document.body} // Melhora o posicionamento do dropdown
								defaultValue={product.category} // Seleciona a categoria atual do produto
							/>
						)}
					/>
					<ErrorMessage>{errors?.category?.message}</ErrorMessage>
				</InputGroup>
				
				{/* Checkbox para marcar o produto como oferta */}
				<InputGroup>
					<ContainerCheckbox>
						<input
							type="checkbox"
							defaultChecked={product.offer} // Marca o checkbox se o produto já estiver em oferta
							{...register('offer')}
						/>
						<Label>Produto em Oferta?</Label>
					</ContainerCheckbox>
				</InputGroup>

				{/* Botão de submissão do formulário */}
				<SubmitButton>Editar Produto</SubmitButton>
			</Form>
		</Container>
	);
}