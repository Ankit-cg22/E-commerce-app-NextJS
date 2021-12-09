import { Step, StepLabel, Stepper } from "@material-ui/core";
import React from 'react'

export default function ShoppingSteps({ activeStep = 0 }){
    return(
        
        <Stepper activeStep={activeStep}  alternativeLabel>
        {
            ['Login' ,'Shipping Data' , 'Payment' , 'Place Order' ].map(step=>{
                return (
                    <Step key={step}>
                        <StepLabel>
                            {step}
                        </StepLabel>
                    </Step>
                )
            })
        }
        </Stepper>
            
          
    )
}
