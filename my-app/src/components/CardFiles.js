import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';




//artifact info
// array[0][0] = entryID
// array[0][1] = entryName
// array[0][2] = entryDescription
//media files
// array[1][0] = mediaID
// array[1][1] = mediaType
// array[1][2] = location
// array[1][3] = description
// array[1][4] = entryID 
const CardFiles = (props) => {


    const title = props.title;
    const description = props.description;
    const imagesrc = props.imagesrc;
    var array = props.bigArray;
    var cardArray = [];
    console.log(array);
    console.log(array);
    var mediaUrl = "http://lelooska.pugetsound.edu/phpApp/media/"
    if (array[1] != null) {
        // var mediaNumber = array[1][2];
        var mediaNames = [];
        var mediaDescriptions = [];
        var mediaTypes = [];
        const str1 = "a";
        for (var i = 1; i < array.length; i++) {
            var mediaNumber = array[i][2];
            mediaNames[i - 1] = mediaNumber.split("a")[1];   //set back to pos 0 in assignment
            mediaDescriptions[i - 1] = array[i][3];
            if (array[i][1] == "photo") { //check if is set to photo and change to img for each element that is a photo
                mediaTypes[i - 1] = "img";
            }
            else {
                mediaTypes[i - 1] = array[i][1];
            }
            if (array[i][1] == "audio") { //check if is set to photo and change to img for each element that is a photo
                console.log("audio before", mediaNames[i - 1])
                if (!mediaNames[i - 1].endsWith("3")) {
                    mediaNames[i - 1] = mediaNames[i - 1].concat('', str1)
                    console.log("we have liftoff")
                }
                console.log(mediaNames[i - 1].concat('', str1))
                console.log("audio after", mediaNames[i - 1])
                

            }


        }
        console.log("media type audi", mediaTypes[1]);




        // console.log("string location name", mediaNumber);
        // console.log("string name", media2[1]);
        // console.log(mediaUrl.concat('',media2[1]));
        // console.log("url new name", mediaUrl);
        // console.log("lengthy boi",array.length);
        // console.log("media type: ",array[1][1])

        console.log(array[0][2])





        return (

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'stretch', height: '100%'}}>
                <Card sx={{ maxWidth: 345 }} variant="outlined" style={{textAlign: "center"}}>
                    <CardActionArea>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {array[0][1]}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {array[0][2]}
                            </Typography>
                        </CardContent>

                        <CardMedia
                            component={mediaTypes[0]}
                            controls
                            src={mediaUrl.concat('', mediaNames[0])}
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                {mediaDescriptions[0]}
                            </Typography>
                        </CardContent>

                        <CardMedia
                            component={mediaTypes[1]}
                            controls
                            src={mediaUrl.concat('', mediaNames[1])}
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                {mediaDescriptions[1]}
                            </Typography>
                        </CardContent>
                        <CardMedia
                            component={mediaTypes[2]}
                            controls
                            src={mediaUrl.concat('', mediaNames[2])}
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                {mediaDescriptions[2]}
                            </Typography>
                        </CardContent>
                        <CardMedia
                            component={mediaTypes[3]}
                            controls
                            src={mediaUrl.concat('', mediaNames[3])}
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                {mediaDescriptions[3]}
                            </Typography>
                        </CardContent>
                        <CardMedia
                            component={mediaTypes[4]}
                            controls
                            src={mediaUrl.concat('', mediaNames[4])}
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                {mediaDescriptions[4]}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>




            </div>
        );
    }

    return (
        <div>Fatal Error: Invalid Code</div>
    );
};

export default CardFiles;