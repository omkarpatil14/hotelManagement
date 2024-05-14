import React from "react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";

const DashBoardContent = ({ handleSearch, date, setDate }) => {
  let footer = <p>Please pick a day.</p>;
  if (date) {
    footer = <p>You picked {format(date, "PP")}.</p>;
  }

  return (
    <section className="lg:mt-10">
      {/* search */}
      <h1 className="mt-7 mb-3">Search</h1>
      <input
        onChange={handleSearch}
        type="search"
        placeholder="Hotel title, Keywords"
        className="input w-72 max-w-xs"
      />
      {/* Location */}
      <h1 className="mt-7 mb-3">Location</h1>
      <select className="select select-success w-72 max-w-xs">
        <option disabled selected>
          Choose a location
        </option>
        <option>Dhaka </option>
        <option>Sylhet</option>
        <option>Chattogram</option>
        <option>Khulna</option>
        <option>Barishal</option>
      </select>

      {/* daypicker */}
      <DayPicker
        className="mt-5"
        mode="single"
        selected={date}
        onSelect={setDate}
        footer={footer}
      />
    </section>
  );
};

export default DashBoardContent;
