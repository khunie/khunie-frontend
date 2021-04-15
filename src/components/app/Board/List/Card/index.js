import styled from 'styled-components';
import { Container } from './styles';

export default function Card({ title }) {
    return (
        <Container>
            <h4>{title}</h4>
        </Container>
    );
}
