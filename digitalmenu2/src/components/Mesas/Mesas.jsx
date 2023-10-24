import {useContext, useEffect, useState} from 'react';
import { MainContext } from '../../context/context';
import { DataGrid } from '@mui/x-data-grid';
import { Modal } from '@mui/material';
import localePTBR from '../../util/locale';

import './mesas.css'

function Mesas(){

    const {listarMesas, ativarMesa, desativarMesa, cadastrarMesa} = useContext(MainContext);

    const [mesas, setMesas] = useState([]);
    const [updateMesas, setUpdateMesas] = useState(true);
  
    useEffect(() => {
      if(updateMesas){
        listarMesas().then((resp) => {
        setMesas(resp);
        setUpdateMesas(false);
    });
      }
    }, [updateMesas]);

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
                    <button onClick={() => {setIdMesa(params.row.idmesa); OpenAtivar()}}><i className='material-symbols-outlined'>check</i></button>
                    <button onClick={() => {setIdMesa(params.row.idmesa); OpenDesativar()}}><i className='material-symbols-outlined'>delete</i></button>
                </div>
            ) 
        }
    ]
    const getRowId = (row) =>{
        return row.idmesa;
    }

    const [openMesa, setOpenMesa] = useState(false);
    const OpenMesa = () => setOpenMesa(true);
    const CloseMesa = () => setOpenMesa(false);

    const [openAtivar, setOpenAtivar] = useState(false);
    const OpenAtivar = () => setOpenAtivar(true);
    const CloseAtivar = () => setOpenAtivar(false);

    const [openDesativar, setOpenDesativar] = useState(false);
    const OpenDesativar = () => setOpenDesativar(true);
    const CloseDesativar = () => setOpenDesativar(false);

    const [idMesa, setIdMesa] = useState("");

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
                    <button onClick={() => {OpenMesa()}}>Cadastrar Mesa</button>
                    {/* CADASTRO */}
                    <Modal
                        open={openMesa}
                        onClose={CloseMesa}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <div className='modal'>
                            <div className='btn-modal'>
                                <h1>Cadastrar Mesa</h1>
                                <input 
                                    type="text" 
                                    placeholder='Número da mesa'
                                    value={idMesa}
                                    autoFocus
                                    onChange={(e) => setIdMesa(e.target.value)}
                                />
                                <button className='btn-cancelar' onClick={() => {CloseMesa()}}>Cancelar</button>
                                <button className='btn-salvar' onClick={(e) => {cadastrarMesa(e, idMesa); CloseMesa()}}>Salvar</button>  
                            </div>
                        </div>
                    </Modal>

                    {/* ATIVAR */}
                    <Modal
                        open={openAtivar}
                        onClose={CloseAtivar}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <div className='modal'>
                            <div className='btn-modal'>
                                <h1>Tem certeza que deseja Ativar?</h1>
                                <button className='btn-cancelar' onClick={() => {CloseAtivar()}}>Não</button>
                                <button className='btn-salvar' onClick={(e) => {ativarMesa(e, idMesa); CloseAtivar(); setUpdateMesas(true)}}>Sim</button>  
                            </div>
                        </div>
                    </Modal>

                    {/* DESATIVAR */}
                    <Modal
                        open={openDesativar}
                        onClose={CloseDesativar}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <div className='modal'>
                            <div className='btn-modal'>
                                <h1>Tem certeza que deseja Desativar?</h1>
                                <button className='btn-cancelar' onClick={() => {CloseDesativar()}}>Não</button>
                                <button className='btn-salvar' onClick={(e) => {desativarMesa(e, idMesa); CloseDesativar(); setUpdateMesas(true);}}>Sim</button>  
                            </div>
                        </div>
                    </Modal>
                </div>             
            </div>
        </>
    );
}

export default Mesas    