import { ErrorMessage, Field } from "formik";
import React from "react";
import TextError from "./TextError";

function CheckBox({ label, name, checkOptions, ...rest }) {
  return (
    <div className="form-control" style ={{display: "flex", margin: "5px"}}>
      <label htmlFor={name}>{label}</label>
      <Field name={name} {...rest} >
        {({ field }) => {
          console.log("form Checkbox", field);
          return checkOptions.map((checkOption) => {
            return (
              <React.Fragment key={checkOption.key}>
                <input
                  type="checkbox"
                  id={checkOption.value}
                  {...field}
                  value={checkOption.value}
                  checked={field.value.includes(checkOption.value)}
                />
                <label htmlFor={checkOption.value}>{checkOption.key}</label>
              </React.Fragment>
            );
          });
        }}
      </Field>
      <ErrorMessage name= {name} component={TextError}/>
    </div>
  );
}

export default CheckBox;