import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Container, Header, BackButton, Title, Body } from './styles';

export default function Stack({ headerRight, children }) {
    const [stack, setStack] = useState([children[0]]);
    const [lastScrollTop, setLastScrollTop] = useState(0);
    const bodyRef = useRef(null);

    const renderHeaderRight = () => {
        if (headerRight) return headerRight();

        return null;
    };

    const renderHeaderLeft = () => {
        return (
            <BackButton icon="chevron-left" onClick={navigation.goBack} show={stack.length > 1} />
        );
    };

    const navigation = {
        navigate: name => {
            const screen = children.find(item => item.props.name === name);
            if (screen) {
                setStack([...stack, screen]);
                setLastScrollTop(bodyRef.current.scrollTop);
                bodyRef.current.scrollTo(0, 0);
            }
        },
        goBack: () => {
            setStack([...stack.slice(0, -1)]);
            bodyRef.current.scrollTo(0, lastScrollTop);
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
            <Body ref={bodyRef}>{React.cloneElement(stack[stack.length - 1], { navigation })}</Body>
        </Container>
    );
}

Stack.Screen = ({ navigation, component, forwardRef }) => {
    return component({ navigation });
};
