import { useContext, useEffect, useState } from 'react';
import { MainContext } from '../../context/context';
import { DataGrid } from '@mui/x-data-grid';
import { Modal } from '@mui/material';
import localePTBR from '../../util/locale';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './mesas.css'
import '../Modal/modal_componentes.css';

function Mesas() {

    const { listarMesas, ativarMesa, desativarMesa, cadastrarMesa } = useContext(MainContext);

    const [mesas, setMesas] = useState([]);

    const [updateMesas, setUpdateMesas] = useState(true);

    useEffect(() => {
        if (updateMesas) {
            listarMesas().then((resp) => {
                setMesas(resp);
                setUpdateMesas(false);
            });
        }
    }, [updateMesas]);

    const colunmMesas = [
        {
            field: "idmesa",
            headerName: "Número da Mesa",
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
                    <button onClick={() => { setIdMesa(params.row.idmesa); OpenAtivar() }}><i className='material-symbols-outlined'>check</i></button>
                    <button onClick={() => { setIdMesa(params.row.idmesa); OpenDesativar() }}><i className='material-symbols-outlined'>delete</i></button>
                </div>
            )
        }
    ]
    const getRowId = (row) => {
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

    return (
        <>
            <div className="container-mesa">
                <div className='tabela-mesa'>
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
                    <button type="btn-cadastrarSistema" className="btn-cadastrarSistema" onClick={() => { OpenMesa() }}>
                        <span className="btn-cadastrarSistema__text">Cadastrar Mesa</span>
                        <span className="btn-cadastrarSistema__icon"><svg xmlns="http://www.w3.org/2000/svg" width="44" viewBox="0 0 24 24" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" stroke="currentColor" height="44" fill="none" className="svg"><line y2="22" y1="2" x2="12" x1="12"></line><line y2="12" y1="12" x2="22" x1="2"></line></svg></span>
                    </button>
                    {/* CADASTRO */}
                    <Modal
                        open={openMesa}
                        onClose={CloseMesa}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <div className='modal'>
                            <div className='btn-modal'>

                                <div className='modal-cadastrar'>
                                    <p>Cadastrar Mesa</p>
                                    <div className='form_div marg-grande'>
                                        <input
                                            className="inputAnimado"
                                            type="text"
                                            placeholder='Número da mesa'
                                            required=""
                                            value={idMesa}
                                            autoFocus
                                            onChange={(e) => setIdMesa(e.target.value)}
                                        /><label htmlFor="name" className="form__label">Número da Mesa</label>
                                    </div>
                                    <button className='btn-cancelar marg-media' onClick={() => { CloseMesa() }}>Cancelar</button>
                                    <button className='btn-salvar marg-pequena' onClick={(e) => { cadastrarMesa(e, idMesa); CloseMesa(); setUpdateMesas(true); }}>Salvar</button>
                                </div>

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

                                <div className='modal-ativar'>
                                    <p>Tem certeza que deseja ativar a mesa {idMesa}?</p>
                                    <div className='botoes-sim-nao marg-grande'>
                                        <button className='btn-cancelar' onClick={() => { CloseAtivar() }}>Não</button>
                                        <button className='btn-salvar' onClick={(e) => { ativarMesa(e, idMesa); CloseAtivar(); setUpdateMesas(true); }}>Sim</button>
                                    </div>
                                </div>

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
                                <div className='modal-desativar'>
                                    <p>Tem certeza que deseja desativar a mesa {idMesa}?</p>
                                    <div className='botoes-sim-nao marg-grande'>
                                        <button className='btn-cancelar' onClick={() => { CloseDesativar() }}>Não</button>
                                        <button className='btn-salvar' onClick={(e) => { desativarMesa(e, idMesa); CloseDesativar(); setUpdateMesas(true); }}>Sim</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </Modal>
                    <ToastContainer />
                </div>
            </div>
        </>
    );
}

export default Mesas    