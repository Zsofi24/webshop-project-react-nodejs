import { StyledStepperCircle, StyledStepperLine } from "./StyledStepper";

export default function Stepper ({ currentStep }) {

  const numberOfSteps= 3;
  const labels = ["Kosár", "Adatok", "Összesítés"];
  const isActive = (index) => currentStep >= index;
  const isActiveLine = (index) => currentStep >= index + 1; 

  return (
    <div className="stepper">
      <div className="stepper__container">
        {Array.from({length: numberOfSteps}).map((_, index) => (
          <div className="stepper__step" key={index}>
            <div className="stepper__progress">
              <StyledStepperLine active={isActive(index)} hide={index == 0}/>
              <StyledStepperCircle active={isActive(index)}/>
              <StyledStepperLine active={isActiveLine(index)} hide={index == numberOfSteps -1}/>
            </div>
            <div className="stepper__labels">
                {labels[index]}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
