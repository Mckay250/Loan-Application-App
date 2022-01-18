import './App.css';
import FirstStep from './components/FirstStep';
import SecondStep from './components/SecondStep';
import ThirdStep from './components/ThirdStep';
import EndOfFlow from './components/EndOfFlow';
import { Stepper, StepLabel, Step } from '@material-ui/core';
import { loanAppContext } from './StepContext';
import { useContext } from 'react';

function App() {

  const { currentStep, showLoading } = useContext(loanAppContext);

  function showStep(step) {
    switch(step) {
      case 1:
        return <FirstStep />
      case 2:
        return <SecondStep />
      case 3:
        return <ThirdStep />
      case 4:
        return <EndOfFlow />
    }
  }

  function showLoader() {
    if (showLoading) {
      return <div class="loader"></div>
    }
  }

  return (
    <div className="App">
      <h3 
        style={{color: 'primary', textDecoration:'underline'}}>
          Knight Capital Funding Loan Application
      </h3>
      <header className="App-header">
        <div className='center-stepper'>
          <Stepper 
            style={{width: '18%', 'backgroundColor':' #d7dde9e5'}} 
            activeStep={currentStep - 1}
            orientation='horizontal'>
            <Step>
              <StepLabel>Info</StepLabel>
            </Step>
            <Step>
              <StepLabel>Revenue</StepLabel>
            </Step>
            <Step>
              <StepLabel>Funding</StepLabel>
            </Step>
          </Stepper>
        </div>
        <div>
          {showLoader()}
          {showStep(currentStep)}
        </div>

      </header>
    </div>
  );
}

export default App;
