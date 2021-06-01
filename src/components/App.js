import React from "react";
import PageHeader from "./PageHeader";
import MainPageContent from "./MainPageContent";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Login, SignUp } from "./AuthComponents";
import { Container } from "react-bootstrap";
import { AuthProvider, useAuth } from "../contexts/AuthContexts";

class App extends React.Component {
    render() {
        return (
            <div>
                <AuthProvider>
                    <Router>
                        <PageHeader />
                        <Container className="d-flex align-items-center justify-content-center"
                                    style={{ minHeight: "calc(100vh - 125px" }}>
                                    { /* 125px for header */ }
                            <Switch>
                                <Route path="/" exact component={MainPageContent} />
                                <Route path="/login" component={Login} />
                                <Route path="/signup" component={SignUp} />
                            </Switch>
                        </Container>
                    </Router>
                </AuthProvider>
            </div>
        );
    }
}

export default App;