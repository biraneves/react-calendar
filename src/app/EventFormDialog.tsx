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
import React, { useEffect, useRef, useState } from 'react';
import { createEventEndpoint, ICalendar, IEditingEvent } from './backend';

interface IEventFormDialogProps {
    event: IEditingEvent | null;
    calendars: ICalendar[];
    onCancel: () => void;
    onSave: () => void;
}

interface IValidationErrors {
    [field: string]: string;
}

export function EventFormDialog(props: IEventFormDialogProps) {
    const { calendars } = props;

    const [event, setEvent] = useState<IEditingEvent | null>(props.event);
    const [errors, setErrors] = useState<IValidationErrors>({});

    const inputDate = useRef<HTMLInputElement | null>();
    const inputDesc = useRef<HTMLInputElement | null>();

    useEffect(() => {
        setEvent(props.event);
        setErrors({});
    }, [props.event]);

    function validate(): boolean {
        if (event) {
            const currentErrors: IValidationErrors = {};
            if (!event.date) {
                currentErrors['date'] = 'A data deve ser preenchida';
                inputDate.current?.focus();
            }
            if (!event.desc) {
                currentErrors['desc'] = 'A descrição deve ser preenchida';
                inputDesc.current?.focus();
            }
            setErrors(currentErrors);
            return Object.keys(currentErrors).length === 0;
        }

        return false;
    }

    function save(evt: React.FormEvent) {
        evt.preventDefault();
        if (event) {
            if (validate()) {
                createEventEndpoint(event).then(props.onSave);
            }
        }
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
                                    inputRef={inputDate}
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
                                    error={!!errors.date}
                                    helperText={errors.date}
                                />
                                <TextField
                                    inputRef={inputDesc}
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
                                    error={!!errors.desc}
                                    helperText={errors.desc}
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
