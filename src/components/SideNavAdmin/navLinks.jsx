// Importa ícones específicos da biblioteca phosphor-icons
import { List, ListPlus, Receipt } from "@phosphor-icons/react";

// Define e exporta uma array com os links de navegação para a barra lateral administrativa
export const navLinks = [
    // Link para a página de pedidos
    {
        id: 1,                     // ID único para o link
        label: 'Pedidos',          // Texto/rótulo do link
        path: '/admin/pedidos',    // Caminho da rota
        icon: <Receipt />          // Ícone de recibo/nota fiscal
    },
    // Link para a página de produtos
    {
        id: 2,                     // ID único para o link
        label: 'Produtos',         // Texto/rótulo do link
        path: '/admin/produtos',   // Caminho da rota
        icon: <List />             // Ícone de lista
    },
    // Link para a página de adicionar novo produto
    {
        id: 3,                     // ID único para o link
        label: 'Adicionar Produto', // Texto/rótulo do link
        path: '/admin/novo-produto', // Caminho da rota
        icon: <ListPlus />         // Ícone de adicionar à lista
    },
]