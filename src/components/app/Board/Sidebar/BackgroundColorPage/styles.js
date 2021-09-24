import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
    position: relative;
    flex: 1;
    width: 100%;
    padding: 8px;
`;
const fadeIn = keyframes`
    from {
      visibility: visible;
      opacity: 0;
      transform: translateY(20px);
    }
  
    to {
      visibility: visible;
      opacity: 1;
      transform: translateY(0);
    }
`;

export const ColorOption = styled.button`
    position: relative;
    width: 100%;
    height: 100px;
    background-color: ${({ color }) => (color || '#2f279c')};
    border: none;
    color: white;
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 8px;
    /* 
    animation: ${fadeIn} .1s ease-in-out forwards;
    animation-delay: ${({ delay }) => (delay ? `${delay}s` : '0s')};
    opacity: 0;
    visibility: hidden; 
    */

    &:last-child {
        margin-bottom: 0;
    }

    &:hover:enabled { 
        box-shadow: 0px 0px 0px 2px #4c27a3 inset, 0px 0px 0px 4px white inset;
    }
`;
