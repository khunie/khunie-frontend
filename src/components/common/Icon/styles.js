import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const StyledIcon = styled(FontAwesomeIcon)`
    font-size: ${({ $size }) => ($size ? `${$size}px` : '20px')};
    color: ${({ color }) => color && `${color}`};

    ${({ $minWidth }) =>
        $minWidth &&
        css`
            min-width: ${$minWidth}px;
        `}
`;

export default StyledIcon;
