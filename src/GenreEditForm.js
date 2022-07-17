import * as React from "react";
import { Dialog } from "@progress/kendo-react-dialogs";
import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { Checkbox, Input, NumericTextBox } from "@progress/kendo-react-inputs";
import { ComboBox, DropDownList } from "@progress/kendo-react-dropdowns";
import { Error, Label } from "@progress/kendo-react-labels";
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

const GenreEditForm = (props) => {
  const [value, setValue] = React.useState(0);
  const alternateLanguageData = [];
  const alternateLanguageSID = [];
  props.languages.map((language, index) => {
    alternateLanguageData.push(language.Description);
    alternateLanguageSID.push(language.SID);
  });

  // console.log(alternateLanguageData);
  // console.log(alternateLanguageSID);

  // const onChange = (e) => {
  //   console.log(e.value.SID);
  //   setValue(e.value.SID);
  // };

  return (
    <div>
      <Dialog
        title={props.item.SID !== 0 ? "Update" : " Create"}
        onClose={props.cancelEdit}
        width={1000}
        height={500}
      >
        <Form
          onSubmit={props.onSubmit}
          initialValues={props.item}
          render={(formRenderProps) => (
            <FormElement>
              <fieldset className={"k-form-fieldset"}>
                <div className="row">
                  <div className="mb-3 col-6">
                    <Field
                      name={"Description"}
                      component={Input}
                      label={"Description"}
                    />
                  </div>
                  <div className="mb-3 col-6">
                    <Field
                      name={"ExternalDescription"}
                      component={Input}
                      label={"External Description"}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <Field
                      name={"AlternateLanguageSID"}
                      component={ComboBox}
                      data={props.languages}
                      textField="Description"
                      // onChange={onChange}
                      // value={value}
                      label={"Alternate Language"}
                    />
                  </div>
                  <div className="mb-3 col-6">
                    <Field
                      name={"AlternateDescription"}
                      component={Input}
                      label={"Alternate Description"}
                    />
                  </div>
                </div>
                <div>
                  <Field
                    name={"Archive"}
                    component={Checkbox}
                    label={"Archive"}
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

export default GenreEditForm;
