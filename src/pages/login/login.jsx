import React, { useState } from 'react';
import styled from "styled-components";
import Card from '../../shared/styled/card';
/**
 * TODO: Uncomment the following code to authenticate the user
 */
// import { authenticateUser } from './function';
// import { auth } from '../../apis/firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { Palette } from '../../shared/styled/theme';


function LoginPage() { //Templated
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async () => {
        setError(null);
        setIsLoading(true);
        try {
            /**
             * TODO: Uncomment the following code to authenticate the user
             */
            // const userCredential = await authenticateUser(auth, email, password)
            // if (!userCredential.user) {
            //     return
            // }
            navigate('/');
        } catch (error) {
            console.error(error)
            setError(error.code)
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Container>
            <Card
                $radius={5}
                $elevation={1}
                $color={`${Palette.Background200}`}
                className='login-card'
            >
                <h1>Login</h1>
                {error && <Error>{error}</Error>}
                <Field>
                    <label name='email'>Email</label>
                    <input
                        type="email"
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Field>
                <Field>
                    <label name='password'>Password</label>
                    <input
                        type="password"
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Field>
                <Submit onClick={onSubmit} disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Login'}
                </Submit>
            </Card>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    color: ${Palette.Text};

    .login-card{
        width: 500px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 1em;
    }

    h1{
        font-size: x-large;
    }
`;

const Error = styled.div`
    background-color: #ff5f5f;
    color: white;
    padding: 1em;
    border-radius: 5px;
`;

const Field = styled.div`
    display: flex;
    flex-direction: column;

    input {
        padding:1em;
        border-radius: 5px;
        border: none;
        border-bottom: 1px solid gray;
        background-color: ${Palette.Background100};
    }

    label {
        margin-bottom: 3px;
        font-weight: 500;
    }
`;

const Submit = styled.button`
    background-color: ${Palette.Primary};
    color: ${Palette.Text};
    padding: 1em;
    border: none;
    border-radius: 5px;
    width: 200px;
`;

export default LoginPage

