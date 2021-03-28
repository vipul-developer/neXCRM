import React from 'react'
import { TextField }  from '@material-ui/core';
function FormFields( { formdata, change, id} ) {

    const showError = () => {
        let errorMessage = null;
        if(formdata.validation && !formdata.valid){
            errorMessage = formdata.validationMessage
        }
        return errorMessage;
    }

    const renderTemplate = () => {
        let formTemplate = null;

        switch(formdata.element){
                case("input"):
                    formTemplate = (
                        <div>
                            <TextField
                                {...formdata.config}
                                value={formdata.value}
                                onBlur={ (event)=> change({ event, id, blur:true }) }
                                onChange={ (event)=> change({ event, id }) }
                                helperText = { showError() }
                            />
                        </div>
                    )
                break;

                default:
                    formTemplate = null;
        }

        return formTemplate;
    }

    return (
        <div>
            { renderTemplate() }
        </div>
    )
}

export default FormFields;
