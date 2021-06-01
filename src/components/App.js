import React from "react";
import PageHeader from "./PageHeader";
import MainPageContentDisplay from "./MainPageContentDisplay";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Login, SignUp } from "./AuthComponents";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContexts";

class App extends React.Component {
    render() {
        return (
            <AuthProvider>
                <Router>
                    <PageHeader />
                    <Container className="d-flex align-items-center justify-content-center"
                                style={{ minHeight: "calc(100vh - 225px", margin:"50px auto"}}>
                                { /* 125px for header, 100px for margin*/ }
                        <Switch>
                            <Route path="/" exact component={MainPageContentDisplay} />
                            <Route path="/login" component={Login} />
                            <Route path="/signup" component={SignUp} />
                        </Switch>
                    </Container>
                </Router>
            </AuthProvider>
        );
    }
}

export default App;