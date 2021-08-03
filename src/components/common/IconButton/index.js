import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StyledButton } from './styles';

export default function IconButton(props) {
    const { forwardRef, icon, disabled, loading, className, ...rest } = props;

    return (
        <StyledButton
            type="button"
            ref={forwardRef}
            className={className}
            disabled={disabled || loading}
            {...rest}
        >
            {loading ? 'Loading' : icon && <Icon icon={icon} />}
        </StyledButton>
    );
}

export const Icon = styled(FontAwesomeIcon)`
    font-size: 20px;
`;
