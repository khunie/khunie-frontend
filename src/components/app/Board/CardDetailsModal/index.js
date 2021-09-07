import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import ReactMde from 'react-mde';
import ReactMarkdown from 'react-markdown';
import 'react-mde/lib/styles/css/react-mde-all.css';
import { GET_CARD_QUERY } from 'gql/card/queries';
import Modal from 'components/common/Modal';
import { ModalBody, Section, SectionHeader, SectionTitle } from './styles';

export default function CardDetailsModal({ isVisible, close }) {
    const router = useRouter();
    const { teamSlug, boardSlug } = router.query;
    const [value, setValue] = useState('**Hello world!!!**');

    const save = async function* (data) {
        // Promise that waits for "time" milliseconds
        const wait = function (time) {
            return new Promise((a, r) => {
                setTimeout(() => a(), time);
            });
        };

        // Upload "data" to your server
        // Use XMLHttpRequest.send to send a FormData object containing
        // "data"
        // Check this question: https://stackoverflow.com/questions/18055422/how-to-receive-php-image-data-over-copy-n-paste-javascript-with-xmlhttprequest

        await wait(2000);
        // yields the URL that should be inserted in the markdown
        yield 'https://picsum.photos/300';
        await wait(2000);

        // returns true meaning that the save was successful
        return true;
    };

    const {
        data: cdData,
        loading: cdLoading,
        error: cdError,
    } = useQuery(GET_CARD_QUERY, {
        variables: { teamSlug, boardSlug, cardId: router.query.c },
        fetchPolicy: 'network-only',
    });

    console.log('%c query data modal', 'color: magenta; font-size: 20px; font-weight: bold;');
    console.log(JSON.stringify(cdData, null, 4));

    const card = cdData?.getCard ?? {};

    return (
        <Modal isVisible={isVisible} close={close} title={card?.title}>
            <ModalBody>
                <Section>
                    <SectionHeader>
                        <SectionTitle>Description</SectionTitle>
                    </SectionHeader>
                    <div>{card?.description}</div>
                    <ReactMde
                        value={value}
                        onChange={setValue}
                        selectedTab="write"
                        childProps={{
                            writeButton: {
                                tabIndex: -1,
                            },
                        }}
                        toolbarCommands={[]}
                        paste={{
                            saveImage: save,
                        }}
                    />
                    <input placeholder="hello" />
                    <button>click me im a button</button>
                </Section>
                <Section>
                    <SectionHeader>
                        <SectionTitle>Comments</SectionTitle>
                        <pre>{JSON.stringify(cdError, null, 4)}</pre>
                    </SectionHeader>
                </Section>
            </ModalBody>
        </Modal>
    );
}
