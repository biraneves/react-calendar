import {Avatar, Box, Button, Checkbox, FormControlLabel, Icon, IconButton, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getCalendarsEndpoint, getEventsEndpoint, ICalendar, IEvent } from "./backend";
import { formatMonth, DAYS_OF_WEEK, addMonths } from "./dateFunctions";

const useStyles = makeStyles({
    table: {
        borderTop: "1px solid rgb(224, 224, 224)",
        minHeight: "100%",
        tableLayout: "fixed",
        "& td ~ td, & th ~ th": {
            borderLeft: "1px solid rgb(224, 224, 224)",
        },
        "& td": {
            verticalAlign: "top",
            overflow: "hidden",
            padding: "8px 4px",
        }
    },
    dayOfMonth: {
        fontWeight: 500,
        marginBottom: "4px",
    },
    event: {
        display: "flex",
        alignItems: "center",
        background: "none",
        border: "none",
        cursor: "pointer",
        textAlign: "left",
        whiteSpace: "nowrap",
        margin: "4px 0",
    },
    eventBackground: {
        display: "inline-block",
        color: "white",
        padding: "2px 4px",
        borderRadius: "2px",
    }
});

type IEventWithCalendar = IEvent & { calendar: ICalendar };

interface ICalendarCell {
    date: string;
    dayOfMonth: number;
    events: IEventWithCalendar[];
}

function generateCalendar(date: string, allEvents: IEvent[], allCalendars: ICalendar[], calendarsSelected: boolean[]): ICalendarCell[][] {
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
            const monthStr: string = (currentDay.getMonth() + 1).toString().padStart(2, '0');
            const dateStr: string = currentDay.getDate().toString().padStart(2, '0');
            const isoDate: string = `${yearStr}-${monthStr}-${dateStr}`;

            const events: IEventWithCalendar[] = [];

            for (const event of allEvents) {
                if (event.date === isoDate) {
                    const calIndex = allCalendars.findIndex(cal => cal.id === event.calendarId);
                    if (calendarsSelected[calIndex]) {
                        events.push({ ...event, calendar: allCalendars[calIndex] });
                    }
                }
            }

            week.push({ date: isoDate, dayOfMonth: currentDay.getDate(), events, });
            currentDay.setDate(currentDay.getDate() + 1);
        }

        weeks.push(week);
    } while (currentDay.getMonth() === currentMonth);

    return weeks;
}

export function CalendarScreen() {
    const { month } = useParams<{ month: string }>();
    const classes = useStyles();
    const [events, setEvents] = useState<IEvent[]>([]);
    const [calendars, setCalendars] = useState<ICalendar[]>([]);
    const [calendarsSelected, setCalendarsSelected] = useState<boolean[]>([]);
    const weeks = generateCalendar(month + "-01", events, calendars, calendarsSelected);
    const firstDate: string = weeks[0][0].date;
    const lastDate: string = weeks[weeks.length - 1][6].date;

    useEffect(() => {
        Promise.all([
            getCalendarsEndpoint(),
            getEventsEndpoint(firstDate, lastDate)
        ]).then(([calendars, events]) => {
            setCalendarsSelected(calendars.map(() => true));
            setCalendars(calendars);
            setEvents(events);
        });
    }, [firstDate, lastDate]);

    function toggleCalendar(i: number) {
        const newValue: boolean[] = [...calendarsSelected];
        newValue[i] = !newValue[i];
        setCalendarsSelected(newValue);
    }

    return (
        <Box display="flex" height="100%" alignItems="stretch">
            <Box borderRight="1px solid rgb(224, 224, 224)" width="14em" padding="8px 14px">
                <h2>Agenda React</h2>
                <Button variant="contained" color="primary">Novo evento</Button>
                <Box marginTop="64px">
                    <h3>Agendas</h3>
                    {
                        calendars.map((calendar, i) => {
                            return (
                                <div key={calendar.id}>
                                    <FormControlLabel control={<Checkbox style={{color: calendar.color}} checked={calendarsSelected[i]} onChange={() => toggleCalendar(i)} />} label={calendar.name} />
                                </div>
                            );
                        })
                    }
                </Box>
            </Box>
            <Box display="flex" flex="1" flexDirection="column">
                <Box display="flex" alignItems="center" padding="8px 16px">
                    <Box>
                        <IconButton aria-label="Mês anterior" component={Link} to={'/calendar/' + addMonths(month, -1)}>
                            <Icon>chevron_left</Icon>
                        </IconButton>
                        <IconButton aria-label="Próximo mês" component={Link} to={'/calendar/' + addMonths(month, +1)}>
                            <Icon>chevron_right</Icon>
                        </IconButton>
                    </Box>
                    <Box flex="1" component="h3" marginLeft="16px">{ formatMonth(month) }</Box>
                    <IconButton>
                        <Avatar>
                            <Icon>person</Icon>
                        </Avatar>
                    </IconButton>
                </Box>
                <TableContainer style={{ flex: "1" }} component="div">
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            {
                                DAYS_OF_WEEK.map(day => {
                                    return <TableCell align="center" key={day}>{day}</TableCell>;
                                })
                            }
                        </TableHead>
                        <TableBody>
                            {
                                weeks.map((week, i) => {
                                    return (
                                        <TableRow key={i}>
                                            {
                                                week.map(cell => {
                                                    return (
                                                        <TableCell align="center" key={cell.date}>
                                                            <div className={classes.dayOfMonth}>{cell.dayOfMonth}</div>
                                                            {
                                                                cell.events.map(event => {
                                                                    const color = event.calendar.color;

                                                                    return (
                                                                        <button key={event.id} className={classes.event}>
                                                                            {event.time && (
                                                                                <>
                                                                                    <Icon style={{ color }} fontSize="inherit">watch_later</Icon>
                                                                                    <Box component="span" margin="0 4px">{event.time}</Box>
                                                                                </>
                                                                            )}
                                                                            {event.time ? <span>{event.desc}</span> : <div className={classes.eventBackground} style={{backgroundColor: color}}>{event.desc}</div>}
                                                                            
                                                                        </button>
                                                                    );
                                                                })
                                                            }
                                                        </TableCell>
                                                    );
                                                })
                                            }
                                        </TableRow>
                                    );
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
}