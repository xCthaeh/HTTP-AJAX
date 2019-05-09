import React from "react";
import "./Friends.css";
import axios from "axios";

export default class Friends extends React.Component {
  constructor() {
    super();
    this.state = {
      friends: [],
      name: "",
      age: null,
      email: "",
      phone: null,
      id: null,
      update: false
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
  submit = e => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/friends", {
        name: this.state.name,
        age: this.state.age,
        email: this.state.email,
        phone: this.state.phone
      })
      .then(res => {
        this.setState({ friends: res.data });
      })
      .catch(err => console.log(err));
  };
  update = e => {
    axios
      .put(`http://localhost:5000/friends/${this.state.id}`, {
        name: this.state.name,
        age: this.state.age,
        email: this.state.email,
        phone: this.state.phone
      })
      .then(res => {
        this.setState({ friends: res.data });
      })
      .catch(err => console.log(err));
    this.setState({ update: false, name: "", age: "", email: "", phone: "" });
  };
  setUpdate = (e, ids) => {
    this.setState({
      update: true,
      id: ids,
      name: "",
      age: "",
      email: "",
      phone: ""
    });
  };
  delete = (e, ids) => {
    this.setState({ id: ids });
    axios
      .delete(`http://localhost:5000/friends/${ids}`)
      .then(res => {
        this.setState({ friends: res.data });
      })
      .catch(err => console.log(err));
  };
  name = e => {
    this.setState({
      name: e.target.value
    });
  };
  age = e => {
    if (typeof e.target.value !== "number") {
      this.setState({
        age: e.target.value
      });
    }
  };
  email = e => {
    this.setState({
      email: e.target.value
    });
  };
  phone = e => {
    if (typeof e.target.value !== "number") {
      this.setState({
        phone: e.target.value
      });
    }
  };
  render() {
    return (
      <>
        <div className="people-container">
          {this.state.friends &&
            this.state.friends.map(e => {
              return (
                <div key={e.id} className="people">
                  <div>
                    {e.name}, {e.age}, {e.email}, {e.phone}
                  </div>
                  <span className="edit" onClick={x => this.setUpdate(x, e.id)}>
                    Edit
                  </span>
                  <span onClick={x => this.delete(x, e.id)}>&times;</span>
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
              <input
                type="number"
                onChange={this.phone}
                value={this.state.phone}
                placeholder="Phone"
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
                <input
                  type="number"
                  onChange={this.phone}
                  value={this.state.phone}
                  placeholder="Phone"
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
