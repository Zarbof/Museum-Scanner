import React from 'react';
import { Tabs , Tab , ListGroup , Image } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ArtifactHomeApp() {
  return(
    <div class="text-center">


      <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
        <Tab eventKey="media" title="Media">
          <ListGroup>
          <ListGroup.Item>
          <Image src="https://greatinspire.com/wp-content/uploads/2016/09/The-Beauty-Of-Small-Things-Photography-4.jpg"></Image>
            flowers :)
          </ListGroup.Item>
          <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
          <ListGroup.Item>Morbi leo risus</ListGroup.Item>
          <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
          <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
        </ListGroup>
        </Tab>
        <Tab eventKey="description" title="Description">
          <p>Here is where description text will go</p>
        </Tab>
      </Tabs>
      
    </div>
    
  );
}