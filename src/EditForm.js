import * as React from "react";
import { Dialog } from "@progress/kendo-react-dialogs";
import {
  Form,
  Field,
  FormElement,
  FieldWrapper,
} from "@progress/kendo-react-form";
import { Input, NumericTextBox } from "@progress/kendo-react-inputs";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Error, Label } from "@progress/kendo-react-labels";
import { Popup } from "@progress/kendo-react-popup";
import { Menu, MenuItem } from "@progress/kendo-react-layout";
// import categories from "./categories.json";

//min number validation functions for form
const minValueValidator = (value) =>
  value >= 0 ? "" : "The value must be 0 or higher";

const NonNegativeNumericInput = (fieldRenderProps) => {
  const { validationMessage, visited, ...others } = fieldRenderProps;
  return (
    <div>
      <NumericTextBox {...others} />
      {visited && validationMessage && <Error>{validationMessage}</Error>}
    </div>
  );
};

//email validation for form
const emailRegex = new RegExp(/\S+@\S+\.\S+/);

const emailValidator = (value) =>
  emailRegex.test(value) ? "" : "Please enter a valid email.";

const EmailInput = (fieldRenderProps) => {
  const { validationMessage, visited, ...others } = fieldRenderProps;
  return (
    <div>
      <Input {...others} />
      {visited && validationMessage && <Error>{validationMessage}</Error>}
    </div>
  );
};

const EditForm = (props) => {
  return (
    <div>
      <Dialog
        title={props.item.SID !== 0 ? "Update User" : " Create User"}
        onClose={props.cancelEdit}
        width={400}
        height={440}
      >
        <Form
          onSubmit={props.onSubmit}
          initialValues={props.item}
          render={(formRenderProps) => (
            <FormElement>
              <fieldset className={"k-form-fieldset"}>
                <div className="mb-2">
                  <Field
                    name={"Name"}
                    component={Input}
                    label={"Enter your name"}
                  />
                </div>
                <div className="mb-2">
                  <Field
                    name={"UserName"}
                    component={Input}
                    label={"Username"}
                  />
                </div>
                <div className="mb-2">
                  <Field
                    name={"Password"}
                    component={Input}
                    label={"Password"}
                    placeholder={props.item.SID ? "**********" : ""}
                  />
                </div>
                <div className="mb-2">
                  <Field
                    name={"Email"}
                    component={EmailInput}
                    label={"Email"}
                    validator={emailValidator}
                  />
                </div>
                <div className="mb-2">
                  <Field
                    name={"ContactNo"}
                    component={Input}
                    label={"Phone Number"}
                  />
                </div>
              </fieldset>
              <div className="k-form-buttons">
                <button
                  type={"submit"}
                  className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
                  disabled={!formRenderProps.allowSubmit}
                >
                  {props.item.SID !== 0 ? "Update" : "Create"}
                </button>
                <button
                  type={"submit"}
                  className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
                  onClick={props.cancelEdit}
                >
                  Cancel
                </button>
              </div>
            </FormElement>
          )}
        />
      </Dialog>
    </div>
  );
};

export default EditForm;
