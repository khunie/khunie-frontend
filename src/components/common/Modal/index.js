import { useState, useRef, useEffect } from 'react';
import FocusTrap from 'focus-trap-react';
import useEscape from 'shared/hooks/useEscape';
import useOutsideClick from 'shared/hooks/useOutsideClick';
import { Overlay, Container, ModalHeader, ModalTitle, ModalBody, CloseButton } from './styles';

function Modal({ isVisible, close, title, children }) {
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
        if (mouseDown) {
            setMouseDown(false);
            close();
        }
    };

    if (!isVisible) return null;

    return (
        <Overlay onMouseUp={handleMouseUp}>
            <FocusTrap>
                <Container ref={containerRef}>
                    <ModalHeader>
                        <ModalTitle>{title}</ModalTitle>
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
