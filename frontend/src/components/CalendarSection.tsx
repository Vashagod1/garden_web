import { useState } from "react";
import { FaLeftLong, FaRightLong, FaX } from "react-icons/fa6";
import "../styles/CalendarSection.css";
import { cn } from "../utils/cn.ts";

type Task = string;

function loadTasksFromStorage(): Map<string, Task[]> {
  if (typeof window === "undefined") {
    return new Map();
  }
  const taskJson = localStorage.getItem("GardenWebTasks");
  if (taskJson) {
    try {
      const tasksArray = JSON.parse(taskJson);
      return new Map(tasksArray);
    } catch (e) {
      console.error("Ошибка парсинга задач из localStorage:", e);
      return new Map();
    }
  }
  return new Map();
}

function saveTasksToStorage(tasks: Map<string, Task[]>) {
  if (typeof window === "undefined") return;
  const tasksArray = Array.from(tasks.entries());
  const tasksJson = JSON.stringify(tasksArray);
  localStorage.setItem("GardenWebTasks", tasksJson);
}

export const CalendarSection: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [tasks, setTasks] = useState<Map<string, Task[]>>(
    loadTasksFromStorage(),
  );
  const [newTaskText, setNewTaskText] = useState("");

  const handlePrevMonth = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  const today = new Date();

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setNewTaskText("");
  };

  const addTask = () => {
    if (!selectedDate || !newTaskText.trim()) return;
    const dataKey = selectedDate.toISOString().split("T")[0];
    const newTasks = new Map(tasks);
    const tasksForDay = newTasks.get(dataKey) || [];
    tasksForDay.push(newTaskText.trim());
    newTasks.set(dataKey, tasksForDay);
    setTasks(newTasks);
    saveTasksToStorage(newTasks);
    setNewTaskText("");
  };

  const removeTask = (taskIdx: number) => {
    if (!selectedDate) return;
    const dateKey = selectedDate.toISOString().split("T")[0];
    const newTasks = new Map(tasks);
    const tasksForDay = newTasks.get(dateKey) || [];
    tasksForDay.splice(taskIdx, 1);
    if (tasksForDay.length) {
      newTasks.set(dateKey, tasksForDay);
    } else {
      newTasks.delete(dateKey);
    }
    setTasks(newTasks);
    saveTasksToStorage(newTasks);
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleString("ru-RU", { month: "long" });
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  let firstDayOfMonth = new Date(year, month, 1).getDay();

  if (firstDayOfMonth === 0) {
    firstDayOfMonth = 7;
  }

  const daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

  const calendarDays = [];
  for (let i = 1; i <firstDayOfMonth; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="calendar__day empty"></div>);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dateKey = date.toISOString().split("T")[0];
    const tasksForDay = tasks.get(dateKey) || [];
    const isToday = dateKey === today.toISOString().split("T")[0];
    const isSelected = selectedDate ? dateKey === selectedDate.toISOString().split('T')[0] : false;
    const dayClassName = cn("calendar__day", {
      today: isToday,
      selected: isSelected,
      "has-tasks": tasksForDay.length > 0,
    });

    calendarDays.push(
      <div
        key={dateKey}
        className={dayClassName}
        onClick={() => handleDayClick(date)}
      >
        <span className="calendar__day-number">{day}</span>
        {tasksForDay.length > 0 && (
          <div className="calendar__task-indicator">
            {tasksForDay.length === 1
            ? "1 задача"
            : `${tasksForDay.length} задач`}</div>
        )}
      </div>,
    );
  }

  let selectedDateTasks: Task[] = [];
  const selectedDateKey = selectedDate?.toISOString().split("T")[0];
  if (selectedDate) {
    if (typeof selectedDateKey === "string") {
      selectedDateTasks = tasks.get(selectedDateKey) || [];
    }
  }

  return (
    <section className="calendar">
      <h1>Календарь</h1>
      <div className="calendar__main">
        <div className="calendar__header">
          <button onClick={handlePrevMonth}>
            <FaLeftLong />
          </button>
          <span className="calendar__date">
            {monthName.toUpperCase()} {year}
          </span>
          <button onClick={handleNextMonth}>
            <FaRightLong />
          </button>
        </div>

        <div className="calendar__grid">
          {daysOfWeek.map((day) => (
            <div key={day} className="calendar__weekday">
              {day}
            </div>
          ))}
          {calendarDays}
        </div>
      </div>

      {selectedDate && (
        <div className="calendar__task-panel">
          <h2>Задачи на {selectedDate.toLocaleDateString("ru-RU")}</h2>
          <ul className="calendar__task-list">
            {selectedDateTasks.length === 0 && (
              <li className="calendar__task-empty">Нет задач</li>
            )}
            {selectedDateTasks.map((task, idx) => (
              <li key={idx} className="calendar__task-item">
                {task}
                <button onClick={() => removeTask(idx)} title="Удалить задачу">
                  <FaX />
                </button>
              </li>
            ))}
          </ul>
          <div className="calendar__task-form">
            <input
                type="text"
                placeholder="Новая задача..."
                value={newTaskText}
                onChange={e => setNewTaskText(e.target.value)}
                onKeyDown={e => {
                  if (e.key === "Enter") addTask();
                }}
            />
            <button onClick={addTask}>Добавить</button>
          </div>
        </div>
      )}
    </section>
  );
};
