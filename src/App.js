//SOURCE: --- https://www.telerik.com/kendo-react-ui/components/scheduler/
// scheduler model fields -- https://www.telerik.com/kendo-react-ui/components/scheduler/api/SchedulerModelFields/#toc-starttimezone/

// multiple selection -- https://www.telerik.com/kendo-react-ui/components/scheduler/customization/items/multiple-selection/

//API save and update --  http://142.93.214.96:9090/data/Language/save
//API delete --  http://142.93.214.96:9090/data/Language/{SID}

import React, { useEffect, useState } from "react";
import { guid } from "@progress/kendo-react-common";
import { timezoneNames } from "@progress/kendo-date-math";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import {
  IntlProvider,
  load,
  LocalizationProvider,
  loadMessages,
} from "@progress/kendo-react-intl";
import {
  Scheduler,
  TimelineView,
  DayView,
  WeekView,
  MonthView,
  AgendaView,
} from "@progress/kendo-react-scheduler";

import weekData from "cldr-core/supplemental/weekData.json";
import currencyData from "cldr-core/supplemental/currencyData.json";
import likelySubtags from "cldr-core/supplemental/likelySubtags.json";
import numbers from "cldr-numbers-full/main/es/numbers.json";
import dateFields from "cldr-dates-full/main/es/dateFields.json";
import currencies from "cldr-numbers-full/main/es/currencies.json";
import caGregorian from "cldr-dates-full/main/es/ca-gregorian.json";
import timeZoneNames from "cldr-dates-full/main/es/timeZoneNames.json";
import esMessages from "./es.json";
import { displayDate, customModelFields, GetData } from "./events-utc";
import axios from "axios";
import moment from "moment";

load(
  likelySubtags,
  currencyData,
  weekData,
  numbers,
  currencies,
  caGregorian,
  dateFields,
  timeZoneNames
);
loadMessages(esMessages, "es-ES");

