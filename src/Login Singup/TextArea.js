import { ErrorMessage, Field } from 'formik'
import React from 'react'
import TextError from './TextError'

function TextArea({label,name,...rest}) {
    
    return (
        <div className="form-control">
            <label htmlFor={name}>{label}</label>
            <Field className = "textarea" id={name} name={name} {...rest}/>
            <ErrorMessage name = {name} component={TextError}/>
            
        </div>
    )
}

export default TextArea;