import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Background from '../../assets/background.png';
import BannerHamburger from '../../assets/banner-menu.png';

export const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    background-color: ${(props) => props.theme.secondWhite};

    background: linear-gradient(
        rgba(255,255,255,0.6),
        rgba(255,255,255,0.6)
    ), 
    url('${Background}');
`;

export const Banner = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 480px;
    width: 100%;
    position: relative;

    background: url('${BannerHamburger}') no-repeat;
    background-position: center;
    background-color: ${(props) => props.theme.mainBlack};
    background-size: cover;

    h1 {
        font-family: 'Road Rage', sans-serif;
        font-size: 80px;
        line-height: 65px;
        color: ${(props) => props.theme.white}F;
        position: absolute;
        right: 20%;
        top: 30%;

        span {
            display: block;
            font-size: 20px;
        }
    }
`;

export const CategoryMenu = styled.div`
    display: flex;
    justify-content: center;
    gap: 50px;
    margin-top: 30px;
`;

export const CategoryButton = styled(Link)`
    text-decoration: none;
    cursor: pointer;
    background: ${(props) => props.$isActiveCategory && '#9758a6'};
    color: ${(props) => (props.$isActiveCategory ? '#FFFF' : '#696969')};
    font-size: 24px;
    font-weight: 500;
    padding: 10px;
    line-height: 20px;
    border: none;
    border-radius: 5px;
`;

export const ProductsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 60px;
    padding: 40px;
    justify-content: center;
    max-width: 1280px;
    margin: 50px auto 0;
`;
