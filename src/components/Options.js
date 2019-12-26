import React from "react";
import Option from "./Option.js";


const Options = (props) => {

    return (
        <div>
            {props.options.length === 0 && <p>Please Enter Text</p>}
            <button onClick={props.handleDeleteOptions}>RemoveAll</button>
            {
                props.options.map(element => (<Option
                    key={element}
                    optionText={element}
                    handleDeleteOption={props.handleDeleteOption}
                />))}

        </div>
    );
}

export default Options;