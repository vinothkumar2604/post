import React, { Component } from 'react';
import axios from 'axios';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      
      surName: '', 
      userTypeCode: '', 
      email: '',
      mobileNo: '',
      password: '1', 
      error: null,
      successMessage: null,
    };
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      error: null,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const { surName, userTypeCode, email, mobileNo, password } = this.state;
    try {
      const response = await axios.post(
        'http://206.72.202.106:8000/retrexapi/public/user/onboardingPersonal',
        {
          surName,
          userTypeCode,
          email,
          mobileNo,
          password,
        }
      );

      if (response.data.success) {
        this.setState({ successMessage: 'Signup successful' });
      } else {
        this.setState({ error: response.data.message || 'Signup failed' });
      }
    } catch (error) {
      console.error('Error:', error);
      this.setState({ error: 'An error occurred during signup' });
    }
  };

  render() {
    return (
      <div>
        <h1>Signup</h1>
        <form onSubmit={this.handleSubmit}>
          
          <div>
            <label>Surname:</label>
            <input
              type="text"
              name="surName"
              value={this.state.surName}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>User Type Code:</label>
            <input
              type="text"
              name="userTypeCode"
              value={this.state.userTypeCode}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Mobile Number:</label>
            <input
              type="text"
              name="mobileNo"
              value={this.state.mobileNo}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
        {this.state.successMessage && <p>{this.state.successMessage}</p>}
        {this.state.error && <p>{this.state.error}</p>}
      </div>
    );
  }
}

export default Signup;