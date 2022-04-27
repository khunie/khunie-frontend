import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLogin } from 'shared/hooks/auth';
import AuthLayout from 'components/layout/AuthLayout';
import { TextInput, Button } from 'components/common';
import { toast } from 'react-toastify';

const LoginForm = styled.form`
    max-width: 360px;
    margin-top: 32px;
    box-sizing: border-box;
`;

const FormInput = styled(TextInput)`
    width: 100%;
    margin-bottom: 8px;
    padding: 10px 12px;
    font-size: 18px;
`;

const SubmitButton = styled(Button)`
    width: 100%;
    padding: 10px 12px;
    font-size: 18px;
    margin-top: 8px;
    margin-bottom: 16px;
`;
export default function Login() {
    const { login, loading, error, reset } = useLogin();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (error) {
            toast.error('Login failed');
        }
    }, [error]);

    const handleChangeEmail = e => {
        setEmail(e.target.value);
    };

    const handleChangePassword = e => {
        setPassword(e.target.value);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        reset();
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
            <SubmitButton
                title="Log in"
                type="submit"
                disabled={email.length < 1 || password.length < 1}
                loading={loading}
            />
            <div>{error && error}</div>
        </LoginForm>
    );
}

Login.layout = AuthLayout;
