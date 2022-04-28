import { Component, React, useState, useEffect, useRef } from "react";
import $ from "jquery"
import CardFiles from "./CardFiles";
import { Grid } from "@mui/material"
import { useSearchParams } from 'react-router-dom'

const AccessDataBase = (props) => {
    document.body.style = 'background: #a7adba;';
    const [searchParams, setSearchParams] = useSearchParams();
    // const id = searchParams.get('id');
    var idTest = searchParams.get('id');

    const buttonRef = useRef(null);
    const [id, setName] = useState(idTest);
    const [result, setResult] = useState("");
    var [length, setLength] = useState(0);
    const phpUrl = "http://lelooska.pugetsound.edu/phpApp/getData.php?id=";
    

    //const tempStr2 = result[0].split(",");
    var [array, setArray] = useState([]);

    useEffect(() => {

        if (id != null) {
            // handleSumbit(id);
            buttonRef.current.click();

        }
    }, [id]);

    useEffect(() => {
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
                    array[i] = updatedStr;
                }
                bigArray[k] = array;
            }
            setArray(bigArray);
            console.log("initialization test")
            console.log(bigArray[0][0])
        }
    }, [result]);


    //const split2 = split[1].split(",");


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

    var handleString = () => {
        // var bigArray = Array.from(Array(2), () => new Array(4))
        var length = 5;
        var bigArray = [];
        for (var k = 0; k < length - 1; k++) {   //loops through array of all entry blocks    
            var array = [];
            var tempStr = result[k];
            tempStr = result[k].split(","); 
            //tempStr = tempStr.split(",");
            for (var i = 0; i < tempStr.length; i++) {  //loops through each element in array for processing
                var updatedStr = tempStr[i];
                var updatedStr2 = updatedStr.split(":");  
                updatedStr = updatedStr2[1];
                array[i] = updatedStr;
                


            }
            bigArray[k] = array;
        }
        setArray(bigArray);

    }

    const handleChange = (e) => {
        setName(e.target.value);
    };

    const handleSumbit = (e) => {
        e.preventDefault();
        const form = $(e.target);
        $.ajax({
            type: "POST",
            url: form.attr("action"),
            //url: phpUrl,
            data: form.serialize(),
            success(data) {
                const presplit = data.replace(/[^,.:}'0-9a-zA-Z ]/g, "")
                const split = presplit.split("}");
                setResult(split);
                setLength(split.length);
                //handleString();

            },
        });

    };



    if (id != null) {

        return (
            <div className="p-2 flex-shrink-2">
                <form
                    name="form1"
                    action="http://lelooska.pugetsound.edu/phpApp/getData.php"
                    method="post"
                    onSubmit={(event) => handleSumbit(event)}
                >
                    <label htmlFor="id"> </label>
                    <input
                        type="hidden"
                        id="id"
                        name="id"
                        value={id}
                        onChange={(event) => handleChange(event)}
                    />
                    <br />
                    <button id="btnsubmit" ref={buttonRef} type="submit" hidden>Submit</button>
                </form>
                {(() => {
                    if (array.length > 0) {
                        return (
                            <div>
                                {/* <h1>array:{array[0][0]}</h1>
                        <h1>array:{array[0][1]}</h1>
                        <h1>array:{array[0][2]}</h1>
                        <h1>array:{array[1][0]}</h1>
                        <h1>array:{array[1][1]}</h1>
                        <h1>array:{array[1][2]}</h1>
                        <h1>array:{array[1][3]}</h1>
                        <h1>array:{array[1][4]}</h1> */}
                            </div>
                        )
                    }
                })()}



                <br></br>
                <Grid container>
                    <Grid alignItems="stretch"
                        justify="center">
                        <CardFiles bigArray={array}></CardFiles>
                    </Grid>
                </Grid>



            </div>
        );
    }
    else{
        return (
            <div>
                QR error: Please scan a code
            </div>
        )
    }
}

export default AccessDataBase;