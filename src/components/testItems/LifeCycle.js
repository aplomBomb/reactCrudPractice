import React, { Component } from 'react';

export default class LifeCycle extends Component {
  state = {
    title: '',
    body: ''
  };

  componentDidMount() {
    // the component did mount

    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then(response => response.json())
      .then(data => {
        this.setState({
          title: data.title,
          body: data.body
        });
      });

    console.log(this.componentDidMount.name);
  }

  componentWillMount() {
    // fired when the component is about to mount before componentDidMount
    console.log(this.componentWillMount.name);
  }

  componentDidUpdate() {
    // fired when there is some sort of update to the component
    console.log(this.componentDidUpdate.name);
  }

  componentWillUpdate() {
    // fired when the component is about to update before componentDidUpdate
    console.log(this.componentWillUpdate.name);
  }

  render() {
    const { title, body } = this.state;
    return (
      <div>
        <h1 className="display-4">
          <span className="text-danger">TEST:</span> LifeCycle & HTTP Requests
        </h1>
        <h2>Title: {title}</h2>
        <p>{body}</p>
      </div>
    );
  }
}
