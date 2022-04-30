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
            Welcome to the exploration app! Now that you have gained access to the app, you are able to scan the QR codes placed around the museum!
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>
            Most modern smart phones have QR scanners built into their phone's camera app!
            If your phone's camera does not have this functionality, downloading a free QR scanner app will be necessary for access to artifact information.
          </ListGroupItem>
          <ListGroupItem>
            Visitors can navigate to the Museum's plant guidebook through the Navigation Bar.
          </ListGroupItem>
          <ListGroupItem>
            If you wish to visit the Lelooska Foundation's offical website or donate to the Foundation, those links
            can also be found in the Nav Bar.
          </ListGroupItem>
        </ListGroup>
        <Card.Body>
          <Card.Link href="http://lelooska.org">Lelooska Foundation Website </Card.Link>
          <Card.Link href="http://lelooska.org/donate">Donate</Card.Link>
        </Card.Body>
      </Card>
            
      
    </div>
    
  );
}