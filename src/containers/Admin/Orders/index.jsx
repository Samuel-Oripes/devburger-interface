// Importações de componentes do Material UI para criar a tabela de pedidos
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// Hooks do React para gerenciamento de estado e efeitos colaterais
import { useEffect, useState } from 'react';
// Importação da instância de API configurada
import { api } from '../../../services/api';
// Opções de status de pedido para filtrar
import { orderStatusOptions } from './orderStatus';
// Componente de linha da tabela que mostra os detalhes de cada pedido
import { Row } from './row';
// Componentes estilizados para o layout da página
import { Container, Filter, FilterOption } from './styles';

// Componente principal que exibe a lista de pedidos com funcionalidades de filtragem
export function Orders() {
	// Estado para armazenar todos os pedidos carregados da API
	const [orders, setOrders] = useState([]);
	// Estado para armazenar os pedidos filtrados que serão exibidos
	const [filteredOrders, setFilteredOrders] = useState([]);
	// Estado para controlar qual opção de filtro por status está ativa (0 = todos)
	const [activeStatus, setActiveStatus] = useState(0);

	// Estado para armazenar as linhas processadas para exibição na tabela
	const [rows, setRows] = useState([]);

	// Efeito que carrega os pedidos da API quando o componente é montado
	useEffect(() => {
		async function loadOrders() {
			// Requisição GET para buscar os pedidos
			const { data } = await api.get('orders');

			// Atualiza os estados com os dados recebidos
			setOrders(data);
			setFilteredOrders(data); // Inicialmente, todos os pedidos são exibidos
		}

		loadOrders();
	}, []);

	// Função auxiliar que transforma os dados brutos do pedido em um formato adequado para a tabela
	function createData(order) {
		return {
			name: order.user.name, // Nome do cliente
			orderId: order._id, // ID único do pedido
			date: order.createdAt, // Data de criação do pedido
			status: order.status, // Status atual do pedido
			products: order.products, // Produtos incluídos no pedido
		};
	}

	// Efeito que atualiza as linhas da tabela sempre que os pedidos filtrados mudam
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		// Transforma cada pedido filtrado em uma linha para a tabela
		const newRows = filteredOrders.map((order) => createData(order));

		setRows(newRows);
	}, [filteredOrders]);

	// Função que lida com a seleção de um novo status para filtrar
	function handleStatus(status) {
		if (status.id === 0) {
			// Se o status selecionado for "Todos", exibe todos os pedidos
			setFilteredOrders(orders);
		} else {
			// Caso contrário, filtra os pedidos pelo status selecionado
			const newOrders = orders.filter((order) => order.status === status.value);

			setFilteredOrders(newOrders);
		}

		// Atualiza o status ativo para controle visual do filtro
		setActiveStatus(status.id);
	}

	// Efeito que reaplica o filtro atual sempre que a lista completa de pedidos é alterada
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (activeStatus === 0) {
			// Se o filtro atual for "Todos", mostra todos os pedidos
			setFilteredOrders(orders);
		} else {
			// Encontra o índice do status ativo nas opções de status
			const statusIndex = orderStatusOptions.findIndex(
				(item) => item.id === activeStatus,
			);

			// Aplica o filtro com base no valor do status encontrado
			const newFilteredOrders = orders.filter(
				(order) => order.status === orderStatusOptions[statusIndex].value,
			);

			setFilteredOrders(newFilteredOrders);
		}
	}, [orders]);

	return (
		<Container>
			{/* Barra de filtro por status que permite selecionar diferentes status de pedido */}
			<Filter>
				{orderStatusOptions.map((status) => (
					<FilterOption
						key={status.id}
						onClick={() => handleStatus(status)}
						$isActiveStatus={activeStatus === status.id} // Prop que controla o estilo visual do filtro ativo
					>
						{status.label}
					</FilterOption>
				))}
			</Filter>
			{/* Container da tabela com os pedidos */}
			<TableContainer component={Paper}>
				<Table aria-label="collapsible table">
					{/* Cabeçalho da tabela com os títulos das colunas */}
					<TableHead>
						<TableRow>
							<TableCell /> {/* Célula vazia para o botão de expandir */}
							<TableCell>Pedido</TableCell>
							<TableCell>Cliente</TableCell>
							<TableCell>Data do pedido</TableCell>
							<TableCell>Status</TableCell>
						</TableRow>
					</TableHead>
					{/* Corpo da tabela que contém as linhas de pedidos */}
					<TableBody>
						{rows.map((row) => (
							<Row
								key={row.orderId}
								row={row} // Dados processados do pedido
								orders={orders} // Lista completa de pedidos
								setOrders={setOrders} // Função para atualizar pedidos (possivelmente para edição)
							/>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Container>
	);
}