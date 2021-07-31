import { useState, useEffect, useRef } from 'react';
import Modal from 'components/common/Modal';
import { ModalBody, Section, SectionHeader, SectionTitle } from './styles';

export default function CardDetailsModal({ isVisible, close, card }) {
    console.log(JSON.stringify(card, null, 4));
    return (
        <Modal isVisible={isVisible} close={close} title={card.title}>
            <ModalBody>
                <Section>
                    <SectionHeader>
                        <SectionTitle>Description</SectionTitle>
                    </SectionHeader>
                    <div>{card.description}</div>
                    <input placeholder="hello" />
                    <button>click me im a button</button>
                </Section>
                <Section>
                    <SectionHeader>
                        <SectionTitle>Comments</SectionTitle>
                    </SectionHeader>
                </Section>
            </ModalBody>
        </Modal>
    );
}
