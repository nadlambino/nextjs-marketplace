import React from 'react';
import { Stepper, Step, StepButton } from '@mui/material';

export default function useStepper(steps: string[]) {
	const [activeStep, setActiveStep] = React.useState(0);
	const [completed, setCompleted] = React.useState<{
		[k: number]: boolean;
	}>({});

	const totalSteps = () => {
		return steps.length;
	};

	const completedSteps = () => {
		return Object.keys(completed).length;
	};

	const isLastStep = () => {
		return activeStep === totalSteps() - 1;
	};

	const allStepsCompleted = () => {
		return completedSteps() === totalSteps();
	};

	const handleNext = () => {
		const newActiveStep =
			isLastStep() && !allStepsCompleted()
				? // It's the last step, but not all steps have been completed,
				  // find the first step that has been completed
				  steps.findIndex((step, i) => !(i in completed))
				: activeStep + 1;
		setActiveStep(newActiveStep);
	};

	const handleBack = () => {
		const newCompleted = completed;
		newCompleted[activeStep - 1] = false;
		setCompleted(newCompleted);
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleStep = (step: number) => () => {
		setActiveStep(step);
	};

	const handleComplete = () => {
		const newCompleted = completed;
		newCompleted[activeStep] = true;
		setCompleted(newCompleted);
		handleNext();
	};

	const handleReset = () => {
		setActiveStep(0);
		setCompleted({});
	};

	const StepperComponent = (
		<Stepper
			nonLinear
			activeStep={activeStep}
		>
			{steps.map((label, index) => (
				<Step
					key={label}
					completed={completed[index]}
				>
					<StepButton
						color="inherit"
						disableRipple
						disableTouchRipple
						disabled
					>
						{label}
					</StepButton>
				</Step>
			))}
		</Stepper>
	);

	return {
		activeStep,
		StepperComponent,
		isLastStep: isLastStep(),
		allStepsCompleted: allStepsCompleted(),
		handleNext,
		handleBack,
		handleComplete,
		handleReset,
	};
}
