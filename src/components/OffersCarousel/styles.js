import styled from 'styled-components';

export const Container = styled.div`

    .carousel-item {
        padding: 0 20px 70px;
    }

    overflow-x: hidden;

    .react-multi-carousel-list{
        overflow: visible;
    }
`;

export const Title = styled.h2`
    font-size: 32px;
    color: #61a160;
    font-weight: 800;
    padding: 20px 0 12px;
    position: relative;
    text-align: center;
    margin: 70px 0;

    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 56px;
        height: 4px;
        background-color: #61a160;
    }
`;
