import React from 'react';
import { Accordion, Card, CardGroup } from 'react-bootstrap'
import { ReactSession } from 'react-client-session';
import $ from "jquery";




export default function PlantBookApp(props) {
  const plantType = props.plantType
  const username = ReactSession.get("username");

  // Code to grab the data from the database
  $.ajax({
    // Change URL to correct path for plants
    url: 'http://lelooska.pugetsound.edu/phpApp/plantList.php',
    type: "GET",
    success: function(data) {
      console.log('success')
      console.log(data)
      // const myObject = JSON.parse(data);
      // const dailyToken = JSON.stringify(myObject.tokenValue);
      // const dailyTokenString = dailyToken.replaceAll('"', '');

      // const userTokenString = {userToken}.userToken;

      // if(dailyTokenString === userTokenString) {
      //   ReactSession.set("token", dailyTokenString);
      //   setDailyDBToken(dailyTokenString);
      // } 
    }.bind(this),
    error: function(xhr, status, err) {
      console.log('error')
    }.bind(this)
  });

  var rows = [];
  for (var i = 0; i < 5; i++) {
    rows.push(<Accordion.Item eventKey={i} key={i}>
    <Accordion.Header>{username}</Accordion.Header>
    <Accordion.Body>
    <CardGroup>
      <Card>
        <Card.Img variant="top" src="https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/What-Are-Plants.jpg" />
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
            This is a wider card with supporting text below as a natural lead-in to
            additional content. This content is a little bit longer.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>
      <Card>
        <Card.Img variant="top" src="https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/What-Are-Plants.jpg" />
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
            This card has supporting text below as a natural lead-in to additional
            content.{' '}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>
      <Card>
        <Card.Img variant="top" src="https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/What-Are-Plants.jpg" />
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
            This is a wider card with supporting text below as a natural lead-in to
            additional content. This card has even longer content than the first to
            show that equal height action.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>
    </CardGroup>

    </Accordion.Body>
  </Accordion.Item>);
  } 

  return(
    <div>
      <Accordion defaultActiveKey="0">
        {/* <Accordion.Item eventKey="0">
          <Accordion.Header>Plant Type</Accordion.Header>
          <Accordion.Body>
          <CardGroup>
            <Card>
              <Card.Img variant="top" src="https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/What-Are-Plants.jpg" />
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  This is a wider card with supporting text below as a natural lead-in to
                  additional content. This content is a little bit longer.
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>
            </Card>
            <Card>
              <Card.Img variant="top" src="https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/What-Are-Plants.jpg" />
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  This card has supporting text below as a natural lead-in to additional
                  content.{' '}
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>
            </Card>
            <Card>
              <Card.Img variant="top" src="https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/What-Are-Plants.jpg" />
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  This is a wider card with supporting text below as a natural lead-in to
                  additional content. This card has even longer content than the first to
                  show that equal height action.
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>
            </Card>
          </CardGroup>

          </Accordion.Body>
        </Accordion.Item> */}
        { rows }
      </Accordion>
    </div>
  );
}