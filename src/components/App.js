import React from "react";
import PageHeader from "./PageHeader";
import MainPageContent from "./MainPageContent";
import { BrowserRouter, Route } from "react-router-dom";
import { Login, SignUp } from "./AuthComponents";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContexts";

class App extends React.Component {
    render() {
      return (
        <div>
            <AuthProvider>
                <BrowserRouter>
                    <PageHeader />
                    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "calc(100vh - 125px" }}>
                        <Route path="/" exact component={MainPageContent} />
                        <Route path="/login" component={Login} />
                        <Route path="/sign-up" component={SignUp} />
                    </Container>
                </BrowserRouter>
            </AuthProvider>
        </div>
      );
    }
}

export default App;