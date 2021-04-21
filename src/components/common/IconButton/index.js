import { StyledButton, Icon } from './styles';

export default function IconButton(props) {
    const { forwardRef, icon, disabled, loading, ...rest } = props;

    return (
        <StyledButton type="button" ref={forwardRef} disabled={disabled || loading} {...rest}>
            {loading ? 'Loading' : icon && <Icon icon={icon} />}
        </StyledButton>
    );
}
