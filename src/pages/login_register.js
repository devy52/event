import React, { useState } from 'react';
import './login_register.css';
import Navbar from './navbar';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [token, setToken] = useState('');
  const [isRegularUser, setIsRegularUser] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    userType: 'regular',
  });
  
  // Add a state variable to track login error
  const [loginError, setLoginError] = useState('');

  const navigate = useNavigate(); // Initialize useNavigate

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const toggleUserType = () => {
    setIsRegularUser(!isRegularUser);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userType = isRegularUser ? 'regular' : 'admin'; // Determine user type
      const url = isLogin ? `http://localhost:3000/api/${userType}/login` : 'http://localhost:3000/api/register'; // Use dynamic route based on user type
      const formDataWithUserType = { ...formData, userType };
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataWithUserType),
      });

      const data = await response.json();

      if (response.ok) {
        // Successful login or registration
        console.log(data);
         // Assuming the server responds with a token
      const authToken = data.token;

      // Store the token in the state
      setToken(authToken);
      console.log(authToken);

      // You can also store it in LocalStorage or Cookies for persistence
      localStorage.setItem('authToken', authToken);

        // Redirect to another page after successful login
       // Use the redirectTo property from the server response
        if(userType==="admin"){
          navigate("/admin")
        }
        else{
          if(isLogin){navigate("/user");}
          else{navigate("/")}
        }
      } else {
        // Handle login or registration errors
        console.error(data.error);
        // Set the login error message
        setLoginError('Wrong Credentials');
        setTimeout(() => {
          setLoginError('');
        }, 2000);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="bod">
      <Navbar />
      <div className="wrapper">
        <div className="title-text">
          <div className={`title ${isLogin ? 'login' : 'signup'}`}>
            {isLogin ? 'Sign In' : 'Sign Up'}
          </div>
        </div>
        <div className="form-container">
          {isLogin && (
            <div className="user-type">
              <button
                className={`user-type-button ${isRegularUser ? 'active' : ''}`}
                onClick={() => toggleUserType(true)}
              >
                Regular User
              </button>
              <button
                className={`user-type-button ${!isRegularUser ? 'active' : ''}`}
                onClick={() => toggleUserType(false)}
              >
                Admin
              </button>
            </div>
          )}
          <div className="slide-controls">
            <input type="radio" name="slide" id="login" checked={isLogin} onChange={toggleForm} />
            <input type="radio" name="slide" id="signup" checked={!isLogin} onChange={toggleForm} />
            <label htmlFor="login" className={`slide login ${isLogin ? 'active' : ''}`}>Login</label>
            <label htmlFor="signup" className={`slide signup ${!isLogin ? 'active' : ''}`}>Signup</label>
            <div className="slider-tab"></div>
          </div>
          <div className="form-inner">
            <form onSubmit={handleSubmit} className={isLogin ? 'login' : 'signup'}>
              <div className="field">
                <input
                  type="text"
                  name="username"
                  placeholder="Email Address"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="field">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {isLogin && (
                <div className='btnlab'>
                  <label className='lab1' value={formData.userType}
                  onChange={handleInputChange}>
                    {isRegularUser ? 'Regular User' : 'Admin'}
                  </label>
                </div>
              )}
              {/* Display the login error */}
              {loginError && (
                <div className="error-label">{loginError}</div>
              )}
              <div className="field btn">
                <div className="btn-layer"></div>
                <input type="submit" value={isLogin ? 'Login' : 'Signup'} />
              </div>
              {isLogin ? (
                <div className="signup-link">Not a member? <a href="#" onClick={toggleForm}>Signup now</a></div>
              ) : (
                <div className="signup-link">Already a member? <a href="#" onClick={toggleForm}>Login now</a></div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
