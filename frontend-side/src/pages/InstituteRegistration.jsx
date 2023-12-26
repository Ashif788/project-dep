import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';
import './registration.css';

function InstituteRegistration() {
  const { RIId } = useParams();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    instituteid: '',
    institutename: '',
    instituteaddress: '',
    username: '',
    lastname: '',
    email: '',
    number: '',
    password1: '',
    password2: '',
  });

  const [errorData, setErrorData] = useState({
    instituteid: '',
    institutename: '',
    instituteaddress: '',
    username: '',
    lastname: '',
    email: '',
    number: '',
    password1: '',
    password2: '',
  });

  const [loginError, setLoginError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newError = {};

    if (step === 1) {
      if (!formData.instituteid) {
        newError.instituteid = '*Institute-Id is Required*';
      }
      if (!formData.institutename) {
        newError.institutename = '*Institute-Name is Required*';
      }
      if (!formData.instituteaddress) {
        newError.instituteaddress = '*Institute-Address is Required*';
      }
    } else if (step === 2) {
      if (!formData.username) {
        newError.username = '*Username is Required*';
      }
      if (!formData.lastname) {
        newError.lastname = '*Lastname is Required*';
      }
      if (!formData.email) {
        newError.email = '*Email is Required*';
      }
      if (!formData.number) {
        newError.number = '*Phone-Number is Required*';
      }
    } else if (step === 3) {
      if (!formData.password1 || !formData.password2) {
        newError.password1 = '*Password cannot be empty*';
        newError.password2 = '*Password cannot be empty*';
      } else if (formData.password1.length < 8 || formData.password2.length < 8) {
        newError.password1 = '*Password should contain 8 characters*';
        newError.password2 = '*Password should contain 8 characters*';
      } else if (formData.password1 !== formData.password2) {
        newError.password1 = '*Passwords should match*';
        newError.password2 = '*Passwords should match*';
      }
    }

    setErrorData(newError);

    if (Object.keys(newError).length === 0) {
     

if (step === 1) {
  console.log(formData.instituteid)
  Axios.get(`http://localhost:3003/api/checkInstitute?Iid=${formData.instituteid}`)
  .then(result => {
    console.log(result.data.data)
    if(result.data.data.length>0){
      alert("institute already exist")
    }
    else{
      setStep(step+1)
    }
  })
  .catch(error => {
    console.error(error);
    alert("Error");
  });


  
} else 
if (step === 2) {
  console.log(formData.instituteid)
  Axios.get(`http://localhost:3003/api/checkphonenumber?number=${formData.number}&email=${formData.email}`)
  .then(result => {
    console.log(result.data.data);
    if(result.data.data.length > 0){
      alert("Phone number or email already in use");
    } else {
      setStep(step + 1);
    }
  })
  .catch(error => {
    console.error(error);
    alert("Error");
  });



  
} else 
if (step === 3) {
  Axios.post(`http://localhost:3003/api/registration/`, {
    iid: formData.instituteid,
    iname: formData.institutename,
    iaddress: formData.instituteaddress,
    fname: formData.username,
    lname: formData.lastname,
    email: formData.email,
    pnumber: formData.number,
    password: formData.password1,
  })
    .then((response) => {
      
        navigate('/');  // Use backticks for template literal
      
    })
    .catch((error) => {
      alert("server not found")
    });
      }
    }
  };

  return (
    <div className="wrapper">
      <div className="login-box">
        <form onSubmit={handleSubmit}>
          <p className="lerror">{loginError}</p>
          {step === 1 && (
            <>
              <h3>Institute Registration</h3>
              <div className="input-box">
                <input
                  type="text"
                  name="instituteid"
                  placeholder="Institute-Id"
                  value={formData.instituteid}
                  onChange={handleInputChange}
                />
                <br />
                <p className="error">{errorData.instituteid}</p>
              </div>
              <div className="input-box">
                <input
                  type="text"
                  name="institutename"
                  placeholder="Institute-Name"
                  value={formData.institutename}
                  onChange={handleInputChange}
                />
                <br />
                <p className="error">{errorData.institutename}</p>
              </div>
              <div className="input-box">
                <input
                  type="text"
                  name="instituteaddress"
                  placeholder="Institute-Address"
                  value={formData.instituteaddress}
                  onChange={handleInputChange}
                />
                <br />
                <p className="error">{errorData.instituteaddress}</p>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h3>User Registration</h3>
              <div className="input-box">
                <input
                  type="text"
                  name="username"
                  placeholder="Firstname"
                  value={formData.username}
                  onChange={handleInputChange}
                />
                <br />
                <p className="error">{errorData.username}</p>
              </div>
              <div className="input-box">
                <input
                  type="text"
                  name="lastname"
                  placeholder="Lastname"
                  value={formData.lastname}
                  onChange={handleInputChange}
                />
                <br />
                <p className="error">{errorData.lastname}</p>
              </div>
              <div className="input-box">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <br />
                <p className="error">{errorData.email}</p>
              </div>
              <div className="input-box">
                <input
                  type="number"
                  name="number"
                  placeholder="Phone-Number"
                  value={formData.number}
                  onChange={handleInputChange}
                />
                <br />
                <p className="error">{errorData.number}</p>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h3>Create Password</h3>
              <div className="input-box">
                <input
                  type="password"
                  name="password1"
                  placeholder="Create-Password"
                  value={formData.password1}
                  onChange={handleInputChange}
                />
                <br />
                <p className="error">{errorData.password1}</p>
              </div>
              <div className="input-box">
                <input
                  type="password"
                  name="password2"
                  placeholder="Re-Enter-Password"
                  value={formData.password2}
                  onChange={handleInputChange}
                />
                <br />
                <p className="error">{errorData.password2}</p>
              </div>
            </>
          )}

          <button type="submit">Next</button>
        </form>
      </div>
    </div>
  );
}

export default InstituteRegistration;
