import { useState } from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, FormHelperText, FormControl, Select, InputLabel } from "@material-ui/core";

interface IEventFormDialogProps {
    open: boolean;
    onClose: () => void;
}

export function EventFormDialog(props: IEventFormDialogProps) {
    return (
        <div>
            <Dialog open={props.open} onClose={props.onClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Criar evento</DialogTitle>
                <DialogContent>
                    <TextField type="date" margin="normal" label="Data" fullWidth />
                    <TextField autoFocus margin="normal" label="Descrição" fullWidth />
                    <TextField type="time" margin="normal" label="Hora" fullWidth />
                    <FormControl margin="normal" fullWidth>
                        <InputLabel id="select-calendar">Agenda</InputLabel>
                        <Select labelId="select-calendar">
                            <MenuItem value={1}>Pessoal</MenuItem>
                            <MenuItem value={2}>Trabalho</MenuItem>
                        </Select>
                    </FormControl>
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