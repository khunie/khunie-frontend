import styled from 'styled-components';

export const Container = styled.ul`
    margin-top: 8px;
    padding: 16px 0px;
    border-radius: 16px;
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    grid-template-rows: 110px; 
    column-gap: 8px;
    row-gap: 8px;

    @media (max-width: 1240px) {
        grid-template-columns: repeat(4, minmax(0, 1fr));
    }

    @media (max-width: 1080px) {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    @media (max-width: 900px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (max-width: 740px) {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    @media (max-width: 600px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (max-width: 380px) {
        grid-template-columns: 1fr;
    }
`;
