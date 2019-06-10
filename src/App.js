import React from 'react';
import axios from 'axios';
import './App.css';

const CardList = (props) => {
  return(
    <div>
      {props.profiles.map(profile => <Card key = {profile.id} {...profile} /> )}
    </div>
  );
};

class Card extends React.Component {
  render() {
    const profile = this.props;
    return (
      <div className = "github-profile">
        <img src = { profile.avatar_url } alt = ""/>
        <div className = "info">
          <div className = "name"> { profile.name } </div>
          <div className = "company"> { profile.company } </div>
        </div>
      </div>
    );
  }
}

class Form extends React.Component {
  userNameInput = React.createRef();
  handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.get(`https://api.github.com/users/${this.userNameInput.current.value}`);
    this.props.onSubmit(response.data);
    this.userNameInput.current.value = '';
  }
  render() { 
    return (
      <form className = "form" onSubmit = {this.handleSubmit}>
          <input 
            type = "text" 
            placeholder = "Github Username"  
            ref = {this.userNameInput } 
            required />
          <button>Add Card</button>
      </form>
    );
  }
}

class App extends React.Component {
  state = {
    profiles: [],
  };
  addNewProfile = (profileData) => {
    this.setState(prevState => ({
      profiles:  [...prevState.profiles, profileData],
    }))
  };

  render() {
    return (
      <div>
        <div className = "header">{ this.props.title }</div>
        <Form onSubmit = {this.addNewProfile}/>
        <CardList profiles = {this.state.profiles}/>
      </div>
    );
  }
}

export default App;