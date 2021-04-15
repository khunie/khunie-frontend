import { useEffect } from 'react';

import { Overlay, Container, CloseButton } from './styles';

function Modal({ isVisible, close, children }) {
    useEffect(() => {
        if (isVisible) {
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.overflowY = 'unset';
        }
    }, [isVisible]);

    const handleContainerClick = e => {
        e.stopPropagation();
    };

    if (!isVisible) return null;

    return (
        <Overlay onClick={close}>
            <Container onClick={handleContainerClick}>
                <h2>this is the modal header</h2>
                <CloseButton type="button" onClick={close} />
                {children}
            </Container>
        </Overlay>
    );
}

export default Modal;
