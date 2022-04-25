import { Icon } from 'components/common';
import { StyledButton, Content, TitleContainer, Title, Subtitle } from './styles';

export default function Button({
    forwardRef,
    disabled,
    loading,
    children,
    subtitle,
    center,
    type = 'button',
    icon,
    iconName,
    iconMinWidth,
    iconSize,
    iconColor,
    iconStyle,
    rightIcon,
    rightIconName,
    rightIconSize,
    rightIconColor,
    rightIconStyle,
    rightIconMinWidth,
    titleStyle,
    subtitleStyle,
    contentContainerStyle,
    className,
    ...rest
}) {
    const renderLeftIcon = () => {
        if (icon) return icon();
        if (iconName)
            return (
                <Icon
                    icon={iconName}
                    size={iconSize}
                    color={iconColor}
                    minWidth={iconMinWidth || 20}
                    style={{ marginRight: '4px', ...iconStyle }}
                />
            );
        return null;
    };

    const renderRightIcon = () => {
        if (rightIcon) return rightIcon();
        if (rightIconName)
            return (
                <Icon
                    icon={rightIconName}
                    style={{ marginLeft: 'auto', ...rightIconStyle }}
                    size={rightIconSize || 14}
                    color={rightIconColor}
                    minWidth={rightIconMinWidth || 20}
                />
            );
        return null;
    };

    return (
        <StyledButton
            ref={forwardRef}
            disabled={disabled || loading}
            type={type}
            hasIcon={!!icon}
            className={className}
            {...rest}
        >
            {loading ? (
                'Loading'
            ) : (
                <Content
                    center={center || (!icon && !iconName)}
                    hasSubtitle={!!subtitle}
                    style={contentContainerStyle}
                >
                    {renderLeftIcon()}
                    <TitleContainer>
                        <Title style={titleStyle}>{children}</Title>
                        {subtitle && <Subtitle style={subtitleStyle}>{subtitle}</Subtitle>}
                    </TitleContainer>
                    {renderRightIcon()}
                </Content>
            )}
        </StyledButton>
    );
}
