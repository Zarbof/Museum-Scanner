import React from 'react';
import { Tabs , Tab } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ArtifactHomeApp() {
  return(
    <div>

      <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
        <Tab eventKey="media" title="Media">
          <p>Here is where media will go</p>
        </Tab>
        <Tab eventKey="description" title="Description">
          <p>Here is where description text will go</p>
        </Tab>
      </Tabs>
      
    </div>
    
  );
}