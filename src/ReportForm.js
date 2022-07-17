import * as React from "react";
import { Dialog } from "@progress/kendo-react-dialogs";
import {
  Form,
  Field,
  FormElement,
  FieldWrapper,
} from "@progress/kendo-react-form";
import {
  Checkbox,
  Input,
  NumericTextBox,
  RadioButton,
} from "@progress/kendo-react-inputs";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Error, Label } from "@progress/kendo-react-labels";
import { DatePicker } from "@progress/kendo-react-dateinputs";

const ReportForm = (props) => {
  return (
    <div>
      <Dialog
        title={"Report Form"}
        // {props.item.SID !== 0 ? "Update" : " Create"}
        onClose={props.cancelEdit}
      >
        <Form
          onSubmit={props.onSubmit}
          initialValues={props.item}
          render={(formRenderProps) => (
            <FormElement
              style={{
                maxWidth: "1050px",
              }}
            >
              <fieldset className={"k-form-fieldset"}>
                <div className="row">
                  <div className="mb-3 col-6">
                    <Field
                      name={"From"}
                      component={DatePicker}
                      label={"From:"}
                    />
                  </div>
                  <div className="mb-3 col-6">
                    <Field name={"To"} component={DatePicker} label={"To:"} />
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3 col-6">
                    <Field name={"All"} component={Checkbox} label={"All"} />
                  </div>
                  <div className="mb-3 col-3">
                    <Field
                      name={"Client"}
                      component={RadioButton}
                      label={"Client"}
                    />
                  </div>
                  <div className="mb-3 col-3">
                    <Field
                      name={"Agency"}
                      component={RadioButton}
                      label={"Agency"}
                    />
                  </div>
                </div>
                <div>
                  <Field
                    name={"Client"}
                    component={DropDownList}
                    label={"Client"}
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

export default ReportForm;
