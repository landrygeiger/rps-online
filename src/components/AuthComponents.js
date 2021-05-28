import { Form, Button, Card, Alert } from "react-bootstrap";
import { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContexts";

export const SignUp = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const { signup } = useAuth();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(passwordRef.current.value !== confirmPasswordRef.current.value) {
            return setError("Passwords do no match");
        }

        try {
            setError("");
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
        } catch {
            setError("Failed to create account");
        }

        setLoading(false);
    }

    return (
        <div className="w-100" style={{maxWidth: "400px"}}>
            <Card className="shadow"style={{borderRadius: "15px", padding: "30px"}}>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign Up</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form className="mb-4" onSubmit={handleSubmit}>
                        <Form.Group id="email" className="mb-2">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password" className="mb-2">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Form.Group id="confirm-password" className="mb-2">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" ref={confirmPasswordRef} required />
                        </Form.Group>
                        <Button disabled={loading} type="submit" className="w-100"><i className="far fa-edit"></i> Sign Up</Button>
                    </Form>
                    <div className="text-center mt-4">
                        <p>Already have an account? <a href="google.com">Log in</a></p>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}

export const Login = () => {
    return (
        <div>

        </div>
    )
}