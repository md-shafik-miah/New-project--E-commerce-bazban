import { ErrorMessage, Field } from "formik";
import React from "react";
import TextError from "./TextError";

function RadioButton({ label, name, radioButtons, ...rest }) {
  return (
    <div style ={{display: "flex",  justifyContent:"flex-start", alignItems:"center"}}>
      <label htmlFor={name}>{label}</label>
      <Field name={name} {...rest} >
        {({field}) => {
          console.log("form radio option", field);
          return radioButtons.map((radioButton) => {
            return (
              <React.Fragment key={radioButton.key}>
                <input
                  type="radio"
                  id={radioButton.value}
                  {...field}
                  value={radioButton.value}
                  checked={field.value === radioButton.value}
                />
                <label style= {{margin: "5px"}} htmlFor= {radioButton.value}>{radioButton.key}</label>
              </React.Fragment>
            );
          });
        }}
      </Field>
      <ErrorMessage name={name} component= {TextError} />
    </div>
  );
}

export default RadioButton;