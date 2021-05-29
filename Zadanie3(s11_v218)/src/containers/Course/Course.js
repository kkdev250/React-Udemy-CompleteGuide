import React, { Component } from 'react';

class Course extends Component {
    state = {
        title: '',
    }
    componentDidMount(){
        this.parseQueryParams();
    }
    componentDidUpdate() {
        this.parseQueryParams();
    }
    parseQueryParams() {
        //console.log(this.props)
        const query = this.props.location.search;
        const queryParams = new URLSearchParams(query);
        const newTitle = queryParams.get('title');
        if (newTitle !== this.state.title) {
            this.setState({title: newTitle});
        }
    }

    render () {
        return (
            <div>
                {/* <h1>{this.props.match.params.title}</h1> */}
                <h1>{this.state.title}</h1>
                <p>You selected the Course with ID: {this.props.match.params.id}</p>
            </div>
        );
    }
}

export default Course;