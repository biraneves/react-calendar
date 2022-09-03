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
import React, { useEffect, useState } from 'react';
import { createEventEndpoint, ICalendar, IEditingEvent } from './backend';

interface IEventFormDialogProps {
    event: IEditingEvent | null;
    calendars: ICalendar[];
    onCancel: () => void;
    onSave: () => void;
}

export function EventFormDialog(props: IEventFormDialogProps) {
    const { calendars } = props;

    const [event, setEvent] = useState<IEditingEvent | null>(props.event);

    useEffect(() => {
        setEvent(props.event);
    }, [props.event]);

    function save(evt: React.FormEvent) {
        evt.preventDefault();
        if (event) createEventEndpoint(event).then(props.onSave);
    }

    return (
        <div>
            <Dialog
                open={!!event}
                onClose={props.onCancel}
                aria-labelledby="form-dialog-title"
            >
                <form onSubmit={save}>
                    <DialogTitle id="form-dialog-title">
                        Criar evento
                    </DialogTitle>
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
                        <Button type="button" onClick={props.onCancel}>
                            Cancelar
                        </Button>
                        <Button type="submit" color="primary">
                            Salvar
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}
