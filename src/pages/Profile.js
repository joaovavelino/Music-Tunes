import React, { Component } from 'react';
import Header from '../components/Header';

class Profile extends Component {
  render() {
    return (
      <div data-testid="page-profile">
        <p>Profile</p>
        <Header />
        <p>Work in progress</p>
      </div>
    );
  }
}

export default Profile;
