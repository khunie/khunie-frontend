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
    width: 100vw;
    overflow-x: hidden;
`;

export const BoardContent = styled(ScrollContainer)`
    position: relative;
    display: flex;
    overflow-x: scroll;
    height: calc(100vh - 96px);
    padding: 8px;
    padding-right: 0px;
    padding-top: 0;
    box-sizing: border-box;

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
