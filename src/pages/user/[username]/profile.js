import { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation, useReactiveVar } from '@apollo/client';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { GET_USER_QUERY } from 'gql/user/queries';
import AppLayout from 'components/layout/AppLayout';

const Container = styled.div`
    width: 500px;
    border-radius: 16px;
`;

const ImagePreview = styled.img`
    width: 300px;
`;

export default function Profile() {
    const router = useRouter();
    const [selectedImage, setSelectedImage] = useState(null);

    const { username } = router.query;

    const { data, loading, error } = useQuery(GET_USER_QUERY, {
        variables: { username },
        onCompleted: () => {
            console.log(JSON.stringify(data, null, 4));
        },
    });

    console.log(selectedImage);
    return (
        <Container>
            <ImagePreview src={selectedImage} alt="Upload preview" />
            <input
                type="file"
                accept=".jpg, .png"
                onChange={e => setSelectedImage(URL.createObjectURL(e.target.files[0]))}
            />
        </Container>
    );
}

Profile.layout = AppLayout;
