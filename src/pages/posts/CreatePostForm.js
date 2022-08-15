import React from "react";
import { Container, Form, Button, Col, Row } from "react-bootstrap";

function CreatePostForm() {
    return (
        <Container>
            <Form>
                <Form.Group controlId="">
                    <Form.Label></Form.Label>
                    <Form.Control type="" placeholder="" />
                </Form.Group>

                <Form.Group controlId="">
                    <Form.Label></Form.Label>
                    <Form.Control type="" placeholder="" />
                </Form.Group>

                <Form.Group controlId="">
                    <Form.Label></Form.Label>
                    <Form.Control type="" placeholder="" />
                </Form.Group>

                <Form.Group controlId="">
                    <Form.Label></Form.Label>
                    <Form.Control type="" placeholder="" />
                </Form.Group>

                <Row>
                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label></Form.Label>
                        <Form.Control as="select" defaultValue="Choose...">
                            <option>Choose...</option>
                            <option>...</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label></Form.Label>
                        <Form.Control as="select" defaultValue="Choose...">
                            <option>Choose...</option>
                            <option>...</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label></Form.Label>
                        <Form.Control as="select" defaultValue="Choose...">
                            <option>Choose...</option>
                            <option>...</option>
                        </Form.Control>
                    </Form.Group>
                </Row>

                <Form.Group controlId="">
                    <Form.Label></Form.Label>
                    <Form.Control type="" placeholder="" />
                    <Form.File />
                </Form.Group>
                
                <Row>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    
                    <Button variant="primary" type="submit">
                        Cancel
                    </Button>
                </Row>
            </Form>
        </Container>
    )
};

export default CreatePostForm;