import React from "react";
import loginImg from "../../bo.jpg";
import Example from "./Example";




// TODO: Switch to https://github.com/palmerhq/the-platform#stylesheet when it will be stable
const MOCK_SERVICE = 'http://localhost:3004';
const styleLink = document.createElement('link');
styleLink.rel = 'stylesheet';
styleLink.href = 'https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css';
document.head.appendChild(styleLink);

export class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      username: '',
      email:'',
      password: '',
      errors: null
    };
  }
  handleSubmit = e => {
    e.preventDefault();
    const {
      props: { history },
      state: { username, password,email }
    } = this;
    fetch(`${MOCK_SERVICE}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password, email })
    })
      .then(response => response.json())
      .then(data => {
        const { username: name, password: pwd, email: eml } = data;
        if (name === '' || pwd === '' || eml=='') {
          this.setState({ errors: 'Fields cant be left blank' });
        }
        if (name && pwd && eml) {
          this.setState(
            {
              isAuthenticated: true
            },
            history.push('/secLogin')
          );
        }
      })
      .catch(e => {
        this.setState({ errors: e.error, isAuthenticated: false });
      });
  };

  handleChange = (e, data) => {
    if (data) {
      this.setState({
        selectedHospital: data.value
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
  };

  
  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Register</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
          <form onSubmit={this.handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" placeholder="username" onChange={this.handleChange}/>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="text" name="email" placeholder="email" onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="text" name="password" placeholder="password" onChange={this.handleChange} />
            </div>
          
           <Example handleChange={this.handleChange}/>
        
          <button type="button" className="btn" onClick={this.onLoginClick}>
            Register
          </button>
          </form>
        
        </div>
      </div>
    );
  }
}
