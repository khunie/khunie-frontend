/** @prettier */

import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import styled from 'styled-components';
import Head from 'next/head';

const SIGNUP_MUTATION = gql`
    mutation SignupMutation($email: String!, $username: String!, $password: String!) {
        signup(email: $email, username: $username, password: $password) {
            token
            user {
                username
                email
                profile {
                    id
                    first
                    last
                    bio
                }
            }
        }
    }
`;

const Container = styled.div`
    max-width: 500px;
    height: 500px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const SignupForm = styled.form`
    max-width: 300px;
`;

const TextInput = styled.input`
    width: 100%;
    height: 25px;
    box-sizing: border-box;
    font-size: 16px;
    margin: 0 auto 2px auto;
    padding: 0px 10px;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid black;
    border-radius: 0px !important;

    &:focus {
        outline: none;
        margin-bottom: 0px;
        height: 27px;
        border-bottom: 3px solid #573cb6;
    }
`;

const ButtonWrapper = styled.div`
    margin-top: 16px;
    max-width: 500px;
    display: flex;
    justify-content: center;
`;

const SubmitButton = styled.button`
    padding: 12px 64px;
    font-weight: bold;
    border: none;
    border-radius: 10px;
    background-color: #3a38b6;
    font-size: 16px;
    color: white;
`;

/* <Title gradient={['#a458fc', '#4772ff', '#05d6dd']}> */

export default function Signup() {
    const [signUp, { loading: mLoading, data: mData, error: mError }] = useMutation(
        SIGNUP_MUTATION
    );

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [firstPassword, setFirstPassword] = useState('');
    const [secondPassword, setSecondPassword] = useState('');

    const handleChangeEmail = e => {
        setEmail(e.target.value);
    };

    const handleChangeUsername = e => {
        setUsername(e.target.value);
    };

    const handleChangeFirstPassword = e => {
        setFirstPassword(e.target.value);
    };

    const handleChangeSecondPassword = e => {
        setSecondPassword(e.target.value);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        console.log(email);
        console.log(username);
        console.log(firstPassword);
        console.log(secondPassword);
        await signUp({
            variables: {
                email,
                username,
                password: firstPassword,
            },
        });
    };

    return (
        <Container>
            <Head>
                <title>khunie | Create Account</title>
            </Head>
            <SignupForm onSubmit={handleSubmit}>
                <TextInput
                    type="email"
                    value={email}
                    onChange={handleChangeEmail}
                    placeholder="Email"
                    required
                />
                <TextInput
                    type="text"
                    value={username}
                    onChange={handleChangeUsername}
                    placeholder="Username"
                    required
                />
                <TextInput
                    type="password"
                    value={firstPassword}
                    onChange={handleChangeFirstPassword}
                    placeholder="Password"
                    minLength={8}
                    required
                />
                <TextInput
                    type="password"
                    value={secondPassword}
                    onChange={handleChangeSecondPassword}
                    placeholder="Reenter Password"
                    minLength={8}
                    required
                />
                <ButtonWrapper>
                    <SubmitButton type="submit">Sign up!</SubmitButton>
                </ButtonWrapper>
                <pre>{mError && JSON.stringify(mError, null, 4)}</pre>
            </SignupForm>
        </Container>
    );
}
