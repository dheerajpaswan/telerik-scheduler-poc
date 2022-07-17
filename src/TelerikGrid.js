import React, { useEffect, useState } from "react";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import axios from "axios";
import EditForm from "./EditForm.js";
import { filterBy } from "@progress/kendo-data-query";
import { Popup } from "@progress/kendo-react-popup";
import { Menu, MenuItem } from "@progress/kendo-react-layout";
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
      {/* implementationation of delete remaining  */}
      <button
        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
        onClick={() => props.deleteUser(props.dataItem.SID)}
      >
        Delete
      </button>
    </td>
  );
};

const initialDataState = {
  skip: 0,
  take: 10,
};

const TelerikGrid = () => {
  const initialValues = {
    SID: 0,
    Name: "",
    UserName: "",
    Password: "",
    Email: "",
    ContactNo: "",
  };

  const [page, setPage] = useState(initialDataState);
  const [filter, setFilter] = useState();
  const [users, setUsers] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [editUser, setEditUser] = useState(initialValues);
  const [openMenu, setOpenMenu] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  let offset = {};
  let menuWrapperRef = "";

  const filterChange = (event) => {
    if (event.filter.filters[0].value) {
      setUsers(filterBy(users, event.filter));
      setFilter(event.filter);
    } else {
      loadUsers();
    }
  };

  const pageChange = (e) => {
    setPage(e.page);
  };

  //to load data from the table via API
  const loadUsers = async () => {
    var res = await axios.get(
      "https://bmsinfoglobal.com/phpApiV2/apis/bmsSalesApi/public/index.php/api/GetDataV3?entityTypeName=User"
    );

    setUsers(res.data.entity);
  };

  useEffect(() => {
    loadUsers();
  }, [setUsers]);

  //to delete enitity from the table
  const deleteUser = async (id) => {
    await axios.delete(`https://bmsinfoglobal.com/phpApiV2/apis/bmsSalesApi/public/index.php/api/Delete?entityTypeName=User&id=
    ${id}`);
    loadUsers();
  };

  //to open the form to create or update enitity
  const enterEdit = (item) => {
    setOpenForm(true);
    setEditUser(item);
  };

  const addUserClick = () => {
    setOpenForm(true);
  };

  const handleSubmit = async (event) => {
    console.log(event);
    var data = {
      apiID: "User",
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
    loadUsers();
  };

  const handleCancelEdit = () => {
    setOpenForm(false);
    setEditUser(initialValues);
  };

  const MyEditCommandCell = (props) => (
    <EditCommandCell {...props} enterEdit={enterEdit} deleteUser={deleteUser} />
  );

  const handleContextMenuOpen = (e, dataItem) => {
    dataItem = dataItem;
    offset = { left: e.clientX, top: e.clientY };
    setOpenMenu(true);
  };

  //pending to implement
  const rowRender = (trElement, dataItem) => {
    const trProps = {
      ...trElement.props,
      onContextMenu: (e) => {
        e.preventDefault();
        handleContextMenuOpen(e, dataItem.dataItem);
      },
    };
  };

  const onPopupOpen = () => {
    menuWrapperRef.querySelector("[tabindex]").focus();
  };

  //for menu on right click
  const handleOnSelect = (e) => {
    switch (e.item.text) {
      case "Edit":
        setOpenForm(true);
        break;
      case "Delete":
        deleteUser(e.dataItem.SID);
        break;
      default:
    }
    setOpenMenu(false);
  };

  //search for master
  const onSearchChange = (e) => {
    if (e.target.value === "") {
      loadUsers();
    } else {
      const filteredResult = users.filter(
        (item) =>
          item.Name.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.UserName.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.Email.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.ContactNo.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setUsers(filteredResult);
    }
    setSearchValue(e.target.value);
  };

  return (
    <>
      <div className="row" style={{ margin: "10px" }}>
        <div className="col-10">
          <button
            className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
            onClick={addUserClick}
          >
            Add User
          </button>
        </div>
        <div className="col-1" style={{ marginLeft: "120px" }}>
          <input
            type={"text"}
            onChange={(e) => onSearchChange(e)}
            placeholder={"Search"}
            value={searchValue}
          />
        </div>
      </div>
      <Popup offset={offset} show={openMenu} open={onPopupOpen}>
        <Menu
          vertical={true}
          style={{ display: "inline-block" }}
          onSelect={handleOnSelect}
        >
          <MenuItem text="Edit" />
          <MenuItem text="Delete" />
        </Menu>
      </Popup>

      <Grid
        style={{
          height: "400px",
        }}
        //pagination
        data={users.slice(page.skip, page.take + page.skip)}
        skip={page.skip}
        take={page.take}
        total={users.length}
        pageable={true}
        onPageChange={pageChange}
        //
        onRowDoubleClick={(e) => {
          setEditUser(e.dataItem);
          setOpenForm(true);
        }}
        filter={filter}
        filterable={true}
        onFilterChange={filterChange}
        // rowRender={rowRender}
      >
        <GridColumn field="SID" title="SID" width="40px" filterable={false} />
        <GridColumn field="Name" title="Name" />
        <GridColumn field="UserName" title="Username" />
        <GridColumn field="Email" title="Email" width="250px" />
        <GridColumn field="ContactNo" title="Contact No" />
        <GridColumn cell={MyEditCommandCell} />
      </Grid>
      {openForm && (
        <EditForm
          cancelEdit={handleCancelEdit}
          onSubmit={handleSubmit}
          item={editUser}
        />
      )}
    </>
  );
};

export default TelerikGrid;
