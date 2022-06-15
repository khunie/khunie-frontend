import { useState, useRef, useEffect } from 'react';
import FocusTrap from 'focus-trap-react';
import useEscape from 'shared/hooks/useEscape';
import { Overlay, Container, ModalHeader, ModalTitle, ModalBody, CloseButton } from './styles';

function Modal({
    isVisible,
    close,
    title,
    children,
    padding,
    titleStyle,
    containerStyle,
    showClose = true,
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

    /*  useOutsideClick(containerRef, () => {
        setMouseDown(true);
    }); */

    const handleOverlayMouseDown = e => {
        setMouseDown(true);
    };

    const handleOverlayMouseUp = e => {
        if (mouseDown) {
            setMouseDown(false);
            close();
        }
    };

    const handleMouseDown = e => {
        e.stopPropagation();
    };

    const handleMouseUp = e => {
        e.stopPropagation();
        setMouseDown(false);
    };

    if (!isVisible) return null;

    return (
        <Overlay onMouseUp={handleOverlayMouseUp} onMouseDown={handleOverlayMouseDown}>
            <FocusTrap>
                <Container
                    ref={containerRef}
                    padding={padding}
                    style={containerStyle}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                >
                    <ModalHeader>
                        <ModalTitle style={titleStyle}>{title}</ModalTitle>
                        {showClose && (
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
                        )}
                    </ModalHeader>
                    <ModalBody>{children}</ModalBody>
                </Container>
            </FocusTrap>
        </Overlay>
    );
}

export default Modal;
