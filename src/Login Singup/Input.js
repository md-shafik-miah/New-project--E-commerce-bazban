import React from 'react'
import { Field,ErrorMessage} from 'formik'
import TextError from './TextError'




const InputFieldStyle = {
    width: "100%",
    padding: "10px",
    margin: "10px 0px",
    backgroundColor: "none",
    border: "none",
    outLine:"none",
    focus: "none"
}

function Input(props) {
    const {label,name, ...rest} = props
    return (
        <div >
           <label htmlFor={name}>{label}</label>
           <Field style={InputFieldStyle} id={name} name={name} {...rest}/>
           <ErrorMessage name = {name} component = {TextError}/>            
        </div>
    )
}

export default Input