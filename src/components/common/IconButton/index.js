import { StyledButton, Icon } from './styles';

export default function IconButton(props) {
    const { forwardRef, icon, disabled, loading, className, size, iconStyle, ...rest } = props;

    return (
        <StyledButton
            type="button"
            ref={forwardRef}
            className={className}
            disabled={disabled || loading}
            {...rest}
        >
            {loading ? 'Loading' : icon && <Icon icon={icon} size={size} style={iconStyle} />}
        </StyledButton>
    );
}
