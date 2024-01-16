import * as React from "react";
import { useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";

import { url } from "../../shared/utils/common";

// Initial rows to populate the DataGrid
const initialRows = [
  {
    id: randomId(),
    name: "Gautam kumar Pandey",
    email: "gkp@gmail.com",
    phoneno: "9128931330",
    state: "Bihar",
  },
];

// Toolbar component for adding new users
function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  // Handle click event to add a new user
  const handleClick = () => {
    const id = randomId();
    // Add a new row with empty values and set edit mode for the new row
    setRows((oldRows) => [
      ...oldRows,
      { id, name: "", email: "", phoneno: "", state: "", isNew: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add User
      </Button>
    </GridToolbarContainer>
  );
}

// Main component for the CRUD grid
export default function DashboardPage() {
  // Fetch initial data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/users`);
        // Assign unique ids to each user and set as initial rows
        const usersWithUniqueIds = response.data.map((user) => ({
          ...user,
          id: randomId(),
        }));
        setRows(usersWithUniqueIds);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // State to manage the rows in the DataGrid
  const [rows, setRows] = React.useState(initialRows);
  // State to manage the edit modes of the rows
  const [rowModesModel, setRowModesModel] = React.useState({});

  // Handle row edit stop event
  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  // Handle click event to enter edit mode
  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  // Handle click event to save changes
  const handleSaveClick = (id) => async () => {
    // Log the save action and set the row mode to view mode
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  // Handle click event to delete a user
  const handleDeleteClick = (id) => async() => {
    // Find the row data based on the id
    const deletedRow = rows.find((row) => row.id === id);
  
    // Log the data before deletion
    console.log("Data to be deleted:", deletedRow);
    await axios.delete(`${url}/users/${deletedRow.email}`);
    // Perform the deletion
    setRows(rows.filter((row) => row.id !== id));
  };
  

  // Handle click event to cancel changes
  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      // Remove the new row if canceled
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  // Process row update and set the updated row in the state
  const processRowUpdate = async (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    try {
      const user = await axios.get(`${url}/users/${updatedRow.email}`);
      console.log("user ", user);
      if(user.data?.success){
        const response = await axios.put(
          `${url}/users/${updatedRow.email}`,
          updatedRow
        );
      }else{
        const response = await axios.post(`${url}/users`, updatedRow);
      }
      
    } catch (e) {
      console.error(e);
    }
    return updatedRow;
  };

  // Handle changes in row modes model
  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  // Columns configuration for the DataGrid
  const columns = [
    { field: "name", headerName: "Name", width: 340, editable: true },
    { field: "email", headerName: "Email", width: 440, editable: true },
    {
      field: "phoneno",
      headerName: "Phone no",
      width: 340,
      editable: true,
    },
    {
      field: "state",
      headerName: "state",
      width: 120,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 300,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  // Return the JSX for the component
  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}
