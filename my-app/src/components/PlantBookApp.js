import { Accordion, Card, CardGroup } from 'react-bootstrap'
import { Component, React, useState, useEffect, useRef } from "react";
import { ReactSession } from 'react-client-session';
import $ from "jquery";




export default function PlantBookApp(props) {
  const plantType = props.plantType
  const username = ReactSession.get("username");
  var [array, setArray] = useState([]);
  var [result, setResult] = useState("");


  const handleSumbit = (e) => {
    e.preventDefault();
    const form = $(e.target);
    $.ajax({
      type: "POST",
      url: form.attr("action"),
      data: form.serialize(),
      success(data) {
        console.log("------ test ------")
        // const myObject = JSON.parse(data);
        // console.log(myObject.name);
        console.log("data:", data);
        const presplit = data.replace(/[^,.:}'0-9a-zA-Z ]/g, "")
        const split = presplit.split("}");
        console.log("new data:", split);

        setResult(split);

      },
    });
  };

  useEffect(() => {
    console.log("result length:", result.length)
    console.log("result 0:", result[0])
    console.log("result 1:", result[1])
    console.log("result 2:", result[2])
    console.log("result 3:", result[3])
    console.log("result 4:", result[4])
    console.log("result 5:", result[5])

    if (result.length > 0) {
      // var bigArray = Array.from(Array(2), () => new Array(4))
      var lengths = 5;
      var bigArray = [];

      for (var k = 0; k < result.length - 1; k++) {   //loops through array of all entry blocks

        var array = [];
        var tempStr = result[k];
        tempStr = result[k].split(",");

        //tempStr = tempStr.split(",");
        for (var i = 0; i < tempStr.length; i++) {  //loops through each element in array for processing
          var updatedStr = tempStr[i];
          var updatedStr2 = updatedStr.split(":");
          updatedStr = updatedStr2[1];
          if (updatedStr != null) {
            array[i] = updatedStr;

          }
          //console.log("updatedStr", {updatedStr2});

        }
        array.filter(n => n)
        var arr = array.filter(function (n) { return n; });
          bigArray[k] = arr;

      }
      let uniqueChars = bigArray.filter((element, index) => {
        return bigArray.indexOf(element) === index;
    });
      uniqueChars();
      setArray(bigArray);
      console.log("array:", bigArray);
      // console.log("array2:", array[1]);



    }
  }, [result]);





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

  return (
    <div>
      <form
        action="http://lelooska.pugetsound.edu/phpApp/getPlantData.php"
        method="post"
        onSubmit={(event) => handleSumbit(event)}
      >
        <button type="submit">Submit</button>
      </form>


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
        {rows}
      </Accordion>
    </div>
  );
}