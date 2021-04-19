import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Stepper,Step,StepLabel,Typography,Grid } from "@material-ui/core";
import FormFields from "../../../../UserInterface/Form/formFields";
import { update,generateData,isFormValid } from "../../../../UserInterface/Form/formAction";

function getSteps() {
    return ['Company / Agency Details', 'Location Details', 'Login / Personal Details'];
}
class RegisterUser extends Component {
    state={
        activeStep: 0,
        skipped: new Set(),
        steps: getSteps(),
        formError:false,
        formSuccess: "",
        formData:{
            companyName:{
                element:"input",
                value:"",
                config:{
                    name:"company",
                    type:"text",
                    label:"Company / Agency Name",
                    required:true,
                    color:"primary",
                    fullWidth:true,
                    variant:"outlined",
                    margin:"dense",
                    // disabled:true,
                },
                validation:{
                    required:true,
                    email:false
                },
                valid:false,
                touched:false,
                validationMessage:""
            },
            password:{
                element:"input",
                value:"",
                config:{
                    name:"password",
                    type:"password",
                    label:"Password",
                    required:true,
                    color:"primary",
                    fullWidth:true,
                    variant:"outlined",
                    margin:"dense",
                    // disabled:true,
                },
                validation:{
                    required:true,
                    password:true
                },
                valid:false,
                touched:false,
                validationMessage:""
            }
        }
    }
    isStepOptional = (step) => {
        return step === 1;
    };
    isStepSkipped = (step) => {
        return this.state.skipped.has(step);
    };
    handleNext = () => {
        let newSkipped = this.state.skipped;
        if(this.isStepSkipped(this.state.activeStep)){
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(this.state.activeStep);
        }
        this.setState({
            activeStep:((prevActiveStep) => prevActiveStep + 1),
            skipped:(newSkipped)
        })
    };
    handleBack = () => {
        this.setState({
            activeStep:((prevActiveStep) => prevActiveStep - 1),
        })
    };
    handleSkip = () => {
        if (!this.isStepOptional(this.state.activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }
        this.setState({
            activeStep:((prevActiveStep) => prevActiveStep + 1),
            skipped:((prevSkipped) => {
                const newSkipped = new Set(prevSkipped.values())
                newSkipped.add(this.state.activeStep)
                return newSkipped
            })
        })
    };
    getStepContent = (step) => {
        let Template = null;
        switch (step) {
            case 0:
                return Template = (
                    <Grid container item xl={12}>
                        <Grid item xl={3} lg={3} md={3} sm={3} xs={6}>

                        </Grid> 
                    </Grid>
                );
            default:
                Template = null;
        }
    }
    submitForm = (event) => {
        event.preventDefault();
        
        let dataToSubmit = generateData(this.state.formData,"register");
        let formIsValid =  isFormValid(this.state.formData,"register");
        if(formIsValid){
            // console.log(dataToSubmit);
        }else{
            this.setState({
                formError:true
            })
        }
    }
    updateForm = (element) => {

        const newFormdata = update(element,this.state.formData,"register");
        this.setState({
            formError: false,
            formData: newFormdata
        })
    }
    render() {
        return (
            <div>
                <Stepper activeStep={this.state.activeStep}>
                    {this.state.steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        // if (this.isStepOptional(index)) {
                        //     labelProps.optional = <Typography variant="caption">Optional</Typography>;
                        //   }
                        if (this.isStepSkipped(index)) {
                            stepProps.completed = false;
                        }
                        return (
                            <Step key={label} {...stepProps}>
                              <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                <div>
                    <form onSubmit={(event) => this.submitForm(event)} autoComplete="off">
                        {this.getStepContent(this.state.activeStep)}
                    </form>
                </div>
            </div>
        );
    }
}

export default connect()(withRouter(RegisterUser));