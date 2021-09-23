import React, { useState } from 'react';
import styled from 'styled-components';
import { Container, Header, BackButton, Title, Body } from './styles';

export default function Stack({ headerRight, children }) {
    const [stack, setStack] = useState([children[0]]);

    const renderHeaderRight = () => {
        if (headerRight) return headerRight();

        return null;
    };

    const renderHeaderLeft = () => {
        if (stack.length > 1) return <BackButton icon="chevron-left" onClick={navigation.goBack} />;

        return null;
    };

    const navigation = {
        navigate: name => {
            const screen = children.find(item => item.props.name === name);
            if (screen) setStack([...stack, screen]);
        },
        goBack: () => {
            setStack([...stack.slice(0, -1)]);
        },
        pop: () => {
            console.log('pop');
        },
    };

    return (
        <Container>
            <Header>
                {renderHeaderLeft()}
                <Title>{stack[stack.length - 1].props.title}</Title>
                {renderHeaderRight()}
            </Header>
            <Body>{React.cloneElement(stack[stack.length - 1], { navigation })};</Body>
        </Container>
    );
}

Stack.Screen = ({ children, navigation }) => {
    return React.cloneElement(children, { navigation });
};
/* 
function MenuItem({ children, first, last, dividerStyle }) {
    return (
        <>
            {!first && <Divider style={dividerStyle} />}
            {React.cloneElement(children, { first, last })}
        </>
    );
}
 */
