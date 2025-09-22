import React from "react";
import {FaLeftLong, FaRightLong, FaX} from "react-icons/fa6";
import "../styles/CalendarSection.css";
import {CalendarHook} from "../utils/CalendarsHook.ts";
import {CalendarTasks, type Task} from "../hooks/CalendarTasks.ts";

const CalendarSection: React.FC = () => {
    const {
        year,
        month,
        monthName,
        weekDays,
        prevMonth,
        nextMonth,
        calendarGrid,
    } = CalendarHook();

    const {
        selectedDay,
        taskText,
        setTaskText,
        tasks,
        editingTaskIndex,
        editingTaskText,
        addTask,
        deleteTask,
        startEditing,
        saveTask,
        toggleCompleted,
        handleDayClick,
        tasksForSelectedDay,
        hasTasksForSelectedDay
    } = CalendarTasks(year, month);

    return (
        <div className="calendar">
            <div className="calendar__header">
                <button className="calendar__btn" onClick={prevMonth}>
                    <FaLeftLong/>
                </button>
                <span className="calendar__title">
                    {monthName} {year}
                </span>
                <button className="calendar__btn" onClick={nextMonth}>
                    <FaRightLong/>
                </button>
            </div>
            <div className="calendar__grid">
                {weekDays.map((day) => (
                    <div key={day} className="calendar__weekday">
                        {day}
                    </div>
                ))}
                {calendarGrid.map((cell, i) => {
                    const cellDateKey = cell
                        ? `${year}-${month}-${cell}`
                        : null;
                    const hasTasks =
                        !!(
                            cellDateKey &&
                            tasks[cellDateKey] &&
                            tasks[cellDateKey].length > 0
                        );

                    return (
                        <div
                            key={i}
                            className={
                                "calendar__cells" +
                                (!cell ? " calendar__cells-empty" : "") +
                                (cell !== null && cell === selectedDay
                                    ? " calendar__cells-selected"
                                    : "") +
                                (hasTasks ? " calendar__cells-has-tasks" : "")
                            }
                            onClick={() => handleDayClick(cell)}
                        >
                            {cell || ""}
                        </div>
                    );
                })}
                <div className="calendar__tasks-section">
                    {selectedDay && (
                        <>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    addTask();
                                }}
                            >
                                <b>Задача на день {selectedDay}:</b>
                                <input
                                    value={taskText}
                                    onChange={(e) => setTaskText(e.target.value)}
                                    placeholder="Введите задачу"
                                />
                                <button
                                    type="submit"
                                    disabled={!taskText.trim()}
                                >
                                    Добавить
                                </button>
                            </form>

                            {hasTasksForSelectedDay && (
                                <ul>
                                    {tasksForSelectedDay.map((task: Task, idx: number) => (
                                        <li key={idx}>
                                            <input
                                                type="checkbox"
                                                checked={task.completed}
                                                onChange={() => toggleCompleted(idx)}
                                            />
                                            {editingTaskIndex === idx ? (
                                                <>
                                                    <input
                                                        type="text"
                                                        value={editingTaskText}
                                                        onChange={(e) =>
                                                            startEditing(idx, e.target.value)
                                                        }
                                                        onBlur={saveTask}
                                                    />
                                                    <button onClick={saveTask}>
                                                        Сохранить
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <span
                                                        onClick={() =>
                                                            startEditing(idx, task.text)
                                                        }
                                                      style={{
                                                          textDecoration: task.completed
                                                              ? "line-through"
                                                              : "none",
                                                      }}
                                                    >
                                                        {task.text}
                                                    </span>
                                                    <button
                                                        className="calendar__task-delete"
                                                        onClick={() => deleteTask(idx)}
                                                        style={{marginLeft: "10px"}}
                                                    >
                                                        <FaX/>
                                                    </button>
                                                </>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CalendarSection;