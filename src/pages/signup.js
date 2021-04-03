/** @prettier */

import { useState } from 'react';
import { useMutation } from '@apollo/client';
import Link from 'next/link';
import styled from 'styled-components';
import Head from 'next/head';
import { SIGNUP_MUTATION } from 'gql/user/mutations';
import AuthLayout from 'components/layout/AuthLayout';

const Container = styled.div`
    padding: 128px 0;
    display: flex;
    justify-content: center;
`;

const FormContainer = styled.div`
    max-width: 450px;
    min-height: 500px;
    background-color: #fff;
    padding: 48px 64px 64px 64px;
    border-radius: 10px;
    /*     box-shadow: 4px 4px 16px #ccc;
    box-shadow: 1px 2px 6px #ccc; */
    box-sizing: border-box;
`;

const FormTitle = styled.h1`
    font-size: 20px;
    font-weight: bold;
    font-family: Roboto;
    text-align: center;
`;

const SignupForm = styled.form`
    max-width: 360px;
    margin-top: 32px;
    box-sizing: border-box;
`;

const TextInput = styled.input`
    width: 100%;
    box-sizing: border-box;
    font-size: 18px;
    margin: 0 auto 16px auto;
    padding: 12px 16px;
    background-color: transparent;
    border: none;
    border: 2px solid #aaa;
    border-radius: 10px;
    font-family: Roboto;

    &:focus {
        outline: none;
        border: 2px solid #573cb6;
    }
`;

const ButtonWrapper = styled.div`
    margin-top: 16px;
    max-width: 500px;
    display: flex;
    justify-content: center;
`;

const SubmitButton = styled.button`
    width: 100%;
    padding: 16px;
    font-weight: bold;
    border: none;
    border-radius: 10px;
    background-color: #3a38b6;
    background: linear-gradient(to right, #202da1, #3a38b6);
    font-size: 16px;
    color: white;
    letter-spacing: 1px;
    font-family: Roboto;
    cursor: pointer;
`;

const Logo = styled.img`
    width: 92px;
    height: auto;
    object-fit: contain;
    padding: 8px;
    margin: 0 auto;
    cursor: pointer;
`;

const FormHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export default function Signup() {
    const [signUp, { loading: mLoading, data: mData, error: mError }] = useMutation(
        SIGNUP_MUTATION
    );

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleChangeEmail = e => {
        setEmail(e.target.value);
    };

    const handleChangeUsername = e => {
        setUsername(e.target.value);
    };

    const handleChangePassword = e => {
        setPassword(e.target.value);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        console.log(email);
        console.log(username);
        await signUp({
            variables: {
                email,
                username,
                password,
            },
        });
    };

    return (
        <SignupForm onSubmit={handleSubmit} autoComplete="off">
            <TextInput
                id="email"
                type="email"
                value={email}
                onChange={handleChangeEmail}
                placeholder="Email"
                required
                maxLength={64}
            />
            <TextInput
                id="username"
                type="text"
                value={username}
                onChange={handleChangeUsername}
                placeholder="Username"
                required
                maxLength={32}
            />
            <TextInput
                id="password"
                type="password"
                value={password}
                onChange={handleChangePassword}
                placeholder="Password"
                minLength={8}
                maxLength={32}
                required
                autoComplete="off"
            />
            <ButtonWrapper>
                <SubmitButton type="submit">Sign up!</SubmitButton>
            </ButtonWrapper>
            <pre>{mData && JSON.stringify(mData, null, 4)}</pre>
            <pre>{mError && JSON.stringify(mError, null, 4)}</pre>
        </SignupForm>
    );
}

Signup.layout = AuthLayout;
