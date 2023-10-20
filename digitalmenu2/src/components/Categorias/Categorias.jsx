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
        {
            field: "actions",
            headerName: "Ações",
            minWidth: 200,
            hideable: false,
            renderHeader: (params) => <strong>{params.colDef.headerName}</strong>,
            renderCell: (params) => (
                <div className='btn-actions'>
                    <button><i className='material-symbols-outlined'>edit</i></button>
                    <button><i className='material-symbols-outlined'>delete</i></button>
                </div>
            ) 
        }
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
                <div className='btn-cadastro-categoria'>
                        <button>Cadastrar Categoria</button>
                </div>
            </div>
        </>
    );
}

export default Categorias