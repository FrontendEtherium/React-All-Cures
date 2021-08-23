import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';

import BrandButton from './styled/BrandButton'
import SlidingForm from './styled/SlidingForm'
import { Checkbox, FormGroup, FormControlLabel, Select, MenuItem , FormControl, InputLabel} from '@material-ui/core'
import { Redirect } from 'react-router';
import { Alert } from 'react-bootstrap';
import { usePasswordValidation } from '../hooks/usePasswordValidation';

const FormSignup = () => {

  const [email, setEmail] = useState("");
  // const [password, setPass] = useState("");
  const [password, setPassword] = useState({
    firstPassword: "",
    secondPassword: "",
   });
  // const [repPass, setrepPass] = useState("");
  const [firstName, setFname] = useState("");
  const [lastName, setLname]= useState("");
  const [userType, setUserType] = useState("");
  const [terms, setTerms] = useState("");
  const [policy, setPolicy] = useState("");
  const [rempwd, setRempwd] = useState("");

  const [message, setMessage] = useState("");
  const [isError, setError] = useState(false);
  const [status, setStatus] = useState("");
  const [buttonClick, setClicked] = useState("");

  const [promo, setPromo] =useState(1)
  const [validEmail, setValidEmail] = useState()

  const [
    validLength,
    hasNumber,
    upperCase,
    lowerCase,
    match,
    specialChar,
] = usePasswordValidation({
firstPassword: password.firstPassword,
secondPassword: password.secondPassword,
});

const setFirst = (event) => {
  setPassword({ ...password, firstPassword: event.target.value });
};
const setSecond = (event) => {
  setPassword({ ...password, secondPassword: event.target.value });
};

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  const SignUpForm = async (e, props) => {
    e.preventDefault();
    setClicked(1);
    var res;
    if(validEmail && upperCase && lowerCase && match){
      
     res = await fetch("/RegistrationActionController?", {
      method: "POST",
      body: `firstname=${firstName}&lastname=${lastName}&email=${email}&psw=${password.firstPassword}&psw-repeat=${password.secondPassword}&rempwd=${rempwd}&doc_patient=${userType}&acceptTnc=${terms}`,
      headers: {
      "Content-Type": "application/x-www-form-urlencoded"
      }
  });
  console.log('props '+props)
  console.log('status '+ res.status)
  console.log('Statusssssssssssssssss ',status)
  res.status === 404 
    ? console.log('Showw Error')
    : console.log('Redirect to page');

  // res.status === 200
  //   ? <Success/>
  //   : <Success/>;

    setStatus(res.status);
    console.log('Statsus res ',res.status)
  const data = await res.text();
  console.log('dataaaaa ', res)
    !data.hasOwnProperty("error")
      ? setMessage( 'success' )
      : setError( true );

  setTimeout( () => console.log('Message ', message ), 1600 );
  setTimeout( () => console.log('Error ', isError ), 1600 );
    } else {
      console.log('not posssiiibbbllleee')
    }
    
  
}
function Error(){
  // setReload(true)
  setTimeout(() => {
    return(
      <div className="alert alert-secondary" role="alert">Email or Password incorrect</div>
    )
  }, 1000);
}

// Redirect and Reload after logging in

function Redirec(){
  if(promo){
    return(
      <Redirect to={{
        pathname: '/article',
        state: { promoCode: '1' }
      }}
      />
    )
  } else {
    setTimeout(() => {
      window.location.reload();
    }, 1000);
    return(
      <Redirect to={{
        pathname: '#'
      }}/>
    ) 
  }
}
  const handleChange = (event) => {
    setUserType(event.target.value);
  };

  const handleEmail = (e) => {
    var re= /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    if(!re.test(e.target.value)){
      setValidEmail(false)
      console.log('Enter valid email')
      // return(
      //   <Alert variant="danger">Please enter valid email</Alert>
      // )
    } else {
      setEmail(e.target.value)
      setValidEmail(true)
      console.log('validEmail')
    }
  }
  const handleTermsCheckbox = (event) => {
    setTerms(event.target.value)
  };

  const handleRemember = (event) => {
    setRempwd(event.target.value)
  }
  const handlePolicyCheckbox = (event) => {
    setPolicy(event.target.value)
  }
  const classes = useStyles();

  console.log(firstName, lastName, password, email, terms, policy, userType)
  return(
    
    <SlidingForm signup className="text-center">
      <h1 id='he2' className="text-center">Create Account</h1>
       <p id='p2'className="text-center">or register with your email</p>
       <form onSubmit={SignUpForm}>
        { 
          buttonClick === 1? 
            status === 200 ? 
              Redirec()
              : Error()
            : console.log('Button not clicked')
        }
        <input 
          placeholder="First Name" 
          type="text" 
          name="firstName"
          onChange={
            e => setFname(e.target.value)
          }
          required
        />
        <input 
          placeholder="Last Name" 
          type="text" 
          name="lastName"
          onChange={
            e => setLname(e.target.value)
          }
          required
        />
        <input 
          placeholder="Email" 
          type="email" 
          name="email"
          onChange={
            e => handleEmail(e)
          }
          required
        />
        {
          !validEmail && buttonClick === 1?
          <Alert variant="danger">Enter Valid Email</Alert>
            : null
        }
        <input 
          placeholder="Password" 
          type="password" 
          name="password"
          onChange={
            e => setFirst(e)
          }
          required
        />
        {
          !validLength && buttonClick ===1?
          <Alert variant="danger">Password should contain at least 8 characters</Alert>
          : null
        }
        {
          !upperCase && buttonClick ===1?
          <Alert variant="danger">Password should contain at least 1 uppercase character</Alert>
          : null
        }
        {
          !lowerCase && buttonClick ===1?
          <Alert variant="danger">Password should contain at least 1 lowercase character</Alert>
          : null
        }
        <input 
          placeholder="Repeat Password" 
          type="password" 
          name="repPass"
          onChange={
            e => setSecond(e)
          }
          autoComplete="off"
          required
        />
        {
          !match && buttonClick === 1?
          <Alert variant="danger">Passwords don't match</Alert>
          : null
        }
        {
          promo?
          <input 
          placeholder="Promo Code" 
          type="text" 
          name="promo_code"
          value= {promo}
          disabled
          />
          : null
        }
        

        <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">User Type</InputLabel>
          <Select 
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={userType}
            onChange={handleChange}
            required
          >
          <MenuItem value="doctor">Doctor</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </Select>
        </FormControl>

          <FormGroup>
            <FormControlLabel
              control={<Checkbox name="Terms" onChange={handleTermsCheckbox} value="on" required/>}
              label="Accept Terms & Conditions"
              required
            />
            <FormControlLabel
              control={<Checkbox name="remember_me" onChange={handleRemember} value="on"/>}
              label="Remember Me"
              required
            />
          </FormGroup>
          <BrandButton id='b2' type="submit">Sign up</BrandButton>

      </form>

    </SlidingForm>
  )
}

export default FormSignup
