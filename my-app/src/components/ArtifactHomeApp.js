import React from 'react';
import { Card , ListGroup, ListGroupItem , Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ArtifactHomeApp() {
  return(
    <div >

      <Card >
        <Card.Body>
          <Card.Title>Lelooska Museum Exploration App!</Card.Title>
          <Card.Text>
            Welcome to the exploration app!
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>
            iPhone users can simply open their phone's camera and hover over QR codes to scan. 
            Android users will need to download a QR scanner app before they can begin.
          </ListGroupItem>
          <ListGroupItem>
            Visitors can navigate to the Museum's plant guidebook through the Navigation Bar.
          </ListGroupItem>
          <ListGroupItem>
            If you wish to visit the Lelooska Foundation's offical website or donate to the Foundation, those links
            can also be found in the Nav Bar.
          </ListGroupItem>
        </ListGroup>
        {/*
        <Card.Body>
          <Button type="submit" onclick="location.href = 'http://lelooska.org';">Login</Button>

          <Card.Link href="http://lelooska.org">Lelooska Foundation Website </Card.Link>
          <Card.Link href="http://lelooska.org/donate">Donate</Card.Link>
        </Card.Body>
        */}
      </Card>
            
      
    </div>
    
  );
}