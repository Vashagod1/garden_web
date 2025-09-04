import React from "react";
import {useCalendarHook} from "../utils/CalendarsHook.ts";
import "../styles/CalendarSection.css";

const CalendarSection: React.FC = () => {
    const {
        year,
        monthName,
        weekDays,
        setPrevMonth,
        setNextMonth,
        calendarGrid
    } = useCalendarHook();

    return (
        <div className="calendar">
            <div className="calendar__header">
                <button onClick={setPrevMonth}>←</button>
                <span>{monthName} {year}</span>
                <button onClick={setNextMonth}>→</button>
            </div>
            <div className="calendar__grid">
                {weekDays.map(day => <div key={day} className="calendar__weekday">{day}</div>)}
                {calendarGrid.map((cell, i) =>
                    <div key={i} className="calendar__cell">{cell || ""}</div>
                )}
            </div>
        </div>
    );
};
export default CalendarSection;