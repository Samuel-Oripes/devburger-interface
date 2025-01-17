import styled from 'styled-components';
import Background from '../../assets/background.png';
import Texture from '../../assets/texture.png';

export const Container = styled.div`
    width: 100%;
    background: linear-gradient(
        rgba(255,255,255,0.6),
        rgba(255,255,255,0.6)
    ), 
    url('${Background}');
    min-height: 100vh;
`;

export const Banner = styled.div`
    background-size: cover;
    background-color: #1f1f1f;
    background-position: center;
    background: url('${Texture}');
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    height: 180px;

    img {
        height: 150px;
    }
`;

export const Tittle = styled.div`
    font-size: 32px;
    font-weight: 800;
    padding: 12px 0;
    color: #61a120;
    text-align: center;
    position: relative;

    &::after {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        content: '';
        width: 56px;
        height: 4px;
        background-color: #61a120;

    }
`;

export const Content = styled.div`
    display: grid;
    grid-template-columns: 1fr 20%;
    gap: 40px;
    width: 100%;
    max-width: 1280px;
    padding: 40px;
    margin: 0 auto;
`;
