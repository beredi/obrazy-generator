import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { RecordType } from "./Record";
import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  handleAddNew: (record: RecordType) => void;
}

export const AddNew = ({ open, onClose, handleAddNew }: Props) => {
  const [naziv, setNaziv] = useState<string>("");
  const [tel, setTel] = useState<string>("");
  const [tehnika, setTehnika] = useState<string>("");
  const [dimenzija, setDimenzija] = useState<string>("");
  const [autor, setAutor] = useState<string>("");
  const [cena, setCena] = useState<string>("");

  const addNewHandler = () => {
    const record: RecordType = {
      id: Date.now(),
      naziv: naziv,
      tehnika: tehnika,
      autor: autor,
      dimenzija: dimenzija,
      tel: tel,
      cena: cena,
    };

    handleAddNew(record);
    closeHandler();
  };

  const closeHandler = () => {
    setCena("");
    setTel("");
    setNaziv("");
    setDimenzija("");
    setAutor("");
    setTehnika("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={closeHandler}>
      <DialogTitle>Pridať nový záznam</DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              name="naziv"
              id="naziv"
              type={"text"}
              margin="dense"
              label="Naziv"
              value={naziv}
              onChange={(event) => setNaziv(event.target.value)}
              fullWidth={true}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="tehnika"
              id="tehnika"
              type={"text"}
              margin="dense"
              label="Tehnika"
              value={tehnika}
              onChange={(event) => setTehnika(event.target.value)}
              fullWidth={true}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="dimenzija"
              id="dimenzija"
              type={"text"}
              margin="dense"
              label="Dimenzija"
              value={dimenzija}
              onChange={(event) => setDimenzija(event.target.value)}
              fullWidth={true}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="autor"
              id="autor"
              type={"text"}
              margin="dense"
              label="Autor"
              value={autor}
              onChange={(event) => setAutor(event.target.value)}
              fullWidth={true}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="tel"
              id="tel"
              type={"text"}
              margin="dense"
              label="Tel"
              value={tel}
              onChange={(event) => setTel(event.target.value)}
              fullWidth={true}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="cena"
              id="cena"
              type={"text"}
              margin="dense"
              label="Cena"
              value={cena}
              onChange={(event) => setCena(event.target.value)}
              fullWidth={true}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={addNewHandler} color={"success"}>
          Pridať
        </Button>
        <Button variant="contained" onClick={closeHandler} color={"error"}>
          Zrušiť
        </Button>
      </DialogActions>
    </Dialog>
  );
};
