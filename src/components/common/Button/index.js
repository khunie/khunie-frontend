import { StyledButton, Content, Icon } from './styles';

export default function Button(props) {
    const { forwardRef, icon, disabled, loading, children, center, type, ...rest } = props;

    return (
        <StyledButton
            ref={forwardRef}
            disabled={disabled || loading}
            type={type || 'button'}
            hasIcon={!!icon}
            center={center}
            {...rest}
        >
            {loading ? (
                'Loading'
            ) : (
                <Content>
                    {icon && <Icon icon={icon} />}
                    {children}
                </Content>
            )}
        </StyledButton>
    );
}
