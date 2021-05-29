import React, { Component } from 'react';
import './Blog.css';
import Posts from './Posts/Posts';
import FullPost from './FullPost/FullPost';
import {Route, NavLink, Switch, Redirect} from 'react-router-dom';
import asyncComponent from '../../hoc/asyncComponent';
//import NewPost from './NewPost/NewPost';
const AsyncNewPost = asyncComponent(() => {
    return import('./NewPost/NewPost');
});

class Blog extends Component {
    state = {
        auth: true,
    }

    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink 
                                    to="/posts/" 
                                    exact
                                    activeClassName="my-active"
                                    activeStyle={{
                                        textDecoration: 'underline',
                                    }}
                                >Posts</NavLink> {/*on click change URL to '/'*/}
                            </li>
                            <li><NavLink to={{
                                pathname: '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>New Post</NavLink></li> {/*===baseURL/new-post?quick-submit=true#submit*/}
                        </ul>
                    </nav>
                </header>
                <Switch> {/*use Switch to run only ONE route of following: */}
                    {this.state.auth ? <Route path="/new-post" component={AsyncNewPost} /> : null}
                    <Route path="/posts" component={Posts} /> {/*render here <Post> if url='/'*/}
                    {/*<Route render={()=><h1>404 Not found</h1>} />*/}
                    <Redirect from="/" to ="/posts" /> {/*'from' is allowed only inside <Switch>! */}
                </Switch>
            </div>
        );
    }
}

export default Blog;

//<Route path="/" exact render={() => <h1>Home</h1>}/> - wyświetl tu <h1>Home</h1> jeśli jesteśmy na '/'
// path="/" - każdy url, który ZACZYNA SIĘ od "/"
// path="/" exact - DOKŁADNIE "/"
//<Route path="/" exact render={()=><Posts />} /> === <Route path="/" exact component={Posts} />

//<a  href="/new-post">New Post</a> - normalny anchor <a> powoduje pobranie strony z serwera (wysłanie requestu http) - i przeładowanie aplikacji, zniszczenie state'a
//<Link to="/new-post">New Post</Link> - ten link nie powoduje pobrania strony z serwera (jeśli wywołany z wewnątrz aplikacji) - zmienia się tylko url
//<NavLink to=... exact> - dodaje klasę .active do aktywnego linku