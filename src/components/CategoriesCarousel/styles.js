import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`

    .carousel-item {
        padding: 0 20px;
    }
`;

export const Title = styled.h2`
    font-size: 32px;
    color: #9758A6;
    font-weight: 800;
    padding: 20px 0 12px;
    position: relative;
    text-align: center;
    margin: 0 0 40px;

    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 56px;
        height: 4px;
        background-color: #9758A6;
    }
`;

export const ContainerItems = styled.div`

    background: url('${(props) => props.imageUrl}');
    background-position: center;
    background-size: cover;
    border-radius: 20px;

    display: flex;
    align-items: center;
    padding: 20px 10px;
    width: 100%;
    height: 250px;
    cursor: grab;
`;

export const CategoryButton = styled(Link)`
    color: #FFFF;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px 30px;
    border-radius: 30px;
    font-size: 22.5px;
    margin-top: 50px;
    font-weight: 500;
    text-decoration: none;

    &:hover {
        background-color: #9758A6;
    }
`;
