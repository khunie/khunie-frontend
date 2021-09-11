import { StyledButton, Content, LeftIcon, RightIcon } from './styles';

export default function Button({
    forwardRef,
    disabled,
    loading,
    children,
    center,
    type,
    leftIcon,
    rightIcon,
    leftIconName,
    rightIconName,
    ...rest
}) {
    const renderLeftIcon = () => {
        if (leftIcon) return leftIcon();
        if (leftIconName) return <LeftIcon icon={leftIconName} />;
        return null;
    };

    const renderRightIcon = () => {
        if (rightIcon) return rightIcon();
        if (rightIconName) return <RightIcon icon={rightIconName} />;
        return null;
    };

    return (
        <StyledButton
            ref={forwardRef}
            disabled={disabled || loading}
            type={type || 'button'}
            hasIcon={!!leftIcon}
            center={center}
            {...rest}
        >
            {loading ? (
                'Loading'
            ) : (
                <Content>
                    {renderLeftIcon()}
                    {children}
                    {renderRightIcon()}
                </Content>
            )}
        </StyledButton>
    );
}
