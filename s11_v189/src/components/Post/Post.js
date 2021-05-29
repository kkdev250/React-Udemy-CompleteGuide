import React from 'react';
import {withRouter} from 'react-router-dom';

import './Post.css';

const post = (props) => {
    console.log(props);
    return (
        <article className="Post" onClick={props.clicked}>
            <h1>{props.title}</h1>
            <div className="Info">
                <div className="Author">{props.author}</div>
            </div>
        </article>
    );
};


export default withRouter(post); 

//ten komponent nie jest renderowany przez komponent <Route> - więc w propsach nie ma history, location, match
//ale po użyciu withRouter - propsy tego komponentu wzbogacają się o history, location i match