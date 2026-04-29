import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import { Card,Button as MuiButton} from '@mui/material';
import { getUCID } from 'api/data';
import Loading from '@/layouts/Loading';
import Error2 from '@/layouts/Error2';
import { useParams, NavLink } from 'react-router';
import { useState, useEffect } from 'react';
import { RemoveRedEye } from '@mui/icons-material';
import { IconButton, Tooltip, Chip as MuiChip } from '@mui/material';
import { getAllClients } from 'api/clients';
import styled from "@emotion/styled";
import { spacing } from "@mui/system";
import { orange, green, red } from '@mui/material/colors';
import { GridToolbarContainer } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import {Cancel as CancelIcon } from '@mui/icons-material';
import SaveIcon from '@mui/icons-material/Save';

const Button = styled(MuiButton)(spacing);

const processRowUpdate = async (newRow) => {
  const rowToSave = { ...newRow, isNew: false };

  try {
    await fetch('/api/clients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(rowToSave),
    });

    await fetchData(); // reload from backend
    setIsAdding(false);
    return rowToSave;
  } catch (err) {
    console.error(err);
    throw err; // keeps row in edit mode
  }
};

function EditToolbar({ setRows, setRowModesModel, isAdding, setIsAdding }) {
  const handleAdd = () => {
    const id = Date.now();

    setRows((old) => [
      ...old,
      { id, name: '', active: '', isNew: true },
    ]);

    setRowModesModel((old) => ({
      ...old,
      [id]: { mode: 'edit', fieldToFocus: 'name' },
    }));

    setIsAdding(true);
  };

  const handleSave = () => {
    // just exit edit mode — processRowUpdate will fire
    setRowModesModel((old) => {
      const updated = { ...old };
      Object.keys(updated).forEach((id) => {
        updated[id] = { mode: 'view' };
      });
      return updated;
    });

    setIsAdding(false);
  };

  const handleCancel = () => {
  setRows((prev) => prev.filter((r) => !r.isNew));

  setRowModesModel((prev) => {
    const updated = { ...prev };

    Object.keys(updated).forEach((id) => {
      if (updated[id]?.mode === 'edit') {
        delete updated[id]; // 👈 remove stale row id
      }
    });

    return updated;
  });

  setIsAdding(false);
};

  return (
    <GridToolbarContainer sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      {!isAdding ? (
        <Tooltip title="Add client">
          <IconButton onClick={handleAdd}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <>
          <Tooltip title="Save">
            <IconButton onClick={handleSave}>
              <SaveIcon color="primary" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Cancel">
            <IconButton onClick={handleCancel}>
              <CancelIcon color="error" />
            </IconButton>
          </Tooltip>
        </>
      )}
    </GridToolbarContainer>
  );
}

const Chip = styled(MuiChip)`
  ${spacing};

  background: ${(props) => props.active && green[500]};
  background: ${(props) => props.inactive && orange[700]};
  color: ${(props) =>
    (props.active || props.inactive) && props.theme.palette.common.white};
`;


export default function NewClients({isAdding, setIsAdding}) {

  const columns = [
  { field: "name", headerName: "Client Name", width: 350, editable: true, visible:false},
  { field: "active", headerName: "Status", width: 150, editable: true,
    renderCell:(value) => {return <Button style={{Color: value.row.active==0&&red[700]}}> {value.row.active==1?"Active":"Inactive"}
                          </Button>}
   },
  { field: "settings", headerName: "Settings", width: 150, editable: true,
    renderCell: (value) => {return <IconButton aria-label="details" component={NavLink} to={`/${value.row.id}/${value.row.name}/settings`} size="large"
                              //state = {{ id }}                 
                            >
                               <RemoveRedEye />
                               </IconButton>} },
];

  const [rows, setRows] = useState([]);
  const [error, setError] = useState()
  const [rowModesModel, setRowModesModel] = useState({});
  const [status, setStatus] = useState('idle')
  
  const fetchData = async () => {
      setStatus('loading')
      try{
      const resp = await getAllClients();
      setRows(resp)
      console.log(resp)
      setStatus("success")
      } catch(err){
      setError(err.message);
      setStatus('error')
      }
  }
  useEffect(() => {
      fetchData();
  }, []);
    
  if(status=='loading') return <Loading />
  if(status=='error') return <Error2/>
  if(status=='success')

  return (
    <Card>
    <div style={{ height: '650px', width: '100%' }}>
            <DataGrid
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 50,
                  },
                },
              }}
              rows={rows}
              columns={columns}
              editMode="row"
              rowModesModel={rowModesModel}
              onRowModesModelChange={setRowModesModel}
              processRowUpdate={processRowUpdate}
              //slots={{ toolbar: EditToolbar }}
              slotProps={{
                toolbar: {
                  setRows,
                  setRowModesModel,
                  isAdding,
                  setIsAdding,
                },
              }}
            />
      </div>
    </Card>
  );
}