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
                action="http://lelooska.pugetsound.edu/phpApp/getAccessCode.php"
                method="post"
                onSubmit={(event) => handleSumbit(event)}
            >
                <label htmlFor="id">Token: </label>
                <br />
                <button type="submit">Retrieve Token</button>
            </form>
            <h1>{result}</h1>
            <h1>{length}</h1>


            
           


        </div>
    );
}

export default AccessDataBase;