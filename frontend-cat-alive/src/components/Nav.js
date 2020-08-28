import React, { Component } from 'react';
import { render } from "react-dom";
import { TransitionMotion, spring } from "react-motion";
import "./Nav.css";

export default class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      label: ''
    };
  }

  changeValue(event) {
    const value = event.target.value;
    this.setState({ value, error: "" });
  }

  handleKeyPress(event) {
    if (event.which === 13) {
      this.setState({ value: this.props.predicted });
    }
  }

  setLocation = (e) => { this.setState({location: e.target.value})}
  handleSubmit = (e) => {
      e.preventDefault()
      let form = e.currentTarget
      this.props.search(this.state.location)
      form.reset()
  }

  render() {
    const { active, value, error, label } = this.state;
    const { predicted, locked } = this.props;
    const fieldClassName = `field ${(locked ? active : active || value) &&
      "active"} ${locked && !active && "locked"}`;

    return (
      <div className={fieldClassName}>
            <form onSubmit={this.handleSubmit}>
                <input name='zip' placeholder='Enter City, State or ZIP' id={1} type="text" onChange={this.setLocation} onKeyPress={this.handleKeyPress.bind(this)}/>
                <input type="submit" name="submit" value="Search Cats!"/>
            </form>
      </div>
    );
  }
}