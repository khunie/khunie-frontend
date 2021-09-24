import { Container, SearchInput, ImageOption } from './styles';

const IMAGES = [
    'https://i.postimg.cc/h4RwXMv3/shenzhen-6.jpg',
    'https://i.postimg.cc/pP3BVrps/city-1.jpg',
    'https://i.postimg.cc/jt56zPf8/city-2.jpg',
    'https://i.postimg.cc/4fgbt0vt/city-3.jpg',
    'https://i.postimg.cc/sffYHZNg/city-4.jpg',
    'https://i.postimg.cc/wgGXFMc9/city-5.jpg',
    'https://i.postimg.cc/2mC7SPSN/shenzhen-1.jpg',
    'https://i.postimg.cc/dvnmk4hk/shenzhen-3.jpg',
    'https://i.postimg.cc/L9KvD5SJ/shenzhen-4.jpg',
    'https://i.postimg.cc/qk9DFQsM/shenzhen-5.jpg',
];

export default function BackgroundImagePage({ navigation, onImageClick }) {
    return (
        <Container>
            <SearchInput placeholder="Search for an image" />
            {IMAGES.map(image => (
                <ImageOption src={image} alt="cityscape" onClick={() => onImageClick(image)} />
            ))}
        </Container>
    );
}
