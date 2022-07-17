//https://www.telerik.com/kendo-react-ui/components/layout/tabstrip/ -- to implement tab strip

import * as React from "react";
import { Dialog } from "@progress/kendo-react-dialogs";
import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { Checkbox, Input, NumericTextBox } from "@progress/kendo-react-inputs";
import { ComboBox, DropDownList } from "@progress/kendo-react-dropdowns";
import { Error, Label } from "@progress/kendo-react-labels";
import { DatePicker, TimePicker } from "@progress/kendo-react-dateinputs";

//min number validation functions for form
// const minValueValidator = (value) =>
//   value >= 0 ? "" : "The value must be 0 or higher";

// const NonNegativeNumericInput = (fieldRenderProps) => {
//   const { validationMessage, visited, ...others } = fieldRenderProps;
//   return (
//     <div>
//       <NumericTextBox {...others} />
//       {visited && validationMessage && <Error>{validationMessage}</Error>}
//     </div>
//   );
// };

// //email validation for form
// const emailRegex = new RegExp(/\S+@\S+\.\S+/);

// const emailValidator = (value) =>
//   emailRegex.test(value) ? "" : "Please enter a valid email.";

// const EmailInput = (fieldRenderProps) => {
//   const { validationMessage, visited, ...others } = fieldRenderProps;
//   return (
//     <div>
//       <Input {...others} />
//       {visited && validationMessage && <Error>{validationMessage}</Error>}
//     </div>
//   );
// };

const InterstitialForm = (props) => {
  const [value, setValue] = React.useState(0);
  const alternateLanguageData = [];
  const alternateLanguageSID = [];

  //   props.languages.map((language, index) => {
  //     alternateLanguageData.push(language.Description);
  //     alternateLanguageSID.push(language.SID);
  //   });

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
              <div className="row">
                <div className="col-10">
                  <fieldset className={"k-form-fieldset"}>
                    <div className="row">
                      <div className="mb-3 col-6">
                        <Field
                          name={"Description"}
                          component={Input}
                          label={"Title"}
                        />
                      </div>
                      <div className="mb-3 col-6">
                        {/* checkboxes to impliment */}
                        <Field
                          name={"ExternalDescription"}
                          component={Input}
                          label={"External Description"}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="mb-3 col-6">
                        <Field
                          name={"ShortTitle"}
                          component={Input}
                          label={"Short Title"}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="mb-3 col-6">
                        <div className="row">
                          <div className="col-4">
                            <Field
                              name={"Type"}
                              component={DropDownList}
                              label={"Type"}
                            />
                          </div>
                          <div className="col-4">
                            <Field
                              name={"Content"}
                              component={DropDownList}
                              label={"Content"}
                            />
                          </div>

                          <button
                            //   type={"submit"}
                            className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary col-3"
                            style={{ marginTop: "20px" }}
                            //   disabled={!formRenderProps.allowSubmit}
                          >
                            Create Content
                          </button>
                        </div>
                      </div>
                      <div className="mb-3 col-6">
                        {/* checkboxes to impliment */}
                        <div className="row">
                          <div className="col-6">
                            <Field
                              name={"Channel"}
                              component={DropDownList}
                              label={"Channel"}
                            />
                          </div>
                          <div className="col-6">
                            <Field
                              name={"AssetID"}
                              component={Input}
                              label={"Asset ID"}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <div className="row">
                          <div className="col-4">
                            <Field
                              name={"ValidFromDate"}
                              component={DatePicker}
                              label={"Valid From"}
                              marginTop={"100px"}
                              //   style={{ marginTop: "100px" }}
                            />
                          </div>
                          <div className="col-4">
                            <Field
                              name={"ValidToDate"}
                              component={DatePicker}
                              label={"Valid To"}
                            />
                          </div>
                          <div className="col-4">
                            <Field
                              name={"TBA"}
                              component={Checkbox}
                              label={"TBA"}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="row">
                          <div className="col-6">
                            <Field
                              name={"NominalDuration"}
                              component={TimePicker}
                              label={"Nominal Duration"}
                            />
                          </div>
                          <div className="col-6">
                            <Field
                              name={"ISCICode"}
                              component={Input}
                              label={"ISCI Code"}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <div className="row">
                          <div className="col-4">
                            <Field
                              name={"Genre"}
                              component={DropDownList}
                              label={"Genre"}
                            />
                          </div>
                          <div className="col-4">
                            <Field
                              name={"SubGenre"}
                              component={DropDownList}
                              label={"Sub Genre"}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="row">
                          <div className="col-6">
                            <Field
                              name={"InTime"}
                              component={TimePicker}
                              label={"In Time"}
                            />
                          </div>
                          <div className="col-6">
                            <Field
                              name={"OutTime"}
                              component={TimePicker}
                              label={"Out Time"}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <div className="row">
                          <div className="col-4">
                            <Field
                              name={"Production"}
                              component={Input}
                              label={"Production"}
                            />
                          </div>
                          <div className="col-4">
                            <Field
                              name={"Archive"}
                              component={Checkbox}
                              label={"Archive"}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="row">
                          <div className="col-6">
                            <Field
                              name={"ActualDuration"}
                              component={TimePicker}
                              label={"Actual Duration"}
                            />
                          </div>
                          <div className="col-6">
                            <Field
                              name={"TXReady"}
                              component={Checkbox}
                              label={"TX Ready"}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <div className="row">
                          <div className="col-4">
                            <Field
                              name={"Version"}
                              component={DropDownList}
                              label={"Version"}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="row">
                          <div className="col-6">
                            <Field
                              name={"Reference1"}
                              component={Input}
                              label={"Reference 1"}
                            />
                          </div>
                          <div className="col-6">
                            <Field
                              name={"Reference2"}
                              component={Input}
                              label={"Reference 2"}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                </div>
                <div className="k-form-buttons col-2">
                  <div className="row">
                    <button
                      type={"submit"}
                      className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary col-12"
                      disabled={!formRenderProps.allowSubmit}
                    >
                      {props.item.SID !== 0 ? "Update" : "Create"}
                    </button>
                    <button
                      type={"submit"}
                      style={{ marginTop: "5px" }}
                      className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base col-12"
                      onClick={props.cancelEdit}
                    >
                      Cancel
                    </button>
                    <button
                      // type={"submit"}
                      style={{ marginBottom: "240px", marginTop: "5px" }}
                      className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base col-12"
                    >
                      History
                    </button>
                  </div>
                </div>
              </div>
            </FormElement>
          )}
        />
      </Dialog>
    </div>
  );
};

export default InterstitialForm;
