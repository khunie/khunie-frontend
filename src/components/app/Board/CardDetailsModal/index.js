import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_CARD_QUERY } from 'gql/card/queries';
import Modal from 'components/common/Modal';
import { ModalBody, Section, SectionHeader, SectionTitle } from './styles';

export default function CardDetailsModal({ isVisible, close }) {
    const router = useRouter();
    const { teamSlug, boardSlug } = router.query;

    const { data: cdData, loading: cdLoading, error: cdError } = useQuery(GET_CARD_QUERY, {
        variables: { teamSlug, boardSlug, cardId: router.query.c },
    });

    console.log('%c query data modal', 'color: magenta; font-size: 20px; font-weight: bold;');
    console.log(JSON.stringify(cdData, null, 4));

    const card = cdData?.getCard ?? {};

    return (
        <Modal isVisible={isVisible && !cdLoading} close={close} title={card.title}>
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
