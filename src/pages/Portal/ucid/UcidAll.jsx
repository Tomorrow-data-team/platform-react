import { DataGrid } from '@mui/x-data-grid';
import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';

const VISIBLE_FIELDS = ['Channel', 'Campaign_name', 'UCID'];

export default function UcidAll() {
    const [ucid, setUCID] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    axios.get('http://127.0.0.1:5000/ucid/all')
        .then(response => {
        setUCID(response.data);
        setLoading(false)
        })
        .catch(error => {
        console.error(error);
        });
    }, []);

  return (
    <div style={{ height: 400, width: '100%' }}>
      {ucid?<DataGrid {...ucid} loading={loading} showToolbar/>:<></>}
    </div>
  );
}