import { useContext, useEffect, useState } from 'react';
import { MainContext } from '../../context/context';
import { DataGrid } from '@mui/x-data-grid';
import localePTBR from '../../util/locale';

import './pedidos.css'

function Pedidos(){

        const {listarPedidos} = useContext(MainContext);
    
        const [pedidos, setPedidos] = useState([]);
      
        useEffect(() => {
          listarPedidos().then((resp) => {
            setPedidos(resp);
          });
        }, []);
    
        const columnPedidos = [
            {
                field: "idpedido",
                headerName: "ID Pedido",
                minWidth: 90,
                hideable: false,
                renderHeader: (params) => <strong>{params.colDef.headerName}</strong>
            },
            {
                field: "id_mesa",
                headerName: "ID Mesa",
                minWidth: 90,
                hideable: false,
                renderHeader: (params) => <strong>{params.colDef.headerName}</strong>
            },
            {
                field: "total",
                headerName: "Total",
                minWidth: 100,
                hideable: false,
                renderHeader: (params) => <strong>{params.colDef.headerName}</strong>
            },
            {
                field: "data",
                headerName: "Data",
                minWidth: 150,
                hideable: false,
                renderHeader: (params) => <strong>{params.colDef.headerName}</strong>
            },
            {
                field: "horario",
                headerName: "Horario",
                minWidth: 50,
                hideable: false,
                renderHeader: (params) => <strong>{params.colDef.headerName}</strong>
            },
            {
                field: "status",
                headerName: "Status",
                minWidth: 150,
                hideable: false,
                renderHeader: (params) => <strong>{params.colDef.headerName}</strong>
            }
          ]
        
          const getRowId = (row) =>{
            return row.idpedido;
          }

    return(
        <>
            <div className="container-pedido">
                <div className='box'>
                <DataGrid
                    columns={columnPedidos}
                    rows={pedidos}
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

export default Pedidos