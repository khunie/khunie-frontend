import styled from 'styled-components';
import ScrollContainer from 'react-indiana-drag-scroll';

export const Container = styled.div`
    background-image: url('https://resi.ze-robot.com/dl/am/among-trees-1920%C3%971080.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-color: white;
    position: absolute;
    top: 0;
    left: 0;
    padding-top: 48px;
    display: flex;
    width: 100vw;
`;

export const MainSection = styled.div`
    flex: 1;
    overflow-x: hidden;
`;

export const BoardContent = styled(ScrollContainer)`
    position: relative;
    display: flex;
    overflow-x: scroll;
    height: calc(100vh - 100px);
    padding: 8px;
    padding-right: 0px;
    padding-top: 0;
    box-sizing: border-box;
    scrollbar-width: thin;

    ::-webkit-scrollbar {
        height: 12px;
        width: 12px;
        background: #aaaaaa33;
    }

    ::-webkit-scrollbar-thumb {
        background: #00000055;
        padding: 8px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #00000077;
    }

    ::-webkit-scrollbar-thumb:active {
        background: #00000088;
    }

    ::-webkit-scrollbar-corner {
        background: #000;
    }
`;

export const ListsContainer = styled.div`
    overflow-x: visible;
    display: flex;
`;
