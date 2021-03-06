import { Icon } from './styles';

const COLORS = [
    '#1abc9c',
    '#2ecc71',
    '#3498db',
    '#9b59b6',
    '#34495e',
    '#16a085',
    '#27ae60',
    '#2980b9',
    '#8e44ad',
    '#2c3e50',
    '#f1c40f',
    '#e67e22',
    '#e74c3c',
    '#95a5a6',
    '#f39c12',
    '#d35400',
    '#c0392b',
    '#7f8c8d',
];

export default function TeamIcon({ name, width, height, className, style }) {
    const initials = name.charAt(0);
    //  name.split(' ')[0].charAt(0).toUpperCase() + name.split(' ')[1].charAt(0).toUpperCase()),
    const charIndex = name.charCodeAt(0) - 65;
    const colorIndex = (charIndex + name.charCodeAt(name.length - 1) * name.length) % 18;

    return (
        <Icon
            backgroundColor={COLORS[colorIndex]}
            width={width}
            height={height}
            className={className}
            style={style}
        >
            {initials}
        </Icon>
    );
}
