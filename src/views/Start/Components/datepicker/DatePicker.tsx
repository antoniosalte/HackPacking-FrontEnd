import * as React from "react";
import DatePicker from "react-datepicker";
require("react-datepicker/dist/react-datepicker.css");
import moment, { min } from "moment";
import changeData from "";

const Picker = props => {
  let minDate = new Date();
  if (!props.arrival) {
    minDate = new Date(moment(props.arrivalD, "D/M/YYYY").format());
    minDate.setDate(minDate.getDate() + 3);
  }
  var [startDate, setStartDate] = React.useState(minDate);

  if (!props.arrival) {
    var arrivalD = moment(props.arrivalD, "D/M/YYYY");
    var startD = moment(props.startD, "D/M/YYYY");
    const diffDays = startD.diff(arrivalD, "days");
    if (diffDays < 3) {
      //startDate = minDate;
      props.updateDate("departure", minDate);
    }
  }

  const CustomInput = ({ value, onClick }) => (
    <div
      style={{
        cursor: "pointer",
        borderBottom: "solid 1px #c4c4c4",
        padding: "0 5px"
      }}
      className="example-custom-input"
      onClick={onClick}
    >
      {value}
    </div>
  );

  return (
    <DatePicker
      id={props.id}
      dateFormat="dd/MM/yyyy"
      selected={startDate}
      onSelect={date => {
        props.onSelect(date);
        setStartDate(date);
      }}
      minDate={minDate}
      customInput={<CustomInput />}
      popperPlacement="top-end"
      popperModifiers={{
        offset: {
          enabled: true,
          offset: "5px, 10px"
        },
        preventOverflow: {
          enabled: true,
          escapeWithReference: false,
          boundariesElement: "viewport"
        }
      }}
    />
  );
};
export default Picker;
