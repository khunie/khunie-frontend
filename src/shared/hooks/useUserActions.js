import { useMutation } from '@apollo/client';
import { STAR_BOARD_MUTATION, UNSTAR_BOARD_MUTATION } from 'gql/board/mutations';
import { GET_USER_QUERY } from 'gql/user/queries';

export default function useUserActions({ username }) {
    const [starBoardMutation, { data: sbData, loading: sbLoading, error: sbError }] = useMutation(
        STAR_BOARD_MUTATION,
        {
            update(cache, { data: { starBoard } }) {
                const cachedUser = cache.readQuery({
                    query: GET_USER_QUERY,
                    variables: {
                        username,
                    },
                });

                const { getUser } = cachedUser;
                const { stars } = getUser;
                const newStars = [...stars, starBoard];

                cache.writeQuery({
                    query: GET_USER_QUERY,
                    data: {
                        getUser: {
                            ...getUser,
                            stars: newStars,
                        },
                    },
                    variables: {
                        username,
                    },
                });
            },
            onCompleted() {},
            onError() {},
        }
    );

    const [unstarBoardMutation, { data: usbData, loading: usbLoading, error: usbError }] =
        useMutation(UNSTAR_BOARD_MUTATION, {
            update(cache, { data: { unstarBoard } }) {
                const cachedUser = cache.readQuery({
                    query: GET_USER_QUERY,
                    variables: {
                        username,
                    },
                });

                const { getUser } = cachedUser;
                const { stars } = getUser;
                const newStars = [...stars].filter(board => board.id !== unstarBoard.id);

                cache.writeQuery({
                    query: GET_USER_QUERY,
                    data: {
                        getUser: {
                            ...getUser,
                            stars: newStars,
                        },
                    },
                    variables: {
                        username,
                    },
                });
            },
            onCompleted() {},
            onError() {},
        });

    const starBoard = ({ board }) => {
        starBoardMutation({
            variables: {
                id: board.id,
            },
            optimisticResponse: {
                starBoard: {
                    __typename: 'Board',
                    ...board,
                    team: board.team,
                },
            },
        });
    };

    const unstarBoard = ({ board }) => {
        unstarBoardMutation({
            variables: {
                id: board.id,
            },
            optimisticResponse: {
                unstarBoard: {
                    __typename: 'Board',
                    ...board,
                    team: board.team,
                },
            },
        });
    };

    return { starBoard, unstarBoard };
}