const App = () => {
  const timezones = React.useMemo(() => timezoneNames(), []);
  const locales = [
    {
      language: "en-US",
      locale: "en",
    },
    {
      language: "es-ES",
      locale: "es",
    },
  ];

  const [view, setView] = React.useState("day");
  const [date, setDate] = React.useState(displayDate);
  const [locale, setLocale] = React.useState(locales[0]);
  const [timezone, setTimezone] = React.useState("Etc/UTC");
  const [orientation, setOrientation] = React.useState("horizontal");
  const [data, setData] = useState([]);

  const handleViewChange = React.useCallback(
    (event) => {
      setView(event.value);
    },
    [setView]
  );
  const handleDateChange = React.useCallback(
    (event) => {
      setDate(event.value);
    },
    [setDate]
  );
  const handleLocaleChange = React.useCallback(
    (event) => {
      setLocale(event.target.value);
    },
    [setLocale]
  );
  const handleTimezoneChange = React.useCallback(
    (event) => {
      setTimezone(event.target.value);
    },
    [setTimezone]
  );
  const handleOrientationChange = React.useCallback((event) => {
    setOrientation(event.target.getAttribute("data-orientation"));
  }, []);

  const randomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  //to formate date like this format "2000-03-22 12:22:11"
  const datetimeFormat = (date) => {
    let converted = moment(date).format("YYYY-MM-DD hh:mm:ss");
    return converted;
  };

  const handleDataChange = React.useCallback(
    ({ created, updated, deleted }) => {
      setData((old) =>
        old
          .filter(
            (item) =>
              deleted.find((current) => current.SID === item.SID) === undefined
          )
          .map(
            (item) =>
              updated.find((current) => current.SID === item.SID) || item
          )
          .concat(created.map((item) => ({ ...item })))
      );
      // console.log(created);
      // console.log(updated);
      // console.log(deleted);

      //multiple selection of appointments

      // to save the data in database

      //TODO: condition to apply
      if (created.length === 1) {
        created.map((item) => {
          // console.log("start-- " + datetimeFormat(item.Start));
          // console.log("end-- " + datetimeFormat(item.End));
          let entity = {
            SID: 0,
            Start: datetimeFormat(item.Start),
            Title: item.Title,
            Description: item.Description,
            End: datetimeFormat(item.End),
            OwnerID: randomInt(1, 2), //random for now
            StartTimezone: null,
            EndTimezone: null,
            RecurrenceRule: null,
            RecurrenceID: randomInt(1, 2),
            RecurrenceException: null,
            isAllDay: item.isAllDay ? 1 : 0,
          };
          console.log(entity);
          onSaveOrUpdate(entity);
        });
      }

      if (updated.length === 1) {
        updated.map((item) => {
          onSaveOrUpdate({
            SID: item.SID,
            Start: datetimeFormat(item.Start),
            Title: item.Title,
            Description: item.Description,
            End: datetimeFormat(item.End),
            OwnerID: randomInt(1, 2), //random for now
            StartTimezone: null,
            EndTimezone: null,
            RecurrenceRule: null,
            RecurrenceID: randomInt(1, 2),
            RecurrenceException: null,
            isAllDay: item.isAllDay ? 1 : 0,
          });
          console.log("Done");
        });
      }

      //to delete appointment form UI and Table
      if (deleted.length === 1) {
        deleted.map((item) => {
          onDelete(item.SID);
        });
      }
    },
    [setData]
  );

  //function to capture data from events-utc
  const toGetData = (data) => {
    setData(data);
  };

  const onSaveOrUpdate = async (item) => {
    await fetch("http://142.93.214.96:9090/data/Planner/", {
      method: "POST",
      body: JSON.stringify({
        data: item,
      }),
      accept: "application/json",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .catch((err) => console.log(err));
  };

  const onDelete = async (id) => {
    await axios.delete(`http://142.93.214.96:9090/data/Planner/${id}`);
    console.log("done");
  };

  return (
    <div>
      <div className="example-config">
        <div className="row">
          <div className="col">
            <h5>Timezone:</h5>
            <DropDownList
              value={timezone}
              onChange={handleTimezoneChange}
              data={timezones}
            />
          </div>
          <div className="col">
            <h5>Locale:</h5>
            <DropDownList
              value={locale}
              onChange={handleLocaleChange}
              data={locales}
              textField="language"
              dataItemKey="locale"
            />
          </div>
          <div className="col">
            <h5>Orientation:</h5>
            <input
              type="radio"
              name="orientation"
              id="horizontal"
              data-orientation="horizontal"
              className="k-radio k-radio-md"
              checked={orientation === "horizontal"}
              onChange={handleOrientationChange}
            />
            <label className="k-radio-label" htmlFor="horizontal">
              Horizontal
            </label>
            <br />
            <input
              type="radio"
              name="orientation"
              id="vertical"
              data-orientation="vertical"
              className="k-radio k-radio-md"
              checked={orientation === "vertical"}
              onChange={handleOrientationChange}
            />
            <label className="k-radio-label" htmlFor="vertical">
              Vertical
            </label>
          </div>
        </div>
      </div>
      <GetData toGetData={toGetData} />
      <LocalizationProvider language={locale.language}>
        <IntlProvider locale={locale.locale}>
          <Scheduler
            data={data}
            onDataChange={handleDataChange}
            view={view}
            onViewChange={handleViewChange}
            date={date}
            onDateChange={handleDateChange}
            editable={true}
            timezone={timezone}
            modelFields={customModelFields}

            // group={{
            //   resources: ["Rooms", "Persons"],
            //   orientation,
            // }}
            // resources={[
            //   {
            //     name: "Rooms",
            //     data: [
            //       {
            //         text: "Meeting Room 101",
            //         value: 1,
            //       },
            //       {
            //         text: "Meeting Room 201",
            //         value: 2,
            //         color: "#FF7272",
            //       },
            //     ],
            //     field: "RoomID",
            //     valueField: "value",
            //     textField: "text",
            //     colorField: "color",
            //   },
            //   {
            //     name: "Persons",
            //     data: [
            //       {
            //         text: "Peter",
            //         value: 1,
            //         color: "#5392E4",
            //       },
            //       {
            //         text: "Alex",
            //         value: 2,
            //         color: "#54677B",
            //       },
            //     ],
            //     field: "PersonIDs",
            //     valueField: "value",
            //     textField: "text",
            //     colorField: "color",
            //   },
            // ]}
          >
            <TimelineView />
            <DayView />
            <WeekView />
            <MonthView />
            <AgendaView />
          </Scheduler>
        </IntlProvider>
      </LocalizationProvider>
    </div>
  );
};

export default App;
