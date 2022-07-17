import React, { useEffect, useState } from "react";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import axios from "axios";
import { filterBy } from "@progress/kendo-data-query";
import GenreEditForm from "./GenreEditForm.js";
import ReportForm from "./ReportForm.js";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
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

const Genre = () => {
  const initialValues = {
    SID: 0,
    Code: "",
    Description: "",
    ExternalDescription: "",
    AlternateDescription: "",
    AltDescriptionLanguageSID: "",
    InActive: 0,
    Archive: 0,
  };

  const [filter, setFilter] = useState();
  const [languages, setLanguages] = useState([]);
  const [genres, setGenres] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [editGenre, setEditGenre] = useState(initialValues);

  const filterChange = (event) => {
    setGenres(filterBy(genres, event.filter));
    setFilter(event.filter);
  };

  //to load data from the table via API
  const loadGenres = async () => {
    await axios
      .get(
        "https://bmsinfoglobal.com/phpApiV2/apis/bmsSalesApi/public/index.php/api/GetDataV3?entityTypeName=Genre"
      )
      .then((res) => setGenres(res.data.entity));
  };

  const loadLanguages = async () => {
    await axios
      .get(
        "https://bmsinfoglobal.com/phpApiV2/apis/bmsSalesApi/public/index.php/api/GetDataV3?entityTypeName=Language"
      )
      .then((res) => setLanguages(res.data.entity));
  };

  useEffect(() => {
    loadGenres();
    loadLanguages();
  }, [setGenres]);

  //to delete enitity from the table
  const deleteGenre = async (id) => {
    await axios.delete(`https://bmsinfoglobal.com/phpApiV2/apis/bmsSalesApi/public/index.php/api/Delete?entityTypeName=Genre&id=
    ${id}`);
    loadGenres();
  };

  //to open the form to create or update enitity
  const enterEdit = (item) => {
    setOpenForm(true);
    setEditGenre(item);
  };

  const addUserClick = () => {
    setOpenForm(true);
  };

  const handleSubmit = async (event) => {
    console.log(event);
    var data = {
      apiID: "Genre",
      SID: event.SID ?? 0,
      entity: event,
    };
    await axios
      .post(
        `https://bmsinfoglobal.com/phpApiV2/apis/bmsSalesApi/public/index.php/api/save`,
        data
      )
      .then((res) => console.log(res));
    setOpenForm(false);
    loadGenres();
  };

  const handleCancelEdit = () => {
    setOpenForm(false);
    setEditGenre(initialValues);
  };

  const MyEditCommandCell = (props) => (
    <EditCommandCell
      {...props}
      enterEdit={enterEdit}
      deleteGenre={deleteGenre}
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
        data={genres}
        onRowDoubleClick={(e) => {
          setEditGenre(e.dataItem);
          setOpenForm(true);
        }}
        filter={filter}
        filterable={true}
        onFilterChange={filterChange}
      >
        <GridColumn field="Description" title="Description" />
        <GridColumn field="ExternalDescription" title="External Description" />
        <GridColumn
          field="AlternateLanguageSID"
          title="Alternate Language SID"
        />
        <GridColumn
          field="AlternateDescription"
          title="Alternate Description"
          width="250px"
        />
        <GridColumn cell={MyEditCommandCell} />
      </Grid>
      {openForm && (
        <GenreEditForm
          cancelEdit={handleCancelEdit}
          onSubmit={handleSubmit}
          item={editGenre}
          languages={languages}
        />
      )}
    </>
  );
};

export default Genre;
