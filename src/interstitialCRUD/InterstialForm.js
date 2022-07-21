//https://www.telerik.com/kendo-react-ui/components/layout/tabstrip/ -- to implement tab strip
//to convert time in hh:mm:ss:ff format -- https://stackoverflow.com/questions/42089868/converting-time-in-seconds-to-hhmmssff
import React, { useEffect, useState } from "react";
import { Dialog } from "@progress/kendo-react-dialogs";
import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { Checkbox, Input, NumericTextBox } from "@progress/kendo-react-inputs";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Error, Label } from "@progress/kendo-react-labels";
import { DateTimePicker, TimePicker } from "@progress/kendo-react-dateinputs";
import { TabStrip, TabStripTab } from "@progress/kendo-react-layout";
import sampleData from "./sampleData.json";

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

//to convert the data in hh:mm:ss:ff format
export const convertTime = function (input, fps) {
  var pad = function (input) {
    return input < 10 ? "0" + input : input;
  };
  fps = typeof fps !== "undefined" ? fps : 24;
  return [
    pad(Math.floor(input / 3600)),
    pad(Math.floor((input % 3600) / 60)),
    pad(Math.floor(input % 60)),
    pad(Math.floor((input * fps) % fps)),
  ].join(":");
};

//timepicker component with format
const TimePickerWithFormat = (fieldRenderProps) => {
  const { validationMessage, visited, ...others } = fieldRenderProps;
  return (
    <div>
      <TimePicker
        {...others}
        format="HH:mm:ss:ff"
        placeholder={"HH:mm:ss:ff"}
      />
      {visited && validationMessage && <Error>{validationMessage}</Error>}
    </div>
  );
};

//datetimepicker component with format
const DateTimePickerWithFormat = (fieldRenderProps) => {
  const { validationMessage, visited, ...others } = fieldRenderProps;
  return (
    <div>
      <DateTimePicker
        {...others}
        format="yyyy-MM-dd HH:mm:ss"
        placeholder={"yyyy-MM-dd HH:mm:ss"}
      />
      {visited && validationMessage && <Error>{validationMessage}</Error>}
    </div>
  );
};

