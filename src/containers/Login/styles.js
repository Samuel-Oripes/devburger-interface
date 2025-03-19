import { Link as ReactLink } from 'react-router-dom';
import styled from 'styled-components';
import BackgroundLogin from '../../assets/background-login.png';
import Background from '../../assets/background.png';

export const Container = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
`;

export const LeftContainer = styled.div`
    background: url('${BackgroundLogin}');
    background-size: cover;
    background-position: center;

    height: 100%;
    width: 100%;
    max-width: 50%;

    display: flex;
    align-items: center;
    justify-content: center;

    img {
        width: 80%;
    }
`;

export const RightContainer = styled.div`
    background: url('${Background}');
    background-color: #1e1e1e;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    height: 100%;
    width: 100%;
    max-width: 50%;

    p {
        color: ${(props) => props.theme.white}F;
        font-size: 18px;
        font-weight: 800;

        a {
            text-decoration: underline;
            color: ${(props) => props.theme.white}F;
        }
    }
`;

export const Title = styled.h2`
    font-family: "Road Rage", sans-serif;
    font-size: 40px;
    color: ${(props) => props.theme.white}F;
    line-height: 40px;
    text-align: center;

    span {
        color: ${(props) => props.theme.purple};
        font-family: "Road Rage", sans-serif;
    }
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    width: 100%;
    max-width: 400px;
`;

export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;

    input {
        width: 100%;
        border: none;
        height: 52px;
        border-radius: 5px;
        padding: 0 16px;
        font-size: 18px;
    }

    label {
        font-size: 18px;
        font-weight: 600;
        color: ${(props) => props.theme.white}F;
    }

    p {
        font-size: 14px;
        line-height: 80%;
        color: ${(props) => props.theme.darkRed};
        font-weight: 600;
        height: 10px;
    }
`;

export const Link = styled(ReactLink)`
    text-decoration: none;
    color: ${(props) => props.theme.white}F;
`;
