import {CalendarScreen} from "./CalendarScreen";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/calendar/:month">
                    <CalendarScreen />;
                </Route>
                <Redirect to={} />
            </Switch>
        </Router>
    );
}

export default App;
