import { useState } from 'react';
import { useMutation } from '@apollo/client';
import Link from 'next/link';
import styled from 'styled-components';
import Head from 'next/head';
import { SIGNUP_MUTATION } from 'gql/user/mutations';
import AuthLayout from 'components/layout/AuthLayout';
import { useSignup } from 'shared/hooks/auth';

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
export default function Signup() {
    const { signup, loading, error } = useSignup();

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
        signup({ email, username, password });
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
                minLength={1}
                required
                autoComplete="off"
            />
            <ButtonWrapper>
                <SubmitButton type="submit">Sign up!</SubmitButton>
            </ButtonWrapper>
            <div>{error && error}</div>
        </SignupForm>
    );
}

Signup.layout = AuthLayout;
