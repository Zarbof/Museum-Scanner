import { React, useState } from "react";
import $ from "jquery";
const AccessDataBase = (props) => {
    const [id, setName] = useState("");
    const [result, setResult] = useState("");
    const idtest = props.idtest;
    const length = result.length;
    const presplit = result.replace(/[^,.:}'0-9a-zA-Z ]/g, "")
    const split = presplit.split("}");
    const split1 = split[0].split(",");
    // const split2 = split[1].split(",");
    
  

    
    const handleChange = (e) => {
        setName(e.target.value);
    };
  
    const handleSumbit = (e) => {
        e.preventDefault();
        const form = $(e.target);
        $.ajax({
            type: "POST",
            url: form.attr("action"),
            data: form.serialize(),
            success(data) {
                setResult(data);
            },
        });
    };
  
    return (
        <div className="App">
            <form
                action="http://lelooska.pugetsound.edu/phpApp/getData.php"
                method="post"
                onSubmit={(event) => handleSumbit(event)}
            >
                <label htmlFor="id">Artifact ID: </label>
                <input
                    type="text"
                    id="id"
                    name="id"
                    value={id}
                    onChange={(event) => handleChange(event)}
                />
                <br />
                <button type="submit">Submit</button>
            </form>
            <h1>{result}</h1>
            <h1>{length}</h1>
            
            <h1>{split.length-1}</h1>
            <h1>{split[0]}</h1>
            <h1>{split[1]}</h1>
            <h1>{split[2]}</h1>
            <h1>{split[3]}</h1>
            <h1>{split[4]}</h1>
            <h1>{split[5]}</h1>
            <h1>{split[6]}</h1>
            <h1>{split[7]}</h1>
            <h1>{split[8]}</h1>
            {/* <h1>{split2[2]}</h1> */}

            
           


        </div>
    );
}

export default AccessDataBase;