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
        setMouseDown(true);
    });

    const handleMouseUp = e => {
        if (mouseDown) close();
        setMouseDown(false);
    };

    if (!isVisible) return null;

    return (
        <Overlay onMouseUp={handleMouseUp}>
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
