import { Container, ListContent, ListHeader, ListTitle, ListFooter } from './styles';
import Card from './Card';
import AddCardForm from './AddCardForm';

export default function List({ id, title, cards, onAddCardClick, className }) {
    return (
        <Container className={className}>
            <ListHeader>
                <ListTitle>{title}</ListTitle>
            </ListHeader>
            {cards.length > 0 && (
                <ListContent>
                    {cards.map(card => (
                        <Card key={card.id} title={card.title} />
                    ))}
                </ListContent>
            )}
            <ListFooter>
                <AddCardForm listId={id} onAddCardSubmit={onAddCardClick} />
            </ListFooter>
        </Container>
    );
}
