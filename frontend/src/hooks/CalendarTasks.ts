import { useState, useEffect } from "react";

export interface Task {
    text: string;
    completed: boolean;
}

export interface Tasks {
    [dateKey: string]: Task[];
}

export function CalendarTasks(year: number, month: number) {
    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const [taskText, setTaskText] = useState<string>("");
    const [tasks, setTasks] = useState<Tasks>(() => {
        try {
            const savedTasks = localStorage.getItem("calendarTasks");
            return savedTasks ? JSON.parse(savedTasks) : {};
        } catch {
            return {};
        }
    });
    const [editingTaskIndex, setEditingTaskIndex] = useState<number | null>(null);
    const [editingTaskText, setEditingTaskText] = useState<string>("");

    useEffect(() => {
        try {
            localStorage.setItem("calendarTasks", JSON.stringify(tasks));
        } catch (error) {
            console.error(error);
        }
    }, [tasks]);

    const selectedDateKey = selectedDay !== null ? `${year}-${month}-${selectedDay}` : null;

    const addTask = () => {
        if (!taskText.trim() || !selectedDateKey) return;
        setTasks((prev) => ({
            ...prev,
            [selectedDateKey]: [...(prev[selectedDateKey] || []), { text: taskText, completed: false }],
        }));
        setTaskText("");
    };

    const deleteTask = (taskIndex: number) => {
        if (!selectedDateKey) return;
        setTasks((prev) => {
            const currentTasks = prev[selectedDateKey] || [];
            const newTasksForDay = currentTasks.filter((_, i) => i !== taskIndex);
            return {
                ...prev,
                [selectedDateKey]: newTasksForDay,
            };
        });
    };

    const startEditing = (taskIndex: number, currentText: string) => {
        setEditingTaskIndex(taskIndex);
        setEditingTaskText(currentText);
    };

    const saveTask = () => {
        if (editingTaskIndex === null || !selectedDateKey) return;
        setTasks((prev) => {
            const currentTasks = prev[selectedDateKey] || [];
            const newTasksForDay = currentTasks.map((task, i) =>
                i === editingTaskIndex ? { ...task, text: editingTaskText } : task
            );
            return {
                ...prev,
                [selectedDateKey]: newTasksForDay,
            };
        });
        setEditingTaskText("");
        setEditingTaskIndex(null);
    };

    const toggleCompleted = (taskIndex: number) => {
        if (!selectedDateKey) return;
        setTasks((prev) => {
            const currentTasks = prev[selectedDateKey] || [];
            const newTasksForDay = currentTasks.map((task, i) =>
                i === taskIndex ? { ...task, completed: !task.completed } : task
            );
            return {
                ...prev,
                [selectedDateKey]: newTasksForDay,
            };
        });
    };

    const handleDayClick = (day: number | null) => {
        if (!day) return;
        if (day === selectedDay) setSelectedDay(null);
        else setSelectedDay(day);
    };

    const tasksForSelectedDay = selectedDateKey && tasks[selectedDateKey]
    ? tasks[selectedDateKey]
    : [];
    const hasTasksForSelectedDay =
        tasksForSelectedDay && tasksForSelectedDay.length > 0;

    return {
        selectedDay,
        setSelectedDay,
        taskText,
        setTaskText,
        tasks,
        setTasks,
        editingTaskIndex,
        setEditingTaskIndex,
        editingTaskText,
        setEditingTaskText,
        selectedDateKey,
        addTask,
        deleteTask,
        startEditing,
        saveTask,
        toggleCompleted,
        handleDayClick,
        tasksForSelectedDay,
        hasTasksForSelectedDay
    };
}