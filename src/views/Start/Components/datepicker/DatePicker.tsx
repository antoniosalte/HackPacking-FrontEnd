import * as React from "react";
import DatePicker from "react-datepicker";
require("react-datepicker/dist/react-datepicker.css");
import moment from "moment";

const Picker = ({ onSelect = () => {}, id, value, minDate }) => {
  const selectedValue = new Date(moment(value, "D/M/YYYY").format());
  const minDateValue = new Date(moment(minDate).format("DD-MM-YYYY"));
  const CustomInput = ({ value, onClick }) => (
    <div
      style={{
        cursor: "pointer",
        borderBottom: "solid 1px #c4c4c4",
        padding: "0 5px",
      }}
      onClick={onClick}
    >
      {value}
    </div>
  );

  return (
    <DatePicker
      id={id}
      dateFormat="dd/MM/yyyy"
      selected={selectedValue}
      onSelect={date => onSelect(date)}
      minDate={minDateValue}
      customInput={<CustomInput />}
      popperPlacement="top-end"
      popperModifiers={{
        offset: {
          enabled: true,
          offset: "5px, 10px",
        },
        preventOverflow: {
          enabled: true,
          escapeWithReference: false,
          boundariesElement: "viewport",
        },
      }}
    />
  );
};
export default Picker;
