import React, { useContext, useState } from 'react'
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import { Button } from '@material-ui/core';
import { loanAppContext } from '../StepContext';
import '../App.css';


const SecondStep = () =>  {
    const { setCurrentStep, userData, setUserData } = useContext(loanAppContext);
    const [revenueError, setRevenueError] = useState(false);

    
    const handleNext = (e) => {
        console.log('userdata', userData);
        e.preventDefault();
        setRevenueError(false);

        if (!isValidRevenue()) {
            setRevenueError(true);
        }

        if (isValidRevenue()) {
            setCurrentStep(3);
        }
        
    }

    function isValidRevenue() {
        let amount = userData['revenue'];
        if (!amount || amount.trim() === '') {
            return false;
        }
        return true;
    }

    return (
        <div>
            <form noValidate onSubmit={handleNext}>
                <div style={{marginBottom: '10rem', display: 'grid'}}>
                    <CurrencyTextField 
                        label="Yearly Revenue"
                        margin='normal'
                        variant="standard"
                        value={userData['revenue']}
                        currencySymbol="$"
                        outputFormat="string"
                        decimalCharacter="."
                        digitalGroupSeperator=","
                        required
                        error={revenueError}
                        helperText={revenueError ? 'Enter a valid amount' : ' '}
                        color='primary'
                        onChange={(event, val) => setUserData({...userData, 'revenue': val})}
                    />
                </div>
                <div>
                    <Button onClick={() => setCurrentStep(1)} variant='contained' color='secondary'>Previous</Button>
                    <Button type="submit" variant='contained' color='primary'>Next</Button>
                </div>
            </form>
        </div>
    );
}

export default SecondStep