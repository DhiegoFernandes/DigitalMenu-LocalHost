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
        },
        {
            field: "actions",
            headerName: "Ações",
            minWidth: 200,
            hideable: false,
            renderHeader: (params) => <strong>{params.colDef.headerName}</strong>,
            renderCell: (params) => (
                <div className='btn-actions'>
                    <button><i className='material-symbols-outlined'>check</i></button>
                    <button><i className='material-symbols-outlined'>delete</i></button>
                </div>
            ) 
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
                <div className='btn-cadastro-mesa'>
                    <button>Cadastrar Mesa</button>
                </div>             
            </div>
        </>
    );
}

export default Mesas    