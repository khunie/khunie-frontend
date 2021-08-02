import { StyledButton, Icon } from './styles';

export default function IconButton(props) {
    const { forwardRef, icon, iconSize, disabled, loading, className, ...rest } = props;

    return (
        <StyledButton
            type="button"
            ref={forwardRef}
            className={className}
            disabled={disabled || loading}
            {...rest}
        >
            {loading ? 'Loading' : icon && <Icon icon={icon} fontSize={iconSize || 20} />}
        </StyledButton>
    );
}
