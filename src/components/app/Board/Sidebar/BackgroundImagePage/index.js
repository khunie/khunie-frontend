import { Container, SearchInput, Content, ImageButton, Image } from './styles';

const IMAGE_URLS = [
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
    'https://i.postimg.cc/VmBGBXYc/IMG-5265.jpg',
];

export default function BackgroundImagePage({ navigation, onImageClick }) {
    return (
        <Container>
            <SearchInput placeholder="Search for an image" />
            <Content>
                {IMAGE_URLS.map(image => (
                    <ImageButton onClick={() => onImageClick(image)} key={image}>
                        <Image src={image} alt="cityscape" draggable={false} />
                    </ImageButton>
                ))}
            </Content>
        </Container>
    );
}
