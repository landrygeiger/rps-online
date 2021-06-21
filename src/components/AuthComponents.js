import { Form, Button, Card, Alert } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { Link, useHistory, useLocation, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";

export const SignUp = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const usernameRef = useRef();
    const { signup } = useAuth();
    const history = useHistory();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState(useLocation().state?.redirect ?? "/");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(passwordRef.current.value !== confirmPasswordRef.current.value) {
            return setError("Passwords do not match.");
        }

        if (usernameRef.current.value.length > 16) {
            return setError("Username must be 16 characters or less.");
        }

        try {
            setError("");
            setLoading(true);
            await signup(emailRef.current.value, usernameRef.current.value, passwordRef.current.value);
            history.push(redirect);
        } catch {
            setError("Failed to create account.");
        }

        setLoading(false);
    }

    return (
        <Card className="shadow content-card card-2 mb-3">
            <Card.Body>
                <p className="text-center mb-4 text-title">Sign Up</p>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form className="mb-4" onSubmit={handleSubmit}>
                    <Form.Group id="username" className="mb-2">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" ref={usernameRef} required/>
                    </Form.Group>
                    <Form.Group id="email" className="mb-2">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required/>
                    </Form.Group>
                    <Form.Group id="password" className="mb-2">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required/>
                    </Form.Group>
                    <Form.Group id="confirm-password" className="mb-4">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" ref={confirmPasswordRef} required/>
                    </Form.Group>
                    <Button disabled={loading} type="submit" className="w-100"><i className="far fa-edit"></i> Sign Up</Button>
                </Form>
                <div className="text-center mt-4">
                    <p>Already have an account? <Link to={{pathname: "/login", state: { redirect }}}>Log in</Link></p>
                </div>
            </Card.Body>
        </Card>
    );
}

export const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const history = useHistory();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState(useLocation().state?.redirect ?? "/");
    const [showRedirect, setShowRedirect] = useState(false);
    // useLocation().state?.redirect ?? "/"

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            setShowRedirect(true);
            history.push(redirect);
            console.log(redirect);
        } catch {
            setError("Failed to login.");
        }

        setLoading(false);
    }

    return (
        <Card className="shadow content-card card-2">
            {showRedirect && <Redirect to={redirect} /> }
            <Card.Body>
                <p className="mb-2 text-center text-title">Login</p>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form>
                    <Form.Group id="email" className="mb-2">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required />
                    </Form.Group>
                    <Form.Group id="password" className="mb-2">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required />
                    </Form.Group>
                    <Button disabled={loading} type="submit" className="w-100 mt-4" onClick={handleSubmit}>Login</Button>
                </Form>
                <div className="mt-4 text-center">
                    <p>Don't have an account? <Link to={{pathname: "/signup", state: { redirect }}}>Sign up</Link></p>
                </div>
            </Card.Body>
        </Card>
    )
}