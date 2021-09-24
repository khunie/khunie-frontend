import React, { useState, useRef, useEffect } from 'react';
import { Container, Header, BackButton, Title, Body, ScreenContainer } from './styles';

export default function Stack({ headerRight, children }) {
    const [stack, setStack] = useState([children[0]]);
    const stackRef = useRef(stack);
    stackRef.current = stack;
    const [lastScrollTop, setLastScrollTop] = useState([]);
    const [backVisible, setBackVisible] = useState(false);
    const bodyRef = useRef(null);
    const backRef = useRef(null);

    useEffect(() => {
        const unsubscribe = backRef.current.addEventListener('transitionend', () => {
            if (stackRef.current.length === 1) {
                setBackVisible(false);
            }
        });

        return unsubscribe;
    }, []);

    const navigate = name => {
        const screen = children.find(item => item.props.name === name);
        if (screen) {
            setStack([...stack, screen]);
            setLastScrollTop([...lastScrollTop, bodyRef.current.scrollTop]);
            bodyRef.current.scrollTo(0, 0);
            setBackVisible(true);
        }
    };

    const goBack = () => {
        if (stack.length > 1) {
            setStack([...stack.slice(0, -1)]);
            const scrollTo = lastScrollTop[lastScrollTop.length - 1];
            setLastScrollTop([...lastScrollTop.slice(0, -1)]);
            bodyRef.current.scrollTo(0, scrollTo);
        }
    };

    const pop = () => {
        console.log('pop');
    };

    const navigation = {
        navigate,
        goBack,
        pop,
    };

    const renderHeaderRight = () => {
        if (headerRight) return headerRight();

        return null;
    };

    const renderHeaderLeft = () => {
        return (
            <BackButton
                icon="chevron-left"
                onClick={navigation.goBack}
                show={stack.length > 1}
                isVisible={backVisible}
                forwardRef={backRef}
            />
        );
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

Stack.Screen = ({ navigation, component }) => {
    return component({ navigation });
};
