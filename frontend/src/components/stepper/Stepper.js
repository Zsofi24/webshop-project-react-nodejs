import { Fragment } from "react";
import { StyledStepperCircle, StyledStepperLine } from "./StyledStepper";

export default function Stepper ({currentStep}) {

  const numberOfSteps= 3;
  const labels = ["Kosár", "Adatok", "Összesítés"];
  // const isFinalStep = (index) => index === numberOfSteps - 1;
  // const isFirstStep = (index) => index === 0;
  const isActive = (index) => currentStep >= index ? true : false
  const isActiveLine = (index) => currentStep >= index +1 ? true : false

  return (
    <div className="stepper-wrapper">
      <div className="stepper-container">
        {Array.from({length: numberOfSteps}).map((_, index) => (
          <div className="stepper-step" key={index}>
          <div className="stepper-show">
            {/* {isFirstStep(index) ? null : <StyledStepperLine active={isActive(index)} />} */}
            <StyledStepperLine active={isActive(index)} hide={index == 0}/>
            <StyledStepperCircle active={isActive(index)}/>
            <StyledStepperLine active={isActiveLine(index)} hide={index == numberOfSteps -1}/>
            {/* {isFinalStep(index) ? null : <StyledStepperLine active={isActive(index)} />} */}
          </div>
          <div className="stepper-labels">
              {labels[index]}
          </div>
          </div>

        ))}
      </div>
    </div>
  )
}