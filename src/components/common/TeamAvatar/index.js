import TeamIcon from './TeamIcon';
import { Image } from './styles';

export default function TeamAvatar({ src, name, width, height, className }) {
    return src ? (
        <Image src={src} width={width} height={height} className={className} />
    ) : (
        <TeamIcon name={name} width={width} height={height} className={className} />
    );
}
