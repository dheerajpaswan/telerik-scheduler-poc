import React, { useEffect, useState } from "react";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import axios from "axios";
import InterstitialForm from "./InterstialForm.js";
import { filterBy } from "@progress/kendo-data-query";
import moment from "moment";

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
        onClick={() => props.deleteInterstitial(props.dataItem.SID)}
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
    SegmentTypeSID: 2,
    ReferenceMediaLibrarySID: 2,
    Previewed: false,
    ValidDays: " ",
    IsDummy : false,
    IsPlaceHolder : false,
    BroadCasterID : " ",
    BrandSID: 2,
    ProductSID: 2,
    PromoVersionSID: 3,
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


  //to implement the AllDays Checkboxs
  // const selectAll = (days) => {
  //   switch(days) {
  //     case x:
  //       // code block
  //       break;
  //     case y:
  //       // code block
  //       break;
  //     default:
  //       // code block
  //   }
  // }

  const parseAdjust = (eventDate) => {
    if(eventDate.length === 8){
      const date = new Date(2000, 2, 10,eventDate.slice(0,2)
      ,eventDate.slice(3,5),eventDate.slice(6,8));
      return date;
    }else{
    const date = new Date(eventDate);
    console.log(eventDate.length);
    return date;
    }
  };
  //to open the form to create or update enitity
  const enterEdit = (item) => {
    setOpenForm(true);
    setEditInterstitial({...item,
      TBA : item.TBA === 1 ? true : false,
      Previewed : item.Previewed === 1 ? true : false,
      Available : item.Available === 1 ? true : false,
      IsDummy : item.IsDummy === 1 ? true : false,
      IsPlaceHolder : item.IsPlaceHolder === 1 ? true : false,
      ValidDays : item.ValidDays === 13 ? true : false,
      ActualDuration : parseAdjust(item.ActualDuration),
      ValidFromDate : parseAdjust(item.ValidFromDate),
      ExpiryDate : parseAdjust(item.ExpiryDate),
      NominalDuration: parseAdjust(item.NominalDuration),
      StartTime :parseAdjust(item.StartTime),
      EndTime : parseAdjust(item.EndTime),
      CreatedDate: parseAdjust(item.ValidFromDate),
      ModifiedDate : parseAdjust(item.ValidFromDate)
    });
    console.log(editInterstitial);
  };

  const addUserClick = () => {
    setOpenForm(true);
  };


  const datetimeFormat = (date) => {
  let converted = moment(date).format("YYYY-MM-DD hh:mm:ss");
  return converted;
};

//to submit data in datatable
  const handleSubmit = async (event) => {
    //add selectall here
    const data = {
      data: {...event,
        //format conversion for post
        ValidFromDate : datetimeFormat(event.ValidFromDate),
        ExpiryDate : datetimeFormat(event.ExpiryDate),
        NominalDuration: datetimeFormat(event.NominalDuration).slice(11,19),
        ActualDuration: datetimeFormat(event.ActualDuration).slice(11,19),
        StartTime :datetimeFormat(event.StartTime).slice(11,19),
        EndTime :datetimeFormat(event.EndTime).slice(11,19),
        Available : event.Available,
        Previewed : event.Previewed,
        TBA : event.TBA,
        GenreSID : 2,
        SubGenreSID : 3,
        ProductionYear: parseInt(event.ProductionYear),
        MediaCategorySID: 2,
        ContentSID : 2,
        MediaCategoryTypeSID:2,
        ChannelSID : 2,
        HouseNumber:event.HouseNumber,
        SegmentTypeSID: 2,
        ReferenceMediaLibrarySID: 2,
        ValidDays: event.ValidDays,
        CreatedDate :datetimeFormat(event.ValidFromDate),
        ModifiedDate: datetimeFormat(event.ValidFromDate),
        IsDummy : false,
        IsPlaceHolder : false,
        BrandSID: 2,
        ProductSID: 2,
        PromoVersionSID: 3,
      },
    };
    console.log(data.data);
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
        <GridColumn field="StartTime" title="Start Time" />
        <GridColumn field="EndTime" title="End Time" />
        <GridColumn field="Previewed" title="Previewed" />
        <GridColumn field="Available" title="Available" />
        <GridColumn field="ProductionYear" title="Production Year" />
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
