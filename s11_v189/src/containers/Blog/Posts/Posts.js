import React, {Component} from 'react';
import axios from '../../../axios';
import Post from '../../../components/Post/Post';
import './Posts.css';
import {Link, Route} from 'react-router-dom';
import FullPost from '../FullPost/FullPost';

class Posts extends Component {
  state = {
    posts: [],
    error: false,
  }

  componentDidMount() {
    console.log(this.props); //to see props added by <Route...>: history, location, match
    axios.get('/posts') //=== AJAX GET 'https://jsonplaceholder.typicode.com/posts'
      .then(response => {
          const posts = response.data.slice(0, 4);
          const updatedPosts = posts.map(post => ({...post, author: 'Max'}));
          this.setState({posts: updatedPosts});
          //console.log(response);
      })
      .catch(error => {
          console.log(error);
          this.setState({error: true});
      })
  }

  postSelectedHandler = (id) => {
    this.props.history.push('/posts/' + id); ///===.push({pathname: '/posts/' + id}) //programmaticaly navigating (change url)
  };

  render() {
    let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
    if (!this.state.error) {
        posts = this.state.posts.map(post => {
            return (
              //<Link to={"/posts/" + post.id} key={post.id}>
                <Post 
                  key={post.id}
                  title={post.title} 
                  author={post.author} 
                  clicked={()=>{this.postSelectedHandler(post.id)}} 
                />
              //</Link>
            );
        });
    }
    return (
      <div>
        <section className="Posts">
          {posts}
        </section>
        <Route path={this.props.match.url + '/:id'} exact component={FullPost} /> {/*in FullPost 'id' will be accesible in props.match.params.id*/}
      </div>

    );
  }
}

export default Posts;