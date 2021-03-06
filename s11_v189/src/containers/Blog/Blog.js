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

//<Route path="/" exact render={() => <h1>Home</h1>}/> - wy??wietl tu <h1>Home</h1> je??li jeste??my na '/'
// path="/" - ka??dy url, kt??ry ZACZYNA SI?? od "/"
// path="/" exact - DOK??ADNIE "/"
//<Route path="/" exact render={()=><Posts />} /> === <Route path="/" exact component={Posts} />

//<a  href="/new-post">New Post</a> - normalny anchor <a> powoduje pobranie strony z serwera (wys??anie requestu http) - i prze??adowanie aplikacji, zniszczenie state'a
//<Link to="/new-post">New Post</Link> - ten link nie powoduje pobrania strony z serwera (je??li wywo??any z wewn??trz aplikacji) - zmienia si?? tylko url
//<NavLink to=... exact> - dodaje klas?? .active do aktywnego linku