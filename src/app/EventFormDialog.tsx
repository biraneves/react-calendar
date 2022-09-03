import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    FormControl,
    Select,
    InputLabel,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import { ICalendar } from './backend';

export interface IEditingEvent {
    id?: number;
    date: string;
    time?: string;
    desc: string;
    calendarId: number;
}

interface IEventFormDialogProps {
    event: IEditingEvent | null;
    calendars: ICalendar[];
    onClose: () => void;
}

export function EventFormDialog(props: IEventFormDialogProps) {
    const { calendars } = props;

    const [event, setEvent] = useState<IEditingEvent | null>(props.event);

    useEffect(() => {
        setEvent(props.event);
    }, [props.event]);

    return (
        <div>
            <Dialog
                open={!!event}
                onClose={props.onClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Criar evento</DialogTitle>
                <DialogContent>
                    {event && (
                        <>
                            <TextField
                                type="date"
                                margin="normal"
                                label="Data"
                                fullWidth
                                value={event.date}
                                onChange={(evt) =>
                                    setEvent({
                                        ...event,
                                        date: evt.target.value,
                                    })
                                }
                            />
                            <TextField
                                autoFocus
                                margin="normal"
                                label="Descrição"
                                fullWidth
                                value={event.desc}
                                onChange={(evt) =>
                                    setEvent({
                                        ...event,
                                        desc: evt.target.value,
                                    })
                                }
                            />
                            <TextField
                                type="time"
                                margin="normal"
                                label="Hora"
                                fullWidth
                                value={event.time ?? ''}
                                onChange={(evt) =>
                                    setEvent({
                                        ...event,
                                        time: evt.target.value,
                                    })
                                }
                            />
                            <FormControl margin="normal" fullWidth>
                                <InputLabel id="select-calendar">
                                    Agenda
                                </InputLabel>
                                <Select
                                    labelId="select-calendar"
                                    value={event.calendarId}
                                    onChange={(evt) =>
                                        setEvent({
                                            ...event,
                                            calendarId: evt.target
                                                .value as number,
                                        })
                                    }
                                >
                                    {calendars.map((calendar) => (
                                        <MenuItem
                                            key={calendar.id}
                                            value={calendar.id}
                                        >
                                            {calendar.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onClose}>Cancelar</Button>
                    <Button onClick={props.onClose} color="primary">
                        Salvar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
