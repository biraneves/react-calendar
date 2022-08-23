import {Avatar, Box, Button, Checkbox, FormControlLabel, Icon, IconButton, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";

const DAYS_OF_WEEK = [
    'DOM',
    'SEG',
    'TER',
    'QUA',
    'QUI',
    'SEX',
    'SÁB',
];

const useStyles = makeStyles({
    table: {
        borderTop: "1px solid rgb(224, 224, 224)",
        minHeight: "100%",
        "& td ~ td, & th ~ th": {
            borderLeft: "1px solid rgb(224, 224, 224)",
        },
    },
});

interface ICalendarCell {
    date: string;
}

function getToday(): string {
    return '2022-08-23';
}

function generateCalendar(date: string): ICalendarCell[][] {
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
            week.push({date: isoDate});
            currentDay.setDate(currentDay.getDate() + 1);
        }

        weeks.push(week);
    } while (currentDay.getMonth() === currentMonth);

    return weeks;
}

export function CalendarScreen() {
    const classes = useStyles();
    const weeks = generateCalendar(getToday());

    return (
        <Box display="flex" height="100%" alignItems="stretch">
            <Box borderRight="1px solid rgb(224, 224, 224" width="16em" padding="8px 14px">
                <h2>Agenda React</h2>
                <Button variant="contained" color="primary">Novo evento</Button>
                <Box marginTop="64px">
                    <h3>Agendas</h3>
                    <FormControlLabel control={<Checkbox />} label="Pessoal" />
                    <FormControlLabel control={<Checkbox />} label="Trabalho" />
                </Box>
            </Box>
            <TableContainer component="div">
                <Box display="flex" alignItems="center" padding="8px 16px">
                    <Box>
                        <IconButton aria-label="Mês anterior">
                            <Icon>chevron_left</Icon>
                        </IconButton>
                        <IconButton aria-label="Próximo mês">
                            <Icon>chevron_right</Icon>
                        </IconButton>
                    </Box>
                    <Box flex="1" component="h3" marginLeft="16px">Agosto de 2022</Box>
                    <IconButton>
                        <Avatar>
                            <Icon>person</Icon>
                        </Avatar>
                    </IconButton>
                </Box>
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
                                                        {cell.date}
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
    );
}