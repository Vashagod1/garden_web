import {FaLeftLong, FaRightLong} from "react-icons/fa6";
import "../styles/CalendarSection.css"
import {useCalendarHook} from "../utils/CalendarsHook.ts";
import React, {useState} from "react";
import { cn } from "../utils/cn.ts";

const CalendarSection: React.FC = () => {
    const {
        year,
        monthName,
        weekDays,
        prevMonth,
        nextMonth,
        calendarGrid
    } = useCalendarHook();

    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const [taskText, setTaskText] = useState<string>("");
    const [tasks, setTasks] = useState<{ [day: number]: string[] }>({});

    return (
        <div className="calendar">
            <div className="calendar__header">
                <button className="calendar__btn" onClick={prevMonth}><FaLeftLong/></button>
                <span className="calendar__title">
                {monthName} {year}
                </span>
                <button className="calendar__btn" onClick={nextMonth}><FaRightLong/></button>
            </div>
            <div className="calendar__grid">
                {weekDays.map(day => (
                    <div key={day} className="calendar__weekday">{day}</div>
                ))}
                {calendarGrid.map((cell, i) => (
                    <div
                        key={i}
                        className={cn('calendar__cells', cell === selectedDay ? " calendar__cells-selected" : "")}
                        onClick={() => {
                            if (cell) {
                                setSelectedDay(cell);
                            }
                        }}
                    >
                        {cell || ""}
                    </div>
                ))}
                {selectedDay && (
                    <form
                        onSubmit={e => {
                            e.preventDefault();
                            if(!taskText.trim() || selectedDay == null) return;
                            setTasks(prev => ({
                                ...prev,
                                [selectedDay]: [...(prev[selectedDay] || []), taskText]
                            }));
                            setTaskText("");
                        }}
                    >
                        <b>Задача на день {selectedDay}:</b>
                        <input
                            value={taskText}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTaskText(e.target.value)}
                            placeholder="Введите здачу"
                        />
                        <button type="submit">Добавить</button>
                    </form>
                )}
                {selectedDay && tasks[selectedDay] && (
                    <ul>
                        {tasks[selectedDay].map((task, idx) => (
                            <li key={idx}>{task}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
export default CalendarSection;