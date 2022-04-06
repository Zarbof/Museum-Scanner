import React from 'react';
import { Accordion, Image, Card, Button } from 'react-bootstrap'

export default function PlantBookApp() {
  return(
    <div>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Plant #1</Accordion.Header>
          <Accordion.Body>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/What-Are-Plants.jpg" />
            <Card.Body>
              <Card.Title>Plant Name</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>

          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/What-Are-Plants.jpg" />
            <Card.Body>
              <Card.Title>Plant Name</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
          </Accordion.Body>
        </Accordion.Item>

      </Accordion>
    </div>
  );
}