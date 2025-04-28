// Importação de ícones para o botão de expandir/recolher
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
// Importação de componentes do Material UI para criar a interface
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse'; // Componente para animação de expansão
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
// Biblioteca para validação de props
import PropTypes from 'prop-types';
// Hook de estado do React
import { useState } from 'react';
// Importação da instância de API configurada
import { api } from '../../../services/api';
// Função utilitária para formatar datas
import { formatDate } from '../../../utils/formatDate';
// Opções de status disponíveis para pedidos
import { orderStatusOptions } from './orderStatus';
// Componentes estilizados personalizados
import { ProductImage, SelectStatus } from './styles';

// Componente que representa uma linha expansível na tabela de pedidos
export function Row({ row, setOrders, orders }) {
	// Estado para controlar se a linha está expandida ou não
	const [open, setOpen] = useState(false);
	// Estado para controlar o loading durante a atualização do status
	const [loading, setLoading] = useState(false);

	// Função assíncrona para atualizar o status de um pedido
	async function newStatusOrder(id, status) {
		try {
			// Ativa o indicador de loading
			setLoading(true);
			// Faz uma requisição PUT para atualizar o status do pedido na API
			await api.put(`orders/${id}`, { status });

			// Atualiza o estado local de pedidos com o novo status
			const newOrders = orders.map((order) =>
				order._id === id ? { ...order, status } : order,
			);

			// Atualiza o estado de pedidos no componente pai
			setOrders(newOrders);
		} catch (error) {
			// Loga erros no console caso a requisição falhe
			console.error(error);
		} finally {
			// Desativa o indicador de loading, independentemente do resultado
			setLoading(false);
		}
	}

	return (
		<>
			{/* Linha principal com informações resumidas do pedido */}
			<TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
				{/* Célula com botão para expandir/recolher os detalhes do pedido */}
				<TableCell>
					<IconButton
						aria-label="expand row"
						size="small"
						onClick={() => setOpen(!open)} // Alterna o estado de expansão
					>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
				{/* Célula com o ID do pedido */}
				<TableCell component="th" scope="row">
					{row.orderId}
				</TableCell>
				{/* Célula com o nome do cliente */}
				<TableCell>{row.name}</TableCell>
				{/* Célula com a data do pedido formatada */}
				<TableCell>{formatDate(row.date)}</TableCell>
				{/* Célula com dropdown para mudar o status do pedido */}
				<TableCell>
					<SelectStatus
						options={orderStatusOptions.filter((status) => status.id !== 0)} // Remove a opção "Todos" do dropdown
						placeholder="Status"
						defaultValue={orderStatusOptions.find(
							(status) => status.value === row.status || null,
						)} // Define o valor inicial baseado no status atual
						onChange={(status) => newStatusOrder(row.orderId, status.value)} // Chama a função de atualização quando o status é alterado
						isLoading={loading} // Mostra indicador de loading durante a atualização
						menuPortalTarget={document.body} // Define onde o menu dropdown será renderizado (evita problemas de z-index)
					/>
				</TableCell>
			</TableRow>
			{/* Linha expansível com os detalhes do pedido (produtos) */}
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					{/* Componente de animação que mostra/esconde o conteúdo expandido */}
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box sx={{ margin: 1 }}>
							{/* Título da seção expandida */}
							<Typography variant="h6" gutterBottom component="div">
								Pedido
							</Typography>
							{/* Tabela aninhada com os detalhes dos produtos */}
							<Table size="small" aria-label="purchases">
								<TableHead>
									<TableRow>
										<TableCell>Quantidade</TableCell>
										<TableCell>Produto</TableCell>
										<TableCell>Categoria</TableCell>
										<TableCell>Imagem do Produto</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{/* Mapeia e renderiza cada produto do pedido */}
									{row.products.map((product) => (
										<TableRow key={product.id}>
											<TableCell component="th" scope="row">
												{product.id}
											</TableCell>
											<TableCell>{product.name}</TableCell>
											<TableCell>{product.category}</TableCell>
											<TableCell>
												{/* Exibe a imagem do produto */}
												<ProductImage src={product.url} alt={product.name} />
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</>
	);
}

// Definição das PropTypes para validar as props recebidas pelo componente
Row.propTypes = {
	orders: PropTypes.array.isRequired, // Array de todos os pedidos
	setOrders: PropTypes.func.isRequired, // Função para atualizar os pedidos
	row: PropTypes.shape({
		orderId: PropTypes.string.isRequired, // ID único do pedido
		name: PropTypes.string.isRequired, // Nome do cliente
		date: PropTypes.string.isRequired, // Data do pedido
		products: PropTypes.arrayOf( // Array de produtos no pedido
			PropTypes.shape({
				id: PropTypes.number.isRequired,
				category: PropTypes.string.isRequired,
				name: PropTypes.string.isRequired,
				price: PropTypes.number.isRequired,
				quantity: PropTypes.number.isRequired,
				url: PropTypes.string.isRequired,
			}),
		).isRequired,
		status: PropTypes.string.isRequired, // Status atual do pedido
	}).isRequired,
};