import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ModernCalendar = ({ startDate, endDate }) => {
  const [date, setDate] = useState(new Date());

  return (
    <DatePicker
      selected={date}
      onChange={(date) => setDate(date)}
      startDate={new Date(startDate)}
      endDate={new Date(endDate)}
      highlightDates={[new Date(startDate), new Date(endDate)]}
      inline
    />
  );
};

export default ModernCalendar;
