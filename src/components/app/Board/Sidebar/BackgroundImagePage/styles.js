import styled from 'styled-components';
import { TextInput } from 'components/common';
import { shadowOutline } from 'shared/styles';

export const Container = styled.div`
    position: relative;
    flex: 1;
    width: 100%;
    padding: 8px;
`;

export const SearchInput = styled(TextInput)`
    margin-bottom: 8px;
    width: 100%;
`;

export const Content = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 100px; 
    column-gap: 8px;
    row-gap: 8px;
`;

export const Image = styled.img`
    width: 100%;
    height: 100px;
    display: block;
`;

export const ImageButton = styled.button`
    border: none;
    padding: 0;
    border-radius: 4px;
    overflow: hidden;
    outline: none;

    &:hover { 
        ${Image} {
            filter: saturate(.95) brightness(1.1);
        }
    }

    &:active { 
        ${Image} {
            filter: saturate(.92) brightness(1.15);
        }
    }
    
    &:focus {
        ${shadowOutline({ width: 4 })}
    }    
`;
