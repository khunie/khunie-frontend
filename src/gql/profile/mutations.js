import { gql } from '@apollo/client';

export const UPLOAD_PROFILE_PIC = gql`
    mutation UploadProfilePicMutation($image: Upload!) {
        uploadProfilePic(image: $image) {
            id
            pic
        }
    }
`;
