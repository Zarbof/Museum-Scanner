import { Accordion } from 'react-bootstrap'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Component, React, useState, useEffect, useRef } from "react";
import { ReactSession } from 'react-client-session';
import $ from "jquery";
import CardFilePlants from './CardFilePlants';




export default function PlantBookApp(props) {
  const plantType = props.plantType
  const username = ReactSession.get("username");
  var [array, setArray] = useState([]);
  var [tempArrays, setTemp] = useState([]);
  const [id, setName] = useState("5");
  var [cardsArray, addCard] = useState([]);
  const buttonRef = useRef(null);

  useEffect(() => {

    if (id != null) {
      // handleSumbit(id);
      buttonRef.current.click();
      buttonRef.current.click();


    }
  }, [id]);


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

        var test = false;
        if (k == 0) {
          bigArray[k] = arr;
        }
        for (var j = 0; j < bigArray.length; j++) {
          try {
            if (arr[0] == bigArray[j][0]) {
              test = true;
            }
          }
          catch (e) {
            console.log('Error')
          }
        }
        if (!test) {
          bigArray[k] = arr;

        }
        // console.log("bigArray:", bigArray[0][0])
      }

      bigArray.filter(n => n)
      bigArray = bigArray.filter(function (n) { return n; });
      setArray(bigArray);
      console.log("array:", bigArray);

      // console.log("array2:", array[1]);
      var finalArray = [];
      var tempArray = [];
      try {
        for (var m = 0; m < bigArray.length; m++) {
          if (bigArray[m][3] == "plant") {
            tempArray[m] = bigArray[m]; //sets plant name and description into first slot
          }
        }
      }
      catch (e) {
        console.log(e);
      }

      for (var b = 0; b < tempArray.length; b++) {
        for (var c = 0; c < bigArray.length; c++) {
          if (bigArray[c].length > 4) {
            if (bigArray[c][4] == tempArray[b][0]) {
              tempArray[b].push(bigArray[c])
            }
          }
        }
      }
      setTemp(tempArray);

      console.log("finalArray", tempArrays);
      console.log("finalArray length", tempArrays.length);
      console.log("accessTest", tempArrays[0][4]);



      //create a card from each data point
      var mediaUrl = "http://lelooska.pugetsound.edu/phpApp/media/"
      for (var cardNum = 0; cardNum < tempArrays.length; cardNum++) {
      //   // console.log("cardNum", tempArrays[cardNum]);
      //   // let card = <CardFilePlants bigArray = {tempArrays[cardNum]}></CardFilePlants>;
      //   // console.log("CARD",card);
      //   var mediaNames = [];
      //   var mediaDescriptions = [];
      //   var mediaTypes = [];
      //   const str1 = "a";
      //   for (var i = 4; i < tempArrays.length; i++) {
      //       var mediaNumber = tempArrays[i][2];
      //       mediaNames[i - 1] = mediaNumber.split("a")[1];   //set back to pos 0 in assignment
      //       mediaDescriptions[i - 1] = array[i][3];
      //       if (array[i][1] == "photo") { //check if is set to photo and change to img for each element that is a photo
      //           mediaTypes[i - 1] = "img";
      //       }
      //       else {
      //           mediaTypes[i - 1] = array[i][1];
      //       }
      //       if (array[i][1] == "audio") { //check if is set to photo and change to img for each element that is a photo
      //           console.log("audio before", mediaNames[i - 1])
      //           if (!mediaNames[i - 1].endsWith("3")) {
      //               mediaNames[i - 1] = mediaNames[i - 1].concat('', str1)
      //               console.log("we have liftoff")
      //           }
      //           console.log(mediaNames[i - 1].concat('', str1))
      //           console.log("audio after", mediaNames[i - 1])
                

      //       }


      //   }
      //   let card = <Card variant="outlined" style={{ textAlign: "center" }}>
      //     <CardActionArea>
      //       <CardContent>
      //         <Typography gutterBottom variant="h5" component="div">
      //           {tempArrays[0][1]}
      //         </Typography>
      //         <Typography variant="body2" color="text.secondary">
      //           {tempArrays[0][2]}
      //         </Typography>
      //       </CardContent>

      //       <CardMedia
      //         component={mediaTypes[0]}
      //         controls
      //         src={mediaUrl.concat('', mediaNames[0])}
      //       />
      //       <CardContent>
      //         <Typography variant="body2" color="text.secondary">
      //           {mediaDescriptions[0]}
      //         </Typography>
      //       </CardContent>

      //       <CardMedia
      //         component={mediaTypes[1]}
      //         controls
      //         src={mediaUrl.concat('', mediaNames[1])}
      //       />
      //       <CardContent>
      //         <Typography variant="body2" color="text.secondary">
      //           {mediaDescriptions[1]}
      //         </Typography>
      //       </CardContent>
      //       <CardMedia
      //         component={mediaTypes[2]}
      //         controls
      //         src={mediaUrl.concat('', mediaNames[2])}
      //       />
      //       <CardContent>
      //         <Typography variant="body2" color="text.secondary">
      //           {mediaDescriptions[2]}
      //         </Typography>
      //       </CardContent>
      //       <CardMedia
      //         component={mediaTypes[3]}
      //         controls
      //         src={mediaUrl.concat('', mediaNames[3])}
      //       />
      //       <CardContent>
      //         <Typography variant="body2" color="text.secondary">
      //           {mediaDescriptions[3]}
      //         </Typography>
      //       </CardContent>
      //       <CardMedia
      //         component={mediaTypes[4]}
      //         controls
      //         src={mediaUrl.concat('', mediaNames[4])}
      //       />
      //       <CardContent>
      //         <Typography variant="body2" color="text.secondary">
      //           {mediaDescriptions[4]}
      //         </Typography>
      //       </CardContent>
      //     </CardActionArea>
      //   </Card>

      // addCard(card);
      }


    }
  }, [result]);




  console.log("cardsArray", cardsArray)
  var rows = [];

  for (var i = 0; i < tempArrays.length; i++) {
    rows.push(<Accordion.Item eventKey={i} key={i}>
      <Accordion.Header>{tempArrays[i][1]}</Accordion.Header>
      <Accordion.Body>
        {cardsArray}
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
        <button type="submit" ref={buttonRef}>Submit</button>
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