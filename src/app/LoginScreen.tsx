import { makeStyles } from '@material-ui/styles';
import { Box, Button, Container, TextField } from '@material-ui/core';
import { FormEvent, useState } from 'react';
import { IUser, signInEndpoint } from './backend';

const useStyles = makeStyles({
    error: {
        backgroundColor: 'rgb(253, 236, 234)',
        borderRadius: '4px',
        padding: '16px',
        margin: '16px 0',
        textAlign: 'center'
    }
});

interface ILoginScreenProps {
    onSignIn: (user: IUser) => void;
}

export function LoginScreen(props: ILoginScreenProps) {
    const classes = useStyles();
    const [email, setEmail] = useState('biraneves@gmail.com');
    const [password, setPassword] = useState('1234');
    const [error, setError] = useState('');

    function signIn(evt: FormEvent) {
        evt.preventDefault();
        signInEndpoint(email, password).then(props.onSignIn,
            (e) => setError('E-mail não encontrado ou senha incorreta.'),
        );
    }

    return (
        <Container maxWidth="sm">
            <h1>React Calendar</h1>
            <p>
                Digite o e-mail e a senha para entrar. Para testar, use o e-mail{' '}
                <kbd
                    style={{
                        display: 'inline',
                        color: '#f00',
                        backgroundColor: '#eee',
                        padding: '2px',
                        borderRadius: '2px',
                    }}
                >
                    biraneves@gmail.com
                </kbd>{' '}
                e a senha{' '}
                <kbd
                    style={{
                        display: 'inline',
                        color: '#f00',
                        backgroundColor: '#eee',
                        padding: '2px',
                        borderRadius: '2px',
                    }}
                >
                    1234
                </kbd>
                .
            </p>
            <form onSubmit={signIn}>
                <TextField
                    margin="normal"
                    label="E-mail"
                    fullWidth
                    variant="outlined"
                    value={email}
                    onChange={(evt) => setEmail(evt.target.value)}
                />
                <TextField
                    type="password"
                    margin="normal"
                    label="Senha"
                    fullWidth
                    variant="outlined"
                    value={password}
                    onChange={(evt) => setPassword(evt.target.value)}
                />
                {error && (<div className={classes.error}>{error}</div>)}
                <Box textAlign="right" marginTop="16px">
                    <Button type="submit" variant="contained" color="primary">
                        Entrar
                    </Button>
                </Box>
            </form>
        </Container>
    );
}
