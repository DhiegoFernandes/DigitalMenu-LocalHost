import { MainContext } from '../../context/context';
import { DataGrid } from '@mui/x-data-grid';
import { useContext, useEffect, useState } from 'react';
import { Modal } from '@mui/material';
import localePTBR from '../../util/locale';

import './categorias.css'
import '../Modal/modal_componentes.css';

function Categorias(){
    const{listarCategorias, cadastrarCategoria, ativarCategoria, desativarCategoria} = useContext(MainContext);

    const[categorias, setCategorias] = useState([]);
    const [categoria, setCategoria] = useState("");
    const [idCategoria, setIdCategoria] = useState("");
    const [updateCategorias, setUpdateCategorias] = useState(true);

    useEffect(() =>{
        if(updateCategorias){
            listarCategorias().then((resp)=>{
            setCategorias(resp);
            setUpdateCategorias(false);
            });
        }
    }, [updateCategorias]);

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
                <div className='tabela-categorias'>
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

                                <div className='modal-cadastrar'>
                                    <p>Cadastrar categoria</p>
                                    <div className='form_div marg-grande'>
                                        <input
                                            className='inputAnimado'
                                            type="text"
                                            placeholder='categoria'
                                            required=""
                                            autoFocus
                                            value={categoria}
                                            onChange={(e) => setCategoria(e.target.value)}
                                        /><label htmlFor="name" className="form__label">Nome da categoria</label>
                                    </div>
                                    <button className='btn-cancelar  marg-media' onClick={() => CloseCat()}>Cancelar</button>
                                    <button className='btn-salvar  marg-pequena' onClick={(e) => { cadastrarCategoria(e, categoria); CloseCat(); setUpdateCategorias(true);}}>Salvar</button>
                                </div>

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
                                <div className='modal-ativar'>
                                    <p>Tem certeza que deseja ativar?</p>
                                    <div className='botoes-sim-nao marg-grande'>
                                        <button className='btn-cancelar' onClick={() => CloseCatAtivar()}>Não</button>
                                        <button className='btn-salvar' onClick={(e) => { ativarCategoria(e, idCategoria); CloseCatAtivar(); setUpdateCategorias(true); }}>Sim</button>
                                    </div>
                                </div>

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
                                <div className='modal-desativar'>
                                    <p>Tem certeza que deseja desativar?</p>
                                    <div className='botoes-sim-nao marg-grande'>
                                        <button className='btn-cancelar' onClick={() => CloseCatDesativar()}>Não</button>
                                        <button className='btn-salvar' onClick={(e) => { desativarCategoria(e, idCategoria); CloseCatDesativar(); setUpdateCategorias(true);}}>Sim</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        </>
    );
}

export default Categorias