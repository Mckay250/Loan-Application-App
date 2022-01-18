import React, { useContext, useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { loanAppContext } from '../StepContext';

const FirstStep = () => {
    const { setCurrentStep, userData, setUserData } = useContext(loanAppContext);
    const [fullnameError, setFullNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);

    const handleNext = (e) => {
        console.log('userdata', userData);
        e.preventDefault();
        setFullNameError(false);
        setEmailError(false);
        setPhoneError(false);

        if (!isValidEmail()) {
            setEmailError(true);
        }
        if (!isValidFullName()) {
            setFullNameError(true);
        }
        if (!isValidphoneNumber()) {
            setPhoneError(true);
        }

        if (isValidEmail() && isValidFullName() && isValidphoneNumber()) {
            setCurrentStep(2);
        }
        
    }

    function isValidFullName() {
        let fullName = userData['fullname'];
        if (!fullName || fullName.trim() === '') {
            return false;
        }
        return true;
    }

    function isValidEmail() {
        let email = userData['email'];
        if (!email || email.trim() === '') {
            return false;
        }
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
    }

    function isValidphoneNumber() {
        let phonenumber = userData['phonenumber'];
        if (!phonenumber || phonenumber.trim() === '' || phonenumber.length < 5) {
            return false;
        }
        return true;
    }


    return (
        <div>
            <form noValidate onSubmit={handleNext}>
                <div>
                    <TextField 
                        value={userData['fullname']} 
                        onChange={(e) => setUserData({...userData, 'fullname': e.target.value})} 
                        label="Full name" 
                        margin='normal'
                        type="fullname"
                        variant='outlined'
                        required
                        error={fullnameError}
                        helperText={fullnameError ? 'Fullname is required' : ' '}
                        color='primary'/>
                </div>
                <div>
                    <TextField
                        value={userData['email']} 
                        onChange={(e) => setUserData({...userData, 'email': e.target.value})}
                        label="Email" 
                        margin='normal'
                        type='email'
                        variant='outlined'
                        required
                        error={emailError}
                        helperText={emailError ? 'Enter a valid email' : ' '}
                        color='primary'/>
                </div>
                <div>
                    <TextField
                        value={userData['phonenumber']} 
                        onChange={(e) => setUserData({...userData, 'phonenumber': e.target.value})} 
                        label="Phone number" 
                        margin='normal' 
                        variant='outlined'
                        required
                        error={phoneError}
                        helperText={phoneError ? 'Enter a valid phone number' : ' '}
                        color='primary'/>
                </div>
                <div>
                    <Button type="submit" variant='contained' color='primary'>Next</Button>
                </div>
            </form>
        </div>
    )
}

export default FirstStep