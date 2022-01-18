import React, {useContext, useState} from 'react'
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import { Button } from '@material-ui/core';
import { loanAppContext } from '../StepContext';

const ThirdStep = () => {
    const { setCurrentStep, userData, setUserData, submitData } = useContext(loanAppContext);
    
    const [amountRequestedError, setAmountRequestedError] = useState(false);
    
    const handleNext = (e) => {
        console.log('userdata', userData);
        e.preventDefault();
        setAmountRequestedError(false)
        
        if (!isValidAmount()) {
            setAmountRequestedError(true);
        }

        if (isValidAmount()) {
            submitData();
        }

    }

    function isValidAmount() {
        let amount = userData['amountRequested'];
        if (!amount || amount.trim() === '' || amount.length < 2) {
            return false;
        }
        return true;
    }

    return (
        <div>
            <form noValidate onSubmit={handleNext}>
                <div style={{marginBottom: '10rem'}}>
                    <CurrencyTextField 
                        label="Funding Amount Requested"
                        margin='normal'
                        variant="standard"
                        value={userData['amountRequested']}
                        currencySymbol="$"
                        outputFormat="string"
                        decimalCharacter="."
                        digitalGroupSeperator=","
                        required
                        error={amountRequestedError}
                        helperText={amountRequestedError ? 'Funding amount is required' : ' '}
                        color='primary'
                        onChange={(event, value) => setUserData({...userData, 'amountRequested': value})}
                    />
                </div>
                <div>
                    <Button size='small' onClick={() => setCurrentStep(2)} variant='contained' color='secondary'>Previous</Button>
                    <Button size='small' type='submit' variant='contained' color='primary'>Submit</Button>
                </div>
            </form>
            
        </div>
    );
}

export default ThirdStep
