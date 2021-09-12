import { StyledButton, Content, LeftIcon, RightIcon } from './styles';

export default function Button({
    forwardRef,
    disabled,
    loading,
    children,
    center,
    type,
    icon,
    rightIcon,
    iconName,
    rightIconName,
    iconMinWidth,
    iconSize,
    ...rest
}) {
    const renderLeftIcon = () => {
        if (icon) return icon();
        if (iconName) return <LeftIcon icon={iconName} $minWidth={iconMinWidth} $size={iconSize} />;
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
            hasIcon={!!icon}
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
