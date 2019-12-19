import * as React from "react";
import DatePicker from "react-datepicker";
require('react-datepicker/dist/react-datepicker.css')

const Picker = ( props ) => {
    let minDate = new Date();
    if ( !props.arrival ){
      minDate.setDate(minDate.getDate() + 3);
    }
    const [startDate, setStartDate] = React.useState(minDate);
    const ExampleCustomInput = ({ value, onClick }) => (
      <div
        style={{
            cursor: "pointer",
            borderBottom: "solid 1px #c4c4c4",
            padding: "0 5px",
        }}
        className="example-custom-input"
        onClick={ onClick }>
        {value}
      </div>
    );
    
    return (
      <DatePicker
        id={ props.id }
        dateFormat="dd/MM/yyyy"
        selected={startDate}
        onSelect={date => { 
                props.onSelect(date)
                setStartDate(date)
            }
        }
        minDate={ minDate }
        customInput={<ExampleCustomInput />}
      />
    );
  };
  export default Picker;