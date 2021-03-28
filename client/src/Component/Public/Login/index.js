import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { singinUser } from "../../../Action/Public/Users/Login";
import FormFields from "../../../UserInterface/Form/formFields";
import { update,generateData,isFormValid } from "../../../UserInterface/Form/formAction";
import { Grid,CardMedia,Typography,Button } from '@material-ui/core';
import LoginImage from "../../../Resources/Images/LoginScreen/login.jpg";
class Login extends Component {
    state = {
        // disabled:true,
        formError:false,
        formSuccess: "",
        formData:{
            userNameOrEmail:{
                element:"input",
                value:"",
                config:{
                    name:"usernameoremail",
                    type:"email",
                    label:"Username or email",
                    required:true,
                    color:"primary",
                    fullWidth:true,
                    variant:"outlined",
                    margin:"dense",
                    // disabled:true,
                },
                validation:{
                    required:true,
                    email:true
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
    submitForm = (event) => {
        event.preventDefault();
        
        let dataToSubmit = generateData(this.state.formData,"login");
        let formIsValid =  isFormValid(this.state.formData,"login");
        if(formIsValid){
            this.props.dispatch(singinUser(dataToSubmit)).then(response => {
                if(response.payload.loginSuccess){
                    // console.log(response.payload);
                    this.props.history.push("/users/dashboard");
                }else{
                    this.setState({
                        formError: true
                    })
                }
            })
            // console.log(dataToSubmit);
        }else{
            this.setState({
                formError:true
            })
        }
    }
   
    // editUpdate = (event) => {
    //     event.preventDefault();
    //     let disabled = disabledUpdate(this.state.formData,"login");
    //     this.setState({
    //         disabled: false,
    //         formData: disabled
    //     })
    // }

    updateForm = (element) => {

        const newFormdata = update(element,this.state.formData,"login");
        this.setState({
            formError: false,
            formData: newFormdata
        })
    }
    render() {
        return (
            <div>
                <Grid container item xs={12} className="bg-light">
                    <Grid item xl={1} lg={1} md={1}/>
                    <Grid className="bg-white p-5 mt-5" item xl={5} lg={5} md={5} sm={6} xs={12}>
                        <form onSubmit={(event) => this.submitForm(event)} autoComplete="off">
                            <div className="mt-5 pt-5 pb-3">
                                <FormFields
                                    id={"userNameOrEmail"}
                                    formdata={this.state.formData.userNameOrEmail}
                                    change={(element)=>this.updateForm(element)}
                                />
                            </div>
                            <div className="pb-4">
                                <FormFields
                                    id={"password"}
                                    formdata={this.state.formData.password}
                                    change={(element)=>this.updateForm(element)}
                                />
                            </div>
                            { this.state.formError ?
                                <div>
                                    <Typography variant="caption" display="block" gutterBottom>
                                        Please check your data
                                    </Typography>
                                </div>
                            :null }
                            <div className="w-50 float-left text-lowercase">
                                <Button className="text-capitalize font-weight-light">Forgot password ?</Button>
                            </div>
                            <div className="w-50 float-right text-right text-lowercase">
                                <Button className="text-capitalize font-weight-light" onClick={(event) => this.submitForm(event)} fullWidth variant="contained" color="primary" disableElevation>
                                    Log In
                                </Button>
                            </div>
                        </form>
                    </Grid>
                    <Grid className="text-center pt-5" item xl={5} lg={5} md={5} sm={6} xs={12}>
                        <CardMedia
                            component="img"
                            alt="Login"
                            image={LoginImage}
                            title="Login"
                        />
                    </Grid>
                    <Grid item xl={1} lg={1} md={1}/>
                </Grid>
            </div>
        )
    }
}

export default connect()(withRouter(Login));