import { useState } from 'react';
import { Container } from './styles';

export default function MenuPage({ navigation }) {
    const [count, setCount] = useState(0);

    return (
        <Container>
            This is the Sidebar Menu
            <button onClick={() => navigation.navigate('Background')}>
                Change Board Background
            </button>
            <div>{count}</div>
            <button onClick={() => setCount(prev => prev + 1)}>Increment count</button>
        </Container>
    );
}
