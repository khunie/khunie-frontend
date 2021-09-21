import { StyledIcon } from './styles';

export default function Icon({ icon, size, className, color, minWidth, style }) {
    return (
        <StyledIcon
            icon={icon}
            className={className}
            $size={size}
            $color={color}
            $minWidth={minWidth}
            style={style}
        />
    );
}