const InterstitialForm = (props) => {
  // console.log(props.item);
  const [value, setValue] = React.useState(0);

  //for the tabbar
  const [selected, setSelected] = useState(-1);
  const handleSelect = (e) => {
    setSelected(e.selected);
  };

  const handleSubmit = (e) => {
    console.log(props);
    props.onSubmit();
    console.log(e);
  };

  const [state, setState] = React.useState({
    value: props.item,
  });

  const handleChange = (event) => {
    setState({
      value: event.target.value,
    });
  };

  //dropdownwith default value on edit
  const DropdownWithDefaultValue = (fieldRenderProps) => {
    const { validationMessage, visited, ...others } = fieldRenderProps;

    for (let i = 0; i <= props.mediaCategoryTypes.data.length; i++) {
      if (
        state.value.MediaCategoryTypeSID ===
        props.mediaCategoryTypes.data[i].SID
      )
        console.log(props.mediaCategoryTypes.data[i].Description);
      break;
    }
    return (
      <div>
        <DropDownList
          {...others}
          dataItemKey="SID"
          value={state.value}
          onChange={handleChange}
        />
      </div>
    );
  };

  return (
    <div>
      <Dialog
        title={props.item.SID > 0 ? "Update" : " Create"}
        onClose={props.cancelEdit}
        width={1400}
        height={700}
      >
        <Form
          onSubmit={props.onSubmit}
          initialValues={props.item}
          render={(formRenderProps) => (
            <FormElement>
              <div className="row">
                <div className="col-11">
                  <fieldset className={"k-form-fieldset"}>
                    <div className="row">
                      <div className="col-6">
                        <Field
                          name={"Description"}
                          component={Input}
                          label={"Title"}
                        />
                      </div>
                      <div className="col-6">
                        {/* checkboxes to impliment & implement valid days pending*/}
                        <div
                          className="row"
                          style={{ marginTop: "20px", marginBottom: "0px" }}
                        >
                          <div className="col-3" style={{ marginLeft: "5px" }}>
                            <Field
                              name={"ValidDays"}
                              component={Checkbox}
                              label={"Select All"}
                            />
                          </div>
                          <div className="col-1">
                            <Field
                              name={"Sun"}
                              component={Checkbox}
                              label={"Sun"}
                            />
                          </div>
                          <div className="col-1">
                            <Field
                              name={"Mon"}
                              component={Checkbox}
                              label={"Mon"}
                            />
                          </div>
                          <div className="col-1">
                            <Field
                              name={"Tues"}
                              component={Checkbox}
                              label={"Tues"}
                            />
                          </div>
                          <div className="col-1">
                            <Field
                              name={"Wed"}
                              component={Checkbox}
                              label={"Wed"}
                            />
                          </div>
                          <div className="col-1">
                            <Field
                              name={"Thur"}
                              component={Checkbox}
                              label={"Thur"}
                            />
                          </div>
                          <div className="col-1">
                            <Field
                              name={"Fri"}
                              component={Checkbox}
                              label={"Fri"}
                            />
                          </div>
                          <div className="col-1">
                            <Field
                              name={"Sat"}
                              component={Checkbox}
                              label={"Sat"}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className=" col-6">
                        <Field
                          name={"ShortTitle"}
                          component={Input}
                          label={"Short Title"}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <div className="row">
                          <div className="col-4">
                            <Field
                              name={"Type"}
                              component={
                                props.item.SID
                                  ? DropdownWithDefaultValue
                                  : DropDownList
                              }
                              data={props.mediaCategoryTypes.data}
                              textField={"Description"}
                              label={"Type"}
                            />
                          </div>
                          <div className="col-4">
                            <Field
                              name={"Content"}
                              component={
                                props.item.SID
                                  ? DropdownWithDefaultValue
                                  : DropDownList
                              }
                              data={props.contents.data}
                              textField={"Description"}
                              label={"Content"}
                            />
                          </div>

                          <button
                            //   type={"submit"}
                            className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary col-3"
                            style={{ marginTop: "20px", marginLeft: "10px" }}
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
                              component={
                                props.item.SID
                                  ? DropdownWithDefaultValue
                                  : DropDownList
                              }
                              data={props.channels.data}
                              textField={"FullChannelName"}
                              label={"Channel"}
                            />
                          </div>
                          <div className="col-6">
                            <Field
                              name={"HouseNumber"}
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
                              component={DateTimePickerWithFormat}
                              label={"Valid From"}
                              marginTop={"100px"}
                            />
                          </div>
                          <div className="col-4">
                            <Field
                              name={"ExpiryDate"}
                              component={DateTimePickerWithFormat}
                              label={"Valid To"}
                            />
                          </div>
                          <div
                            className="col-4"
                            style={{ marginTop: "25px", marginBottom: "0px" }}
                          >
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
                              component={TimePickerWithFormat}
                              label={"Nominal Duration"}
                            />
                          </div>
                          <div className="col-6">
                            <Field
                              name={"BroadCasterID"}
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
                              data={props.genres.data}
                              textField={"Description"}
                              label={"Genre"}
                            />
                          </div>
                          <div className="col-4">
                            <Field
                              name={"SubGenre"}
                              component={DropDownList}
                              data={props.genres.data}
                              textField={"Description"}
                              label={"Sub Genre"}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="row">
                          <div className="col-6">
                            <Field
                              name={"StartTime"}
                              component={TimePickerWithFormat}
                              label={"In Time"}
                            />
                          </div>
                          <div className="col-6">
                            <Field
                              name={"EndTime"}
                              component={TimePickerWithFormat}
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
                              name={"ProductionYear"}
                              component={Input}
                              label={"Production"}
                            />
                          </div>
                          <div
                            className="col-4"
                            style={{ marginTop: "25px", marginBottom: "0px" }}
                          >
                            <Field
                              name={"Available"}
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
                              component={TimePickerWithFormat}
                              label={"Actual Duration"}
                            />
                          </div>
                          <div
                            className="col-6"
                            style={{ marginTop: "25px", marginBottom: "0px" }}
                          >
                            <Field
                              name={"Previewed"}
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
                              data={props.promoVersions.data}
                              textField={"Name"}
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
                    {/* tab element */}
                    <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                      <TabStrip selected={selected} onSelect={handleSelect}>
                        <TabStripTab title="Media Episode Technical Detail">
                          <div className="row">
                            <div className="col-6">
                              <Field
                                name={"DeliveryMethod"}
                                component={Input}
                                label={"Delivery Method"}
                              />
                            </div>
                            <div className="col-4">
                              <Field
                                name={"VideoAspectRatio"}
                                component={Input}
                                label={"Video Aspect Ratio"}
                              />
                            </div>
                            <div className="col-2">
                              <Field
                                name={"Ratio"}
                                component={Input}
                                label={"Ratio"}
                              />{" "}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-6">
                              <Field
                                name={"OriginalLanguages"}
                                component={Input}
                                label={"Original Languages"}
                              />
                            </div>
                            <div className="col-6">
                              <Field
                                name={"VideoCodec"}
                                component={Input}
                                label={"Video Codec"}
                              />{" "}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-6">
                              <Field
                                name={"DubbedLanguages"}
                                component={Input}
                                label={"Dubbed Languages"}
                              />
                            </div>
                            <div className="col-6">
                              <Field
                                name={"Ratio"}
                                component={Input}
                                label={"Ratio"}
                              />{" "}
                            </div>
                          </div>
                        </TabStripTab>
                        <TabStripTab title="Rights">
                          <div className="row">
                            <div className="col-6">
                              <Field
                                name={"DeliveryMethod"}
                                component={Input}
                                label={"Delivery Method"}
                              />
                            </div>
                            <div className="col-4">
                              <Field
                                name={"VideoAspectRatio"}
                                component={Input}
                                label={"Video Aspect Ratio"}
                              />
                            </div>
                            <div className="col-2">
                              <Field
                                name={"Ratio"}
                                component={Input}
                                label={"Ratio"}
                              />{" "}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-6">
                              <Field
                                name={"OriginalLanguages"}
                                component={Input}
                                label={"Original Languages"}
                              />
                            </div>
                            <div className="col-6">
                              <Field
                                name={"VideoCodec"}
                                component={Input}
                                label={"Video Codec"}
                              />{" "}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-6">
                              <Field
                                name={"DubbedLanguages"}
                                component={Input}
                                label={"Dubbed Languages"}
                              />
                            </div>
                            <div className="col-6">
                              <Field
                                name={"Ratio"}
                                component={Input}
                                label={"Ratio"}
                              />{" "}
                            </div>
                          </div>
                        </TabStripTab>
                        <TabStripTab title="Synopsis">
                          <p>tab3</p>
                        </TabStripTab>
                        <TabStripTab title="Audio Track Detail">
                          <p>Tab 3 Content</p>
                        </TabStripTab>
                        <TabStripTab title="Attachments">
                          <p>Tab 3 Content</p>
                        </TabStripTab>
                        <TabStripTab title="Cast & Crew">
                          <p>Tab 3 Content</p>
                        </TabStripTab>
                        <TabStripTab title="Rules">
                          <p>Tab 3 Content</p>
                        </TabStripTab>
                        <TabStripTab title="Media">
                          <p>Tab 3 Content</p>
                        </TabStripTab>
                        <TabStripTab title="Mam Status">
                          <p>Tab 3 Content</p>
                        </TabStripTab>
                      </TabStrip>
                    </div>
                  </fieldset>
                </div>
                <div className="k-form-buttons col-1">
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
                      style={{ marginBottom: "480px", marginTop: "5px" }}
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
