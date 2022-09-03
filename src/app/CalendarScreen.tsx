import { Box, Button } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import {
    getCalendarsEndpoint,
    getEventsEndpoint,
    ICalendar,
    IEvent,
} from './backend';
import { DAYS_OF_WEEK, getToday } from './dateFunctions';
import { CalendarsView } from './CalendarsView';
import { CalendarHeader } from './CalendarHeader';
import { Calendar } from './Calendar';
import { ICalendarCell, IEventWithCalendar } from './Calendar';
import { EventFormDialog } from './EventFormDialog';
import { IEditingEvent } from './backend';

function generateCalendar(
    date: string,
    allEvents: IEvent[],
    allCalendars: ICalendar[],
    calendarsSelected: boolean[],
): ICalendarCell[][] {
    const weeks: ICalendarCell[][] = [];
    const jsDate: Date = new Date(`${date}T12:00:00`);
    const currentMonth: number = jsDate.getMonth();

    const currentDay: Date = new Date(jsDate.valueOf());
    currentDay.setDate(1);
    const dayOfWeek: number = currentDay.getDay();
    currentDay.setDate(1 - dayOfWeek);

    do {
        const week: ICalendarCell[] = [];

        for (let i = 0; i < DAYS_OF_WEEK.length; i++) {
            const yearStr: string = currentDay.getFullYear().toString();
            const monthStr: string = (currentDay.getMonth() + 1)
                .toString()
                .padStart(2, '0');
            const dateStr: string = currentDay
                .getDate()
                .toString()
                .padStart(2, '0');
            const isoDate: string = `${yearStr}-${monthStr}-${dateStr}`;

            const events: IEventWithCalendar[] = [];

            for (const event of allEvents) {
                if (event.date === isoDate) {
                    const calIndex = allCalendars.findIndex(
                        (cal) => cal.id === event.calendarId,
                    );
                    if (calendarsSelected[calIndex]) {
                        events.push({
                            ...event,
                            calendar: allCalendars[calIndex],
                        });
                    }
                }
            }

            week.push({
                date: isoDate,
                dayOfMonth: currentDay.getDate(),
                events,
            });
            currentDay.setDate(currentDay.getDate() + 1);
        }

        weeks.push(week);
    } while (currentDay.getMonth() === currentMonth);

    return weeks;
}

export function CalendarScreen() {
    const { month } = useParams<{ month: string }>();
    const [events, setEvents] = useState<IEvent[]>([]);
    const [calendars, setCalendars] = useState<ICalendar[]>([]);
    const [calendarsSelected, setCalendarsSelected] = useState<boolean[]>([]);
    const [editingEvent, setEditingEvent] = useState<IEditingEvent | null>(
        null,
    );
    const weeks = generateCalendar(
        month + '-01',
        events,
        calendars,
        calendarsSelected,
    );
    const firstDate: string = weeks[0][0].date;
    const lastDate: string = weeks[weeks.length - 1][6].date;

    useEffect(() => {
        Promise.all([
            getCalendarsEndpoint(),
            getEventsEndpoint(firstDate, lastDate),
        ]).then(([calendars, events]) => {
            setCalendarsSelected(calendars.map(() => true));
            setCalendars(calendars);
            setEvents(events);
        });
    }, [firstDate, lastDate]);

    function refreshEvents() {
        getEventsEndpoint(firstDate, lastDate).then(setEvents);
    }

    function toggleCalendar(i: number) {
        const newValue: boolean[] = [...calendarsSelected];
        newValue[i] = !newValue[i];
        setCalendarsSelected(newValue);
    }

    function openNewEvent(date: string) {
        setEditingEvent({
            date,
            desc: '',
            calendarId: calendars[0].id,
        });
    }

    return (
        <Box display="flex" height="100%" alignItems="stretch">
            <Box
                borderRight="1px solid rgb(224, 224, 224)"
                width="14em"
                padding="8px 14px"
            >
                <h2>Agenda React</h2>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => openNewEvent(getToday())}
                >
                    Novo evento
                </Button>
                <CalendarsView
                    calendars={calendars}
                    toggleCalendar={toggleCalendar}
                    calendarsSelected={calendarsSelected}
                />
            </Box>
            <Box display="flex" flex="1" flexDirection="column">
                <CalendarHeader month={month} />
                <Calendar weeks={weeks} onClickDay={openNewEvent} onClickEvent={setEditingEvent} />
                <EventFormDialog
                    event={editingEvent}
                    onCancel={() => setEditingEvent(null)}
                    onSave={() => {
                        setEditingEvent(null);
                        refreshEvents();
                    }}
                    calendars={calendars}
                />
            </Box>
        </Box>
    );
}
