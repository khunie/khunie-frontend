import styled from 'styled-components';
import { Dropdown } from 'components/common';

export const Container = styled(Dropdown)`
    && {
        width: 300px;
        height: 600px;
        left: calc(100% - 40px);
        right: auto;
        background-color: white;
        border-radius: 4px;
    }
`;
