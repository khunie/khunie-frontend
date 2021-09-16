import { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation, useReactiveVar } from '@apollo/client';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { GET_USER_QUERY } from 'gql/user/queries';
import { UPLOAD_PROFILE_PIC } from 'gql/profile/mutations';
import AppLayout from 'components/layout/AppLayout';
import { blobToBase64 } from 'shared/utils';

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
    const [imagePreview, setImagePreview] = useState(null);

    const { username } = router.query;

    const { data, loading, error } = useQuery(GET_USER_QUERY, {
        variables: { username },
        onCompleted: () => {
            console.log(JSON.stringify(data, null, 4));
        },
    });

    const [uploadProfilePicMutation, { data: ulData, loading: ulLoading, error: ulError }] =
        useMutation(UPLOAD_PROFILE_PIC, {
            update(cache, { data: { uploadProfilePic } }) {
                const cachedUser = cache.readQuery({
                    query: GET_USER_QUERY,
                    variables: {
                        username,
                    },
                });

                const { getUser } = cachedUser;
                console.log(JSON.stringify(uploadProfilePic, null, 2));
            },
            onCompleted() {},
            onError() {},
        });

    const handleSubmit = async e => {
        e.preventDefault();
        const data = await blobToBase64(selectedImage);
        uploadProfilePicMutation({
            variables: {
                image: data,
            },
        });
    };

    const handleSelectImage = e => {
        setSelectedImage(e.target.files[0]);
        setImagePreview(URL.createObjectURL(e.target.files[0]));
    };

    return (
        <Container>
            <form onSubmit={handleSubmit}>
                <ImagePreview src={imagePreview} alt="Upload preview" />
                <input type="file" accept=".jpg, .png" onChange={handleSelectImage} />
                <button type="submit" disabled={!selectedImage}>
                    Upload
                </button>
            </form>
        </Container>
    );
}

Profile.layout = AppLayout;
