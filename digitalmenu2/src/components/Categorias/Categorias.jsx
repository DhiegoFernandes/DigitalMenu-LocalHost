import { MainContext } from '../../context/context';
import { DataGrid } from '@mui/x-data-grid';
import { useContext, useEffect, useState } from 'react';
import { Modal } from '@mui/material';
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

    const [openMesa, setOpenMesa] = useState(false);
    const OpenMesa = () => setOpenMesa(true);
    const CloseMesa = () => setOpenMesa(false);

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
                        <button onClick={() => {OpenMesa()}}>Cadastrar Categoria</button>
                        <Modal
                        open={openMesa}
                        onClose={CloseMesa}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <div className='modal'>
                            <div className='btn-modal'>
                                <button className='btn-cancelar'>Cancelar</button>
                                <button className='btn-salvar'>Salvar</button>  
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        </>
    );
}

export default Categorias