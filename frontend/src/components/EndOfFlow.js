import { Button } from '@material-ui/core';
import React, { useContext } from 'react'
import { loanAppContext } from '../StepContext';

const EndOfFlow = () => {
    const { endOfFlowColor, endOfFlowMessage, refreshApp } = useContext(loanAppContext);
    
    return (
        <div>
            <div>
                <h3 style={{color: endOfFlowColor}}>{endOfFlowMessage}</h3>
            </div>
            <div>
                <Button size='small' onClick={refreshApp} variant='contained' color='primary'>Home</Button>
            </div>
        </div>
    )
}

export default EndOfFlow
