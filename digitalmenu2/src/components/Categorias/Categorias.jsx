import { MainContext } from '../../context/context';
import { DataGrid } from '@mui/x-data-grid';
import { useContext, useEffect, useState } from 'react';
import localePTBR from '../../util/locale';

import './categorias.css'

function Categorias(){
    const{listarCategorias} = useContext(MainContext);
    const[categorias, setCategorias] = useState([]);

    useEffect(() =>{
        listarCategorias().then((resp)=>{
            setCategorias(resp);
        });
    }, []);

    const columnCategorias = [
        {
            field:"idcategoria",
            headerName:"ID Categoria",
            minWidth:150,
            hideable:false,
            renderHeader:(params) => <strong>{params.colDef.headerName}</strong>
        },
        {
            field: "nome",
            headerName: "Nome",
            minWidth: 150,
            hideable: false,
            renderHeader: (params) => <strong>{params.colDef.headerName}</strong>
        },
        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            hideable: false,
            renderHeader: (params) => <strong>{params.colDef.headerName}</strong>
        },
    ]
    const getRowId = (row) =>{
        return row.idcategoria;
    }

    return(
        <>
            <div className="container-categoria">
                <div className='box border'>
                <DataGrid
                    columns={columnCategorias}
                    rows={categorias}
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

export default Categorias