import React, { useMemo, useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import { Record, RecordType } from "./Record";
import { AddNew } from "./AddNew";
import {
  AddOutlined,
  ClearAllOutlined,
  DownloadOutlined,
  SelectAllOutlined,
} from "@mui/icons-material";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PDFFile } from "./PDFFile";

function App() {
  const recordsFromStorage: string | null =
    localStorage.getItem("localRecords");
  const [recordsState, setRecordsState] = useState<RecordType[]>(
    recordsFromStorage !== null ? JSON.parse(recordsFromStorage) : []
  );
  const [selectedRecords, setSelectedRecords] = useState<RecordType[]>([]);

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const addNew = async (newRecord: RecordType) => {
    const newList = [...recordsState, newRecord];
    setRecordsState(newList);
    localStorage.setItem("localRecords", JSON.stringify(newList));
  };

  const removeItem = (id: number) => {
    const newList = recordsState.filter((record) => record.id !== id);
    setRecordsState(newList);
    localStorage.setItem("localRecords", JSON.stringify(newList));
  };

  const onChangeSelected = (record: RecordType) => {
    if (selectedRecords.some((item) => item.id === record.id)) {
      setSelectedRecords((prevState) => {
        return prevState.filter(
          (selectedItem) => selectedItem.id !== record.id
        );
      });
    } else {
      setSelectedRecords((prevState) => {
        return [...prevState, record];
      });
    }
  };

  const checkSelectedAll = () => {
    return selectedRecords.length === recordsState.length;
  };

  const selectAll = () => {
    setSelectedRecords(checkSelectedAll() ? [] : recordsState);
  };

  const checkSelected = (record: RecordType) => {
    return selectedRecords.some(
      (selectedRecord) => selectedRecord.id === record.id
    );
  };

  return (
    <div className="App">
      <Box
        sx={{
          padding: "10px",
        }}
      >
        <Button color={"warning"} variant="outlined" onClick={selectAll}>
          {checkSelectedAll() ? (
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ClearAllOutlined /> Odobrať všetky
            </Box>
          ) : (
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <SelectAllOutlined /> Vybrať všetky
            </Box>
          )}
        </Button>
        <Button
          variant="contained"
          onClick={() => setOpenDialog(true)}
          sx={{ marginLeft: "10px" }}
        >
          <AddOutlined /> Nový záznam
        </Button>
        <PDFDownloadLink
          document={<PDFFile records={selectedRecords} />}
          fileName="ZOZNAM"
          style={{ textDecoration: "none" }}
        >
          {({ loading, error }) =>
            loading ? (
              "Loading document"
            ) : (
              <Button
                variant={"contained"}
                color={"success"}
                sx={{ marginLeft: "10px" }}
              >
                <DownloadOutlined /> PDF
              </Button>
            )
          }
        </PDFDownloadLink>
      </Box>
      <Grid container spacing={2}>
        {recordsState.map((record, index) => {
          return (
            <Grid item xs={4} key={index}>
              <Record
                record={record}
                handleRemove={removeItem}
                selected={checkSelected(record)}
                onChange={onChangeSelected}
              />
            </Grid>
          );
        })}
      </Grid>
      <AddNew
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        handleAddNew={addNew}
      />
    </div>
  );
}

export default App;
