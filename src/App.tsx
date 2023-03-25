import React, { useState } from "react";
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
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [editRecord, setEditRecord] = useState<RecordType | null>(null);

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

  const handleOnEdit = (id: number) => {
    const recordForEdit = recordsState.find((record) => record.id === id);
    if (recordForEdit) {
      setEditRecord(recordForEdit);
      setOpenEditDialog(true);
    }
  };

  const closeEditDialog = () => {
    setEditRecord(null);
    setOpenEditDialog(false);
  };

  const handleEditRecord = (record: RecordType) => {
    const newList = [...recordsState];
    const index = newList.findIndex(
      (editRecordIndex) => editRecordIndex.id === record.id
    );
    newList[index] = { ...record };
    setRecordsState(newList);
    localStorage.setItem("localRecords", JSON.stringify(newList));
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
          {({ loading }) =>
            loading ? (
              "Loading document"
            ) : (
              <Button
                variant={"contained"}
                color={"success"}
                sx={{ marginLeft: "10px" }}
                disabled={selectedRecords.length === 0}
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
                handleOnEdit={handleOnEdit}
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
      {editRecord && (
        <AddNew
          open={openEditDialog}
          onClose={closeEditDialog}
          handleEdit={handleEditRecord}
          editRecord={editRecord}
        />
      )}
    </div>
  );
}

export default App;
