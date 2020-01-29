import * as React from "react";
import DatePicker from "react-datepicker";
require('react-datepicker/dist/react-datepicker.css')
import moment from "moment"


import { Portal } from 'react-overlays'

const CalendarContainer = ({children}) => {
  const el = document.getElementById('calendar-portal')

  return (
    <Portal container={el}>
      {children}
    </Portal>
  )
}

const Picker = ( props ) => {
    let minDate = new Date();
    if ( !props.arrival ){
      minDate.setDate(minDate.getDate() + 3);
    }
    if ( props.startD ){ // if have an init value
      minDate = new Date(moment(props.startD,'D/M/YYYY').format())
    }
    const [startDate, setStartDate] = React.useState(minDate);
    const CustomInput = ({ value, onClick }) => (
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