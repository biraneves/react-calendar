import { CalendarScreen } from './CalendarScreen';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import { getToday } from './dateFunctions';
import { useEffect, useState } from 'react';
import { getUserEndpoint, IUser } from './backend';
import { LoginScreen } from './LoginScreen';
import { authContext } from './authContext';

function App() {
    const month = getToday().substring(0, 7);
    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        getUserEndpoint().then(setUser, onSignOut);
    }, []);

    function onSignOut() {
        setUser(null);
    }

    if (user) {
        return (
            <authContext.Provider value={{ user, onSignOut }}>
                <Router>
                    <Switch>
                        <Route path="/calendar/:month">
                            <CalendarScreen />;
                        </Route>
                        <Redirect to={{ pathname: '/calendar/' + month }} />
                    </Switch>
                </Router>
            </authContext.Provider>
        );
    } else {
        return <LoginScreen onSignIn={setUser} />;
    }
}

/* class App2 extends React.Component<{}, { user: IUser | null }> {
    setUser!: (user: IUser) => void;
    onSignOut!: () => void;

    constructor(props: {}) {
        super(props);
        this.state = { user: null };

        const setUser = (user: IUser) => {
            this.setState({ user });
        };

        const onSignOut = () => {
            this.setState({ user: null });
        };
    }

    render() {
        const month = getToday().substring(0, 7);

        const { user } = this.state;

        if (user) {
            return (
                <authContext.Provider
                    value={{ user, onSignOut: this.onSignOut }}
                >
                    <Router>
                        <Switch>
                            <Route path="/calendar/:month">
                                <CalendarScreen />;
                            </Route>
                            <Redirect to={{ pathname: '/calendar/' + month }} />
                        </Switch>
                    </Router>
                </authContext.Provider>
            );
        } else {
            return <LoginScreen onSignIn={this.setUser} />;
        }
    }

    componentDidMount(): void {
        getUserEndpoint().then(this.setUser, this.onSignOut);
    }
} */

export default App;
