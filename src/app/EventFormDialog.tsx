import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, FormControl, Select, InputLabel } from "@material-ui/core";
import { useState } from "react";
import { ICalendar } from "./backend";

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

    return (
        <div>
            <Dialog open={!!event} onClose={props.onClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Criar evento</DialogTitle>
                <DialogContent>
                    {event &&
                        <>
                            <TextField type="date" margin="normal" label="Data" fullWidth value={event.date} />
                            <TextField autoFocus margin="normal" label="Descrição" fullWidth value={event.desc} />
                            <TextField type="time" margin="normal" label="Hora" fullWidth value={event.time} />
                            <FormControl margin="normal" fullWidth>
                                <InputLabel id="select-calendar">Agenda</InputLabel>
                                <Select labelId="select-calendar" value={event.calendarId}>
                                    {calendars.map(calendar => <MenuItem key={calendar.id} value={calendar.id}>{calendar.name}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </>
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onClose}>
                        Cancelar
                    </Button>
                    <Button onClick={props.onClose} color="primary">
                        Salvar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}