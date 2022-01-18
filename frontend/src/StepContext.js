import React, { useEffect, useState } from 'react';
import App from './App';

export const loanAppContext = React.createContext();

const StepContext = () => {

    const API_URL = 'http://localhost:8000/api/v1'
    
    const endOfFlowMessages = {
        success: "Thank you, we will reach out to you shortly.",
        error: "No offers found."
    }

    const [endOfFlowMessage, setEndOfFlowmessage] = useState('')
    const [endOfFlowColor, setEndOfFlowColor] = useState('blue')
    const [currentStep, setCurrentStep] = useState(1);
    const [userData, setUserData] = useState({});
    const [showLoading, setShowLoading] = useState(false);

    // check localStorage for previous state
    useEffect(() => {
        let currenStep = parseInt(localStorage.getItem('current-step') || '1');
        let usedata = JSON.parse(localStorage.getItem('user-data') || {});
        console.log('current step', currenStep);
        console.log('user data', usedata);
        setCurrentStep(currenStep);
        setUserData(usedata);
    }, [])

    // update user data in localStorage to save state
    useEffect(() => {
        localStorage.setItem('user-data', JSON.stringify(userData));
    }, [userData]);
    
    // update current page in local storage to save state
    useEffect(() => {
        localStorage.setItem('current-step', currentStep);
    }, [currentStep]);

    function submitData() {
        if (!userData['revenue'] || 
            !userData['amountRequested'] ||
            userData['revenue'] < 50000 || 
            userData['amountRequested'] < 25000
            ) {
            setEndOfFlowmessage(endOfFlowMessages.error);
            setEndOfFlowColor('red')
            setCurrentStep(4);
        } else {
            sendClientData();
            setShowLoading(true);
        }
    }

    async function sendClientData() {
        let request = {
            fullname : userData['fullname'],
            email: userData['email'],
            phone: userData['phonenumber'],
            yearly_revenue: userData['revenue'],
            funding_amount_requested: userData['amountRequested']
        }

        await fetch(`${ process.env.BACKEND_URL || API_URL}/client`, {
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        }).then(res => res.json)
        .then(data => {
            setShowLoading(false);
            console.log(data);
            setEndOfFlowmessage(endOfFlowMessages.success);
            setEndOfFlowColor('green')
            setCurrentStep(4);
        })
        .catch(err => {
            setShowLoading(false);
            setCurrentStep(4);
            setEndOfFlowmessage("An error occured while communicating with the server! Please try again later");
            setEndOfFlowColor('red')
        });
    }

    // routes to the first page and clears user's data
    function refreshApp() {
        setUserData({});
        setCurrentStep(1);
    }

    return (
        <div>
            <loanAppContext.Provider value={{currentStep, setCurrentStep, userData, setUserData, submitData, endOfFlowMessage, endOfFlowColor, refreshApp, showLoading}} >
                <App />
            </loanAppContext.Provider>
        </div>
    )
}

export default StepContext
