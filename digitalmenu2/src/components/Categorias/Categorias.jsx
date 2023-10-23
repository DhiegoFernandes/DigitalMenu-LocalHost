import { MainContext } from '../../context/context';
import { DataGrid } from '@mui/x-data-grid';
import { useContext, useEffect, useState } from 'react';
import { Modal } from '@mui/material';
import localePTBR from '../../util/locale';

import './categorias.css'

function Categorias(){
    
    const{listarCategorias, cadastrarCategoria, ativarCategoria, desativarCategoria} = useContext(MainContext);

    const[categorias, setCategorias] = useState([]);
    const [categoria, setCategoria] = useState("");
    const [idCategoria, setIdCategoria] = useState("");

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
                    <button onClick={() => {setIdCategoria(params.row.idcategoria); OpenCatAtivar()}}><i className='material-symbols-outlined'>check</i></button>
                    <button onClick={() => {setIdCategoria(params.row.idcategoria); OpenCatDesativar()}}><i className='material-symbols-outlined'>delete</i></button>
                </div>
            ) 
        }
    ]
    const getRowId = (row) =>{
        return row.idcategoria;
    }

    const [openCat, setOpenCat] = useState(false);
    const OpenCat = () => setOpenCat(true);
    const CloseCat = () => setOpenCat(false);

    const [openCatAtivar, setOpenCatAtivar] = useState(false);
    const OpenCatAtivar = () => setOpenCatAtivar(true);
    const CloseCatAtivar = () => setOpenCatAtivar(false);
    
    const [openCatDesativar, setOpenCatDesativar] = useState(false);
    const OpenCatDesativar = () => setOpenCatDesativar(true);
    const CloseCatDesativar = () => setOpenCatDesativar(false);

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
                        <button onClick={() => {OpenCat()}}>Cadastrar Categoria</button>
                        
                        {/* CADASTRAR */}
                        <Modal
                        open={openCat}
                        onClose={CloseCat}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <div className='modal'>
                            <div className='btn-modal'>
                                <p>Cadastrar categoria</p>
                                <input 
                                    type="text" 
                                    autoFocus
                                    placeholder='categoria'
                                    value={categoria}
                                    onChange={(e) => setCategoria(e.target.value)}
                                />
                                <button className='btn-cancelar' onClick={() => CloseCat()}>Cancelar</button>
                                <button className='btn-salvar' onClick={(e) => {cadastrarCategoria(e, categoria); CloseCat()}}>Salvar</button>  
                            </div>
                        </div>
                    </Modal>

                    {/* ATIVAR */}
                    <Modal
                        open={openCatAtivar}
                        onClose={CloseCatAtivar}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <div className='modal'>
                            <div className='btn-modal'>
                                <p>Tem certeza que deseja ativar?</p>
                                <button className='btn-cancelar' onClick={() => CloseCatAtivar()}>Não</button>
                                <button className='btn-salvar' onClick={(e) => {ativarCategoria(e, idCategoria); CloseCatAtivar()}}>Sim</button>  
                            </div>
                        </div>
                    </Modal>

                    {/* DESATIVAR */}
                    <Modal
                        open={openCatDesativar}
                        onClose={CloseCatDesativar}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <div className='modal'>
                            <div className='btn-modal'>
                                <p>Tem certeza que deseja desativar?</p>
                                <button className='btn-cancelar' onClick={() => CloseCatDesativar()}>Não</button>
                                <button className='btn-salvar' onClick={(e) => {desativarCategoria(e, idCategoria); CloseCatDesativar()}}>Sim</button>  
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        </>
    );
}

export default Categorias