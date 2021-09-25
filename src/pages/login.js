import { useState } from 'react';
import styled from 'styled-components';
import { useLogin } from 'shared/hooks/auth';
import AuthLayout from 'components/layout/AuthLayout';
import { TextInput, Button } from 'components/common';

const LoginForm = styled.form`
    max-width: 360px;
    margin-top: 32px;
    box-sizing: border-box;
`;

const FormInput = styled(TextInput)`
    width: 100%;
    height: 50px;
    margin-bottom: 8px;
`;

const SubmitButton = styled(Button)`
    width: 100%;
    height: 50px;
    font-size: 16px;
    margin-top: 8px;
    margin-bottom: 16px;
`;
export default function Login() {
    const { login, loading, error } = useLogin();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChangeEmail = e => {
        setEmail(e.target.value);
    };

    const handleChangePassword = e => {
        setPassword(e.target.value);
    };

    const handleSubmit = async e => {
        e.preventDefault();

        login({ email, password });
    };

    return (
        <LoginForm onSubmit={handleSubmit}>
            <FormInput
                id="email"
                type="text"
                value={email}
                onChange={handleChangeEmail}
                placeholder="Email"
                required
                maxLength={254}
            />
            <FormInput
                id="password"
                type="password"
                value={password}
                onChange={handleChangePassword}
                placeholder="Password"
                minLength={1}
                required
            />
            <SubmitButton type="submit" disabled={email.length < 1 || password.length < 1}>
                {loading ? 'LOADING' : 'Log in'}
            </SubmitButton>
            <div>{error && error}</div>
        </LoginForm>
    );
}

Login.layout = AuthLayout;
