import { useState, useRef, useEffect } from 'react';
import FocusTrap from 'focus-trap-react';
import useEscape from 'shared/hooks/useEscape';
import useOutsideClick from 'shared/hooks/useOutsideClick';
import { Overlay, Container, ModalHeader, ModalTitle, ModalBody, CloseButton } from './styles';

function Modal({
    isVisible,
    close,
    title,
    children,
    padding,
    titleStyle,
    containerStyle,
    closeStyle,
    closeHoverStyle,
    closeActiveStyle,
}) {
    const [mouseDown, setMouseDown] = useState(false);
    const containerRef = useRef(null);
    const closeRef = useRef(null);

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
                <Container ref={containerRef} padding={padding} style={containerStyle}>
                    <ModalHeader>
                        <ModalTitle style={titleStyle}>{title}</ModalTitle>
                        <CloseButton
                            type="button"
                            icon="times"
                            onClick={close}
                            buttonStyle={closeStyle}
                            hoverStyle={closeHoverStyle}
                            activeStyle={closeActiveStyle}
                            size={16}
                            tabIndex={-1}
                            forwardRef={closeRef}
                            onFocus={() => closeRef.current.blur()}
                        />
                    </ModalHeader>
                    <ModalBody>{children}</ModalBody>
                </Container>
            </FocusTrap>
        </Overlay>
    );
}

export default Modal;
