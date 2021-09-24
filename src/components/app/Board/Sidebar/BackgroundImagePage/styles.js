import styled from 'styled-components';
import { TextInput } from 'components/common';

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

export const ImageOption = styled.img`
    width: 100%;
`;
