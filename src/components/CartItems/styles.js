import styled from 'styled-components';

export const ProductImage = styled.img`
    width: 80px;
    border-radius: 16px;
`;

export const ButtonGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;

    button {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 30px;
        width: 30px;
        color: #ffff;
        border-radius: 4px;
        background-color: #9758a6;
        border: none;

        &:hover {
            background-color: #6f357c;
        }
    }
`;

export const EmptyCart = styled.p`
    font-size: 20px;
    text-align: center;
    font-weight: bold;
`;

export const TotalPrice = styled.p`
    font-weight: bold;
`;

export const TrashImage = styled.img`
    width: 20px;
    height: 20px;
    cursor: pointer;
`;
