import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import useEscape from 'shared/hooks/useEscape';
import useOutsideClick from 'shared/hooks/useOutsideClick';
import useOutsideMouseUp from 'shared/hooks/useOutsideMouseUp';

const Container = styled.div`
    position: absolute;
    width: 320px;
    background-color: #fff;
    z-index: 9999;
    right: 4px;
    top: 52px;
    border-radius: 4px;
    box-shadow: 0px 0px 0px 1px #555263;
    padding: 0;
`;

const DropdownHeader = styled.div`
    padding: 12px;
    text-align: center;
    border-bottom: 1px solid #e5e5e5;
`;

const DropdownTitle = styled.h3`
    font-weight: bold;
`;

export default function Dropdown({ close, isVisible, title, children, className }) {
    const [mouseDown, setMouseDown] = useState(false);
    const containerRef = useRef(null);

    useEscape(() => close());

    useOutsideClick(containerRef, () => {
        setMouseDown(true);
    });

    useOutsideMouseUp(
        containerRef,
        () => {
            if (mouseDown) {
                setMouseDown(false);
                close();
            }
        },
        () => {
            setMouseDown(false);
        }
    );

    return (
        isVisible && (
            <Container ref={containerRef} className={className}>
                {title && (
                    <DropdownHeader>
                        <DropdownTitle>{title}</DropdownTitle>
                    </DropdownHeader>
                )}
                {children}
            </Container>
        )
    );
}
