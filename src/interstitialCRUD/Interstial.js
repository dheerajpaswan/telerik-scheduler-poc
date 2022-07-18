import React, { useEffect, useState } from "react";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import axios from "axios";
import InterstitialForm from "./InterstialForm.js";
import { filterBy } from "@progress/kendo-data-query";

const EditCommandCell = (props) => {
  return (
    <td>
      <button
        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
        onClick={() => props.enterEdit(props.dataItem)}
      >
        Edit
      </button>
      <span> </span>
      <button
        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
        onClick={() => props.deleteUser(props.dataItem.SID)}
      >
        Delete
      </button>
    </td>
  );
};

const Interstial = () => {
  const initialValues = {
    SID: 0,
    Description: " ",
    ShortTitle: " ",
    ValidFromDate: " ",
    ExpiryDate: " ",
    TBA: false,
    GenreSID : 2,
    SubGenreSID : 3,
    ProductionYear: 0,
    Available: false,
    MediaCategorySID: 2,
    ContentSID : 2,
    MediaCategoryTypeSID:2,
    ChannelSID : 2,
    HouseNumber:" ",
    NominalDuration: " ",
    SegmentTypeSID: 2,
    StartTime: " ",
    EndTime: " ",
    ActualDuration: " ",
    ReferenceMediaLibrarySID: 2,
    Previewed: false,
    ValidDays: " ",
    CreatedDate :" ",
    ModifiedDate: " ",
    IsDummy : false,
    IsPlaceHolder : false,
    BraodCasterID : " ",
    BrandSID: 2,
    ProductSID: 2,
    PromoVersion: 3,
    Reference1: " ",
    Reference2: " ",
  };

  const [filter, setFilter] = useState();
  const [languages, setLanguages] = useState([]);
  const [interstitials, setInterstitials] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [editInterstitial, setEditInterstitial] = useState(initialValues);

  const filterChange = (event) => {
    setInterstitials(filterBy(interstitials, event.filter));
    setFilter(event.filter);
  };

  //to load data from the table via API
  const loadInterstitials = async () => {
    await axios
      .get("http://142.93.214.96:9090/data/Interstitial/")
      .then((res) => setInterstitials(res.data));
  };

  const loadLanguages = async () => {
    await axios
      .get("http://142.93.214.96:9090/data/Language")
      .then((res) => setLanguages(res.data));
  };

  useEffect(() => {
    loadInterstitials();
    loadLanguages();
  }, [setInterstitials]);

  //to delete enitity from the table
  const deleteInterstitial = async (id) => {
    await axios.delete(`http://142.93.214.96:9090/data/Interstitial/${id}`);
    loadInterstitials();
  };

  //to open the form to create or update enitity
  const enterEdit = (item) => {
    setOpenForm(true);
    setEditInterstitial(item);
  };

  const addUserClick = () => {
    setOpenForm(true);
  };
  const handleSubmit = async (event) => {
    console.log(event);
    var data = {
      data: event,
    };
    await axios
      .post(`http://142.93.214.96:9090/data/Interstitial/`, data)
      .then((res) => console.log(res));
    setOpenForm(false);
    loadInterstitials();
  };

  const handleCancelEdit = () => {
    setOpenForm(false);
    setEditInterstitial(initialValues);
  };

  const MyEditCommandCell = (props) => (
    <EditCommandCell
      {...props}
      enterEdit={enterEdit}
      deleteInterstitial={deleteInterstitial}
    />
  );

  return (
    <>
      <div>
        <button
          className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
          onClick={addUserClick}
        >
          Add User
        </button>
      </div>
      <Grid
        style={{
          height: "400px",
        }}
        data={interstitials}
        onRowDoubleClick={(e) => {
          setEditInterstitial(e.dataItem);
          setOpenForm(true);
        }}
        filter={filter}
        filterable={true}
        onFilterChange={filterChange}
      >
        <GridColumn field="Description" title="Title" />
        <GridColumn field="ShortTitle" title="Short Title" />
        <GridColumn field="ValidFromDate" title="Valid From" />
        <GridColumn field="ExpiryDate" title="Valid To" />
        <GridColumn field="TBA" title="TBA" />
        <GridColumn field="HouseNumber" title="House Number" />
        <GridColumn field="Reference1" title="Reference 1" />
        <GridColumn field="Reference2" title="Reference 2" />
        <GridColumn field="TBA" title="TBA" />
        <GridColumn field="TBA" title="TBA" />
        <GridColumn field="TBA" title="TBA" />
        <GridColumn field="TBA" title="TBA" />
        <GridColumn field="TBA" title="TBA" />
        <GridColumn title="Action" cell={MyEditCommandCell} />
      </Grid>
      {openForm && (
        <InterstitialForm
          cancelEdit={handleCancelEdit}
          onSubmit={handleSubmit}
          item={editInterstitial}
          languages={languages}
        />
      )}
    </>
  );
};

export default Interstial;
