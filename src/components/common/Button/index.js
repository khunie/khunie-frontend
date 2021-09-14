import { StyledButton, Content, Title, LeftIcon, RightIcon } from './styles';

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
    iconColor,
    titleMaxWidth,
    ...rest
}) {
    const renderLeftIcon = () => {
        if (icon) return icon();
        if (iconName)
            return (
                <LeftIcon
                    icon={iconName}
                    $minWidth={iconMinWidth}
                    $size={iconSize}
                    $color={iconColor}
                />
            );
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
                    <Title $maxWidth={titleMaxWidth}>{children}</Title>
                    {renderRightIcon()}
                </Content>
            )}
        </StyledButton>
    );
}
