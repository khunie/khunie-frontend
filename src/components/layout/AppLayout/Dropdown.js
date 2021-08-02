import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import useEscape from 'shared/hooks/useEscape';
import useOutsideClick from 'shared/hooks/useOutsideClick';
import useOutsideMouseUp from 'shared/hooks/useOutsideMouseUp';

const Container = styled.div`
    position: absolute;
    width: 320px;
    background-color: #fff;
    z-index: 999;
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

export const DropdownMenu = styled.div`
    padding: 8px 0;
`;

export const DropdownMenuButton = styled.button`
    width: 100%;
    padding: 8px 16px;
    background-color: white;
    font-size: 16px;
    text-align: left;

    &:hover:enabled {
        background-color: #eeeeee;
    }

    &:active:enabled {
        background-color: #e8e8e8;
    }
`;

export const Divider = styled.div`
    flex: 1;
    height: 1px;
    background-color: #e5e5e5;
    margin-left: 8px;
`;

export default function Dropdown({ close, title, children }) {
    const [mouseDown, setMouseDown] = useState(false);
    const containerRef = useRef(null);

    useEscape(() => close());

    useOutsideClick(containerRef, () => {
        setMouseDown(true);
    });

    // can use useCallback here on these functions so they aren't constantly recreated
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
        <Container ref={containerRef}>
            {title && (
                <DropdownHeader>
                    <DropdownTitle>{title}</DropdownTitle>
                </DropdownHeader>
            )}
            {children}
        </Container>
    );
}
