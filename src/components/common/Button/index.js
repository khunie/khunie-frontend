import { StyledButton, Content, Icon } from './styles';

export default function Button(props) {
    const { forwardRef, icon, disabled, loading, children, center, ...rest } = props;

    return (
        <StyledButton ref={forwardRef} disabled={disabled || loading} {...rest}>
            {loading ? (
                'Loading'
            ) : (
                <Content hasIcon={!!icon} center={center}>
                    {icon && <Icon icon={icon} />}
                    {children}
                </Content>
            )}
        </StyledButton>
    );
}
