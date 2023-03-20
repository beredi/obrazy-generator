import { Box, Button, Checkbox } from "@mui/material";
import { DeleteForeverOutlined } from "@mui/icons-material";

export type RecordType = {
  id: number;
  naziv: string;
  tehnika: string;
  dimenzija: string;
  autor: string;
  tel: string;
  cena: string;
};

interface Props {
  record: RecordType;
  handleRemove: (id: number) => void;
  selected: boolean;
  onChange: (record: RecordType) => void;
}

export const Record = ({ record, handleRemove, selected, onChange }: Props) => {
  return (
    <Box
      sx={{
        border: "1px solid black",
        padding: "5px",
      }}
    >
      <Checkbox
        value={selected}
        onChange={() => onChange(record)}
        color={"warning"}
      />
      <p>Naziv: {record.naziv}</p>
      <p>Tehnika: {record.tehnika}</p>
      <p>Dimenzija: {record.dimenzija}</p>
      <p>Autor: {record.autor}</p>
      <p>Tel: {record.tel}</p>
      <p>Cena: {record.cena}</p>
      <Button
        color={"error"}
        variant={"outlined"}
        onClick={() => handleRemove(record.id)}
      >
        <DeleteForeverOutlined />
      </Button>
    </Box>
  );
};
