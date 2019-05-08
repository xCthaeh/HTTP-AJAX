import React from "react";
import axios from "axios";

export default class Friends extends React.Component {
  constructor() {
    super();
    this.state = {
      friends: []
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:5000/friends")
      .then(res => {
        this.setState({
          friends: res.data
        });
      })
      .catch(err => console.log(err));
  }
  submit(e) {
    e.preventDefault();
    console.log(e);
  }
  render() {
    return (
      <>
        <div className="people-container">
          {this.state.friends &&
            this.state.friends.map(e => {
              return (
                <div key={e.id} className="people">
                  <div>
                    {e.name}, {e.age}, {e.email}
                  </div>
                </div>
              );
            })}
        </div>
        <>
          {!this.state.update && (
            <form action="submit">
              <input
                type="text"
                onChange={this.name}
                value={this.state.name}
                placeholder="Name"
              />
              <input
                type="number"
                onChange={this.age}
                value={this.state.age}
                placeholder="Age"
              />
              <input
                type="email"
                onChange={this.email}
                value={this.state.email}
                placeholder="Email"
              />
              <button onClick={this.submit} onSubmit={this.submit}>
                Submit
              </button>
            </form>
          )}
          {this.state.update && (
            <div>
              <h2>Update</h2>
              <form action="submit">
                <input
                  type="text"
                  onChange={this.name}
                  value={this.state.name}
                  placeholder="Name"
                />
                <input
                  type="number"
                  onChange={this.age}
                  value={this.state.age}
                  placeholder="Age"
                />
                <input
                  type="email"
                  onChange={this.email}
                  value={this.state.email}
                  placeholder="Email"
                />
                <button onClick={this.update} onSubmit={this.update}>
                  Update
                </button>
              </form>
            </div>
          )}
        </>
      </>
    );
  }
}
