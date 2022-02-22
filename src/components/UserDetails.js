import React, { useEffect, useState } from 'react'
import { Card, Container, Row, Alert, Col, Form, Button, FloatingLabel, Spinner } from 'react-bootstrap';
import { useMatch } from 'react-router-dom';
import axios from 'axios'

function UserDetails() {

  

  const {
    params: { id },
  } = useMatch('/user/:id');

  const [loading, setLoading] = useState(true);
  const [user, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get(`https://ti-react-test.herokuapp.com/users/${id}`);
        setData(response);
       

      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    }

    fetchData();
  }, [id]);

  const [email, setEmail] = useState('')
  const [name, setName] = useState()
  const [occupation, setOccupation] = useState()
  const [bio, setBio] = useState()


  const patchHandler = (e) => {
    e.preventDefault()
    try {
      axios.patch(`https://ti-react-test.herokuapp.com/users/${id}`, { email, name, occupation, bio }
      ).then((res) => {
        setEmail(res.email)
        setName(res.name)
        setOccupation(res.occupation)
        setBio(res.bio)
        function refreshPage() {
          window.alert("Successfully Updated !!")
          window.location.reload(false);
        }
        refreshPage()
      })
    } catch (error) {
      setLoading(false)
      const errMsg = error
      console.log(errMsg)
    }
  }





  return (
    <div >
      <Container style={{ marginTop: '18rem', margin: "20px" }}>
        {loading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <Row>
            <Col xs={6}>
              <Card style={{ width: '18rem', margin: "20px" }}>
                <Card.Body>
                  <Card.Title>{user.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{user.occupation}</Card.Subtitle>
                  <Card.Text>
                    {user.bio}
                  </Card.Text>
                  <Card.Text>
                    {user.email}
                  </Card.Text>

                </Card.Body>
              </Card>
            </Col>
            <Col xs={6}>
              <Alert variant="dark">Change User Info !</Alert>

              <Form onSubmit={patchHandler}>

                <Form.Group controlId='email'>
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='Enter email'
                    defaultValue={user.email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="name">
                  <Form.Label >Name</Form.Label>
                  <Form.Control defaultValue={user.name} placeholder="Enter Name ..." type="text" onChange={(e) => setName(e.target.value)} />


                </Form.Group>

                <Form.Group className="mb-3" controlId="occupation">
                  <Form.Label >Occupation</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={user.occupation}
                    name="occupation"
                    placeholder="Enter Occupation ..."
                    onChange={(e) => setOccupation(e.target.value)}
                  />


                </Form.Group>

                <FloatingLabel controlId="bio" label="Bio">
                  <Form.Control
                    as="textarea"

                    style={{ height: '100px' }}
                    placeholder="Enter Bio ..."
                    defaultValue={user.bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                </FloatingLabel>
                <br />

                <Button onClick={patchHandler} variant="primary" type="submit">
                  Update
                </Button>
              </Form>
            </Col>
          </Row>
        )}

      </Container>
    </div>
  )
}

export default UserDetails