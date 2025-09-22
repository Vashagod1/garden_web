import {FaLeftLong, FaRightLong, FaX} from "react-icons/fa6";
import "../styles/CalendarSection.css"
import {useCalendarHook} from "../utils/CalendarsHook.ts";
import React, {useEffect, useState} from "react";
import {cn} from "../utils/cn.ts";

interface Task{
    text: string;
    completed: boolean;
}

interface Tasks {
    [dataKey: string]: Task[];
}

const CalendarSection: React.FC = () => {
    const {
        year,
        month,
        monthName,
        weekDays,
        prevMonth,
        nextMonth,
        calendarGrid,
    } = useCalendarHook();

    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const [taskText, setTaskText] = useState<string>("");
    const [tasks, setTasks] = useState<Tasks>(() => {
        try {
            const savedTasks = localStorage.getItem("calendarTasks");
            return savedTasks ? JSON.parse(savedTasks) : {};
        } catch (error) {
            console.log("Ошибка при чтении задач из localStorage", error);
            return {};
        }
    });
    const [editingTaskIndex, setEditingTaskIndex] = useState<number | null>(null);
    const [editingTaskText, setEditingTaskText] = useState<string>("");

    useEffect(() => {
        try {
            localStorage.setItem("calendarTasks", JSON.stringify(tasks));
        } catch (error) {
            console.error("Ошибка при сохранении задач в localStorage", error);
        }
    }, [tasks]);

    const selectedDateKey = selectedDay ? `${year}-${month}-${selectedDay}` : null; {/* Этот ключ нужен для создания уникальной даты. Не до конца понимаю почему уникальна и почему мы её почти везде используем */}

    const handleDeleteTask = (taskIndex: number) => {
        if (!selectedDateKey) return;

        setTasks(prev => {
            const currentTasks = prev[selectedDateKey] || [];
            const newTasksForDay = currentTasks.filter((_, index) => index !== taskIndex);

            return {
                ...prev,
                [selectedDateKey]: newTasksForDay,
            };
        });
    }

    const handleDayClick = (day: number | null) => {
        if (!day) return;

        if (day === selectedDay) {
            setSelectedDay(null);
        } else {
            setSelectedDay(day);
        }
    }

    const handleStartEditing = (taskIndex: number, currentText: string)=> {
        setEditingTaskIndex(taskIndex);
        setEditingTaskText(currentText);
    }

    const handleSaveTask = () => {
        if (editingTaskIndex === null || !selectedDateKey) return;

        setTasks(prev => {
            const currentTasks = prev[selectedDateKey] || [];
            const newTasksForDay = currentTasks.map((task, index) => {
                if (index === editingTaskIndex) {
                    return {...task, text: editingTaskText};
                }
                return task;
            });
                return {
                    ...prev,
                    [selectedDateKey]: newTasksForDay,
                };
        });
        setEditingTaskText("");
        setEditingTaskIndex(null);
    }


    const tasksForSelectedDay = selectedDay ? tasks[selectedDateKey] : undefined;
    const hasTasksForSelectedDay = tasksForSelectedDay && tasksForSelectedDay.length > 0;


    const handleToggleCompleted = (taskIndex: number) => {
        if (!selectedDateKey) return;
        setTasks(prev => {
            const currentTasks = prev[selectedDateKey] || [];
            const newTasksForDay = currentTasks.map((task, idx) =>
            idx === taskIndex ? {...task, completed: !task.completed}: task
            );
            return {
                ...prev,
                [selectedDateKey]: newTasksForDay,
            };
        });
    };


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
                {calendarGrid.map((cell, i) => {
                    const cellDateKey = cell ? `${year}-${month}-${cell}` : null;
                    const hasTasks = !!(cellDateKey && tasks[cellDateKey] && tasks[cellDateKey].length > 0);

                    return (
                        <div
                            key={i}
                            className={cn(
                                'calendar__cells',
                                !cell && 'calendar__cells-empty',
                                cell !== null && cell === selectedDay ? "calendar__cells-selected" : "",
                                hasTasks ? "calendar__cells-has-tasks" : ""
                            )}
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
                                onSubmit={e => {
                                    e.preventDefault();
                                    if (!taskText.trim() || !selectedDateKey) {
                                        return;
                                    }
                                    setTasks(prev => ({
                                        ...prev,
                                        [selectedDateKey]: [...(prev[selectedDateKey] || []), { text: taskText, completed: false }]
                                    }));
                                    setTaskText("");
                                }}
                            >
                                <b>Задача на день {selectedDay}:</b>
                                <input
                                    value={taskText}
                                    onChange={(e) => setTaskText(e.target.value)}
                                    placeholder="Введите задачу"
                                />
                                <button type="submit" disabled={!taskText.trim()}>Добавить</button>
                            </form>


                            {hasTasksForSelectedDay && (
                                <ul>
                                    {tasksForSelectedDay.map((task, idx) => (
                                        <li key={idx}>
                                            <input
                                                type="checkbox"
                                                checked={task.completed}
                                                onChange={() => handleToggleCompleted(idx)}
                                            />
                                            {editingTaskIndex === idx ? (
                                                <>
                                                    <input type="text"
                                                           value={editingTaskText}
                                                           onChange = {(e) => setEditingTaskText(e.target.value)}
                                                           onBlur={handleSaveTask}
                                                    />
                                                    <button onClick={handleSaveTask}>Сохранить</button>
                                                </>
                                            ) : (
                                                <>
                                                    <span
                                                        onClick={() => handleStartEditing(idx, task.text)}
                                                        style={{textDecoration: task.completed ? 'line-through' : 'none'}}
                                                    >
                                                        {task.text}
                                                    </span>
                                                    <button className="calendar__task-delete"
                                                            onClick={() => handleDeleteTask(idx)}
                                                            style={{marginLeft: '10px'}}>
                                                        <FaX/>
                                                    </button>
                                                </>
                                            )};
                                        </li>
                                    ))};
                                </ul>
                            )};
                        </>
                    )};
                </div>
            </div>
        </div>
    );
}
export default CalendarSection;