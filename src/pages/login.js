import { useState } from 'react';
import styled from 'styled-components';
import AuthLayout from 'components/layout/AuthLayout';
import { useLogin } from 'shared/hooks/auth';

const LoginForm = styled.form`
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

        /*         try {
            login({
                variables: {
                    email,
                    password,
                },
            });
        } catch (err) {
            setDisplayedError('You have entered incorrect login information');
            console.log(err);
        } */

        login({ email, password });
    };

    return (
        <LoginForm onSubmit={handleSubmit}>
            <TextInput
                id="email"
                type="text"
                value={email}
                onChange={handleChangeEmail}
                placeholder="Email"
                required
                maxLength={64}
            />
            <TextInput
                id="password"
                type="password"
                value={password}
                onChange={handleChangePassword}
                placeholder="Password"
                minLength={1}
                required
            />
            <ButtonWrapper>
                <SubmitButton type="submit">{loading ? 'LOADING' : 'Log in'}</SubmitButton>
            </ButtonWrapper>
            <div>{error && error}</div>
        </LoginForm>
    );
}

Login.layout = AuthLayout;

/*     const [login, { loading, error }] = useMutation(LOGIN_MUTATION, {
        onCompleted({ login: { token, user } }) {
            console.log(token);
            console.log(JSON.stringify(user, null, 2));
            userVar(user);
            localStorage.setItem(AUTH_TOKEN, token);
            localStorage.setItem(CURRENT_USER, JSON.stringify(user));

            const { username } = user;

            if (typeof window !== 'undefined') {
                if (username) {
                    router.replace({
                        pathname: '/[username]',
                        query: { username },
                    });
                }
            }
        },
    });
    const [displayedError, setDisplayedError] = useState();*/
