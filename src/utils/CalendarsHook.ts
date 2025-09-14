import {useMemo, useState} from "react";

const monthNames = [
    "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];
const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

function getDaysInMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfWeek(year: number, month: number) {
    const d = new Date(year, month, 1).getDay();
    return d === 0 ? 6 : d - 1;
}

export function useCalendarHook(initialDate = new Date()) {
    const [calendar, setCalendar] = useState({
        year: initialDate.getFullYear(),
        month: initialDate.getMonth(),
    });

    function prevMonth() {
        setCalendar(({year, month}) => {
            if (month === 0) {
                return {year: year - 1, month: 11};
            }
            return {year, month: month - 1};
        });
    }

    function nextMonth() {
        setCalendar(({year, month}) => {
            if (month === 11) {
                return {year: year + 1, month: 0};
            }
            return {year, month: month + 1};
        });
    }
    const calendarGrid = useMemo(() => {
        const daysInMonth = getDaysInMonth(calendar.year, calendar.month);
        const firstDayOfWeek = getFirstDayOfWeek(calendar.year, calendar.month)

        const cells: (number | null)[] = [];
        for (let i = 0; i < firstDayOfWeek; i++) cells.push(null);
        for (let d = 1; d <= daysInMonth; d++) cells.push(d);
        while (cells.length % 7 !== 0) cells.push(null);

        return cells;
    }, [calendar.year, calendar.month]);

    return {
        year: calendar.year,
        month: calendar.month,
        monthName: monthNames[calendar.month],
        weekDays,
        prevMonth,
        nextMonth,
        calendarGrid
    };
}