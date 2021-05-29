import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import './NewPost.css';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Max',
        submited: false,
    }

    componentDidMount() {
        //if user is not auth. => this.props.history.replace('/props')
        console.log('[NewPost]-componentDidMount')
        console.log(this.props); //to see props added by <Route...>: history, location, match
        console.log('query params: ' + this.props.location.search);
        console.log('hash: ' + this.props.location.hash);
    }

    postDataHandler = () => {
        const post = {
            title: this.state.title,
            body: this.state.content,
            author: this.state.author,
        }
        axios.post('/posts', post)
            .then(response => {
                console.log(response);
                //this.props.history.push('/posts'); //push - go to new page, you can go back with back button in browser
                this.props.history.replace('/posts') //replace - in contrary to 'push' is like redirect
                //this.setState({submited: true});
            });
    };

    render () {
        let redirect = null;
        if (this.state.submited) {
            redirect = <Redirect to="/posts" />
        }
        return (
            <div className="NewPost">
                {redirect}
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="Max">Max</option>
                    <option value="Manu">Manu</option>
                </select>
                <button onClick={this.postDataHandler}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;