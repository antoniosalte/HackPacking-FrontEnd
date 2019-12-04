import * as React from "react";
import DatePicker from "react-datepicker";
require('react-datepicker/dist/react-datepicker.css')

const Picker = ( props ) => {
    const [startDate, setStartDate] = React.useState(new Date());
    const ExampleCustomInput = ({ value, onClick }) => (
      <div
        id={ props.id }
        style={{
            cursor: "pointer",
        }}
        className="example-custom-input"
        onClick={onClick}>
        {value}
      </div>
    );
    return (
      <DatePicker
        dateFormat="dd/MM/yyyy"
        selected={startDate}
        onSelect={date => { 
                props.onSelect(date)
                setStartDate(date)
            }
        }
        minDate={ new Date() }
        customInput={<ExampleCustomInput />}
      />
    );
  };
  export default Picker;