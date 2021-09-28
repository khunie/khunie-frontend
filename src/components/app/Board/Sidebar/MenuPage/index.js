import { useState } from 'react';
import { Container, MenuButton } from './styles';

export default function MenuPage({ navigation }) {
    return (
        <Container>
            <MenuButton
                onClick={() => navigation.navigate('Background')}
                iconName="user"
                iconStyle={{ marginLeft: '8px', marginRight: '8px' }}
                subtitle="Click this to change the board background"
            >
                Change Board Background
            </MenuButton>
        </Container>
    );
}
