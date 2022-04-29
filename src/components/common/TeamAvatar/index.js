import TeamIcon from './TeamIcon';
import { Image } from './styles';

export default function TeamAvatar({ src, name, width, height, className, style }) {
    return src ? (
        <Image src={src} width={width} height={height} className={className} style={style} />
    ) : (
        <TeamIcon name={name} width={width} height={height} className={className} style={style} />
    );
}
