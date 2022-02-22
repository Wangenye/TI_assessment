import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { listAllUsers } from '../action/usersActions'
import { Card, Alert,Button, Container, Row, Col, Spinner } from 'react-bootstrap';

function UserListAll() {

    const dispatch = useDispatch()
    let history = useNavigate();

    const userList = useSelector((state) => state.userList)
    const { loading, error, users } = userList

    useEffect(() => {
        dispatch(listAllUsers())
    }, [dispatch])

    const handleClick = (id) => {
        history(`/user/${id}`)
    }

    return (
        <Container>

            {loading ? (
                <Spinner animation="border" variant="success" />
            ) : error ? (<Alert variant='danger'>
                {error}
            </Alert>) : (
                <Container>
                    <Row>
                        {users.map((user) => (
                            <Col xs={4} gap={2} key={user.id} >
                                <Card style={{ width: '18rem', margin: '10px', padding: '10px' }} key={user.id}>
                                    <Card.Body>
                                        <Card.Title>{user.name}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{user.occupation}</Card.Subtitle>
                                        <Card.Text>
                                            {user.bio}
                                        </Card.Text>
                                        {/* href={`/user/${user.id}?id=${user.id}`} */}

                                        <Card.Link onClick={() => handleClick(user.id)} >
                                            <Button variant="outline-info">More Info</Button>{' '}
                                        </Card.Link>
                                    </Card.Body>
                                </Card>
                            </Col>

                        ))}
                    </Row>
                </Container>
            )}


        </Container>
    )
}

export default UserListAll