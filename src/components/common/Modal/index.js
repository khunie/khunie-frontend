import { useState, useRef, useEffect } from 'react';
import FocusTrap from 'focus-trap-react';
import useEscape from 'shared/hooks/useEscape';
import useOutsideClick from 'shared/hooks/useOutsideClick';
import { Overlay, Container, ModalHeader, ModalBody, CloseButton } from './styles';

function Modal({ isVisible, close, children }) {
    const [mouseDown, setMouseDown] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        if (isVisible) {
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.overflowY = 'unset';
        }
    }, [isVisible]);

    useEscape(() => close());

    useOutsideClick(containerRef, () => {
        if (isVisible) close();
    });

    if (!isVisible) return null;

    return (
        <Overlay>
            <FocusTrap>
                <Container ref={containerRef}>
                    <ModalHeader>
                        <h2>this is the modal header</h2>
                        <CloseButton type="button" onClick={close}>
                            x
                        </CloseButton>
                    </ModalHeader>
                    <ModalBody>{children}</ModalBody>
                </Container>
            </FocusTrap>
        </Overlay>
    );
}

export default Modal;
