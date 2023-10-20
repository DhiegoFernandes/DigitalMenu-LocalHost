import {useContext, useEffect, useState} from 'react';
import { MainContext } from '../../context/context';
import { DataGrid } from '@mui/x-data-grid';
import localePTBR from '../../util/locale';

import './mesas.css'

function Mesas(){

    const {listarMesas} = useContext(MainContext);

    const [mesas, setMesas] = useState([]);
  
    useEffect(() => {
      listarMesas().then((resp) => {
        setMesas(resp);
      });
    }, []);

    const colunmMesas = [
        {
            field: "idmesa",
            headerName: "ID Produto",
            minWidth: 250,
            hideable: false,
            renderHeader: (params) => <strong>{params.colDef.headerName}</strong>
        },
        {
            field: "status",
            headerName: "Status",
            minWidth: 250,
            hideable: false,
            renderHeader: (params) => <strong>{params.colDef.headerName}</strong>
        }
    ]
    const getRowId = (row) =>{
        return row.idmesa;
    }

    return(
        <>
            <div className="container-mesa">
                <div className='box'>
                <DataGrid
                    columns={colunmMesas}
                    rows={mesas}
                    getRowId={getRowId}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                        }}
                    pageSizeOptions={[5, 10]}
                    localeText={localePTBR}
                />
                </div>               
            </div>
        </>
    );
}

export default Mesas    