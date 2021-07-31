import { Container, ListContent, ListHeader, ListTitle, ListFooter } from './styles';
import Card from './Card';
import AddCardForm from './AddCardForm';

export default function List({ id, title, cards, onAddCardClick, onCardEditClick, onCardClick }) {
    return (
        <Container className="list">
            <ListHeader>
                <ListTitle>{title}</ListTitle>
            </ListHeader>
            {cards.length > 0 && (
                <ListContent>
                    {cards.map(card => (
                        <Card
                            key={card.id}
                            id={card.id}
                            listId={id}
                            title={card.title}
                            onClick={onCardEditClick}
                            onCardClick={onCardClick}
                        />
                    ))}
                </ListContent>
            )}
            <ListFooter>
                <AddCardForm listId={id} onAddCardSubmit={onAddCardClick} />
            </ListFooter>
        </Container>
    );
}
