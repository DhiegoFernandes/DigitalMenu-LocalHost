import { useContext, useEffect, useState } from 'react';
import { MainContext } from '../../context/context';
import { DataGrid } from '@mui/x-data-grid';
import { Modal } from '@mui/material';
import localePTBR from '../../util/locale';

import './pedidos.css'


function Pedidos(){

        const {listarPedidos, listarItens, editarQuantidade, cancelarItem, encerrarPedido} = useContext(MainContext);
    
        const [pedidos, setPedidos] = useState([]);
        const [itens, setItens] = useState([]);
        const [updatePedidos, setUpdatePedidos] = useState(true);
        const [quantidade, setQuantidade] = useState("");
        const [idItem, setIdItem] = useState("");
        const [idpedido, setIdpedido] = useState("");
      
        useEffect(() => {
            if(updatePedidos){
                listarPedidos().then((resp) => {
                setPedidos(resp);
                setUpdatePedidos(false);
                });
            }
        }, [updatePedidos]);
    
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
                renderHeader: (params) => <strong>{params.colDef.headerName}</strong>,
                renderCell: (params) => (
                    <span>R$ {Number(params.value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                )
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
            },
            {
                field: "actions",
                headerName: "Ações",
                minWidth: 200,
                hideable: false,
                renderHeader: (params) => <strong>{params.colDef.headerName}</strong>,
                renderCell: (params) => (
                    <div className='btn-actions'>
                        <button><i className='material-symbols-outlined' onClick={() => {
                                console.log(params.row.idpedido);
                                listarItens(params.row.idpedido).then((resp) => {
                                    setItens(resp);
                                });
                                OpenItem();
                            }}
                        >contract_edit</i></button>
                        <button><i className='material-symbols-outlined' onClick={() => {setIdpedido(params.row.idpedido); OpenEncerra()}}>price_check</i></button>
                    </div>
                ) 
            }
          ]

        const getRowId = (row) =>{
            return row.idpedido;
        }

        const columnItens = [
            {
                field: "iditem",
                headerName: "ID Item",
                minWidth: 50,
                hideable: false,
                renderHeader: (params) => <strong>{params.colDef.headerName}</strong>
            },
            {
                field: "id_pedido",
                headerName: "ID Pedido",
                minWidth: 50,
                hideable: false,
                renderHeader: (params) => <strong>{params.colDef.headerName}</strong>
            },
            {
                field: "nome",
                headerName: "Nome",
                minWidth: 150,
                hideable: false,
                renderHeader: (params) => <strong>{params.colDef.headerName}</strong>
            },
            {
                field: "QTDE",
                headerName: "Quantidade",
                minWidth: 50,
                hideable: false,
                renderHeader: (params) => <strong>{params.colDef.headerName}</strong>
            },
            {
                field: "preco",
                headerName: "Preço",
                minWidth: 50,
                hideable: false,
                renderHeader: (params) => <strong>{params.colDef.headerName}</strong>,
                renderCell: (params) => (
                    <span>R$ {Number(params.value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                )
            },
            {
                field: "subtotal",
                headerName: "Subtotal",
                minWidth: 50,
                hideable: false,
                renderHeader: (params) => <strong>{params.colDef.headerName}</strong>,
                renderCell: (params) => (
                    <span>R$ {Number(params.value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                )
            },
            {
                field: "observacao",
                headerName: "Observação",
                minWidth: 50,
                hideable: false,
                renderHeader: (params) => <strong>{params.colDef.headerName}</strong>
            },
            {
                field: "status",
                headerName: "Status",
                minWidth: 120,
                hideable: false,
                renderHeader: (params) => <strong>{params.colDef.headerName}</strong>
            },
            {
                field: "horapedido",
                headerName: "Hora do Pedido",
                minWidth: 120,
                hideable: false,
                renderHeader: (params) => <strong>{params.colDef.headerName}</strong>
            },
            {
                field: "actions",
                headerName: "Ações",
                minWidth: 50,
                hideable: false,
                renderHeader: (params) => <strong>{params.colDef.headerName}</strong>,
                renderCell: (params) => (
                    <div className='btn-actions'>
                        <button><i className='material-symbols-outlined' onClick={() => {setIdItem(params.row.iditem); setQuantidade(params.row.QTDE); OpenQntd();}}>arrow_drop_down_circle</i></button>
                        <button><i className='material-symbols-outlined' onClick={() => {setIdItem(params.row.iditem); OpenStatus()}}>cancel</i></button>
                    </div>
                ) 
            }
          ]
        
          const getRowId2 = (row) =>{
            return row.iditem;
        }  

        const [openItem, setOpenItem] = useState(false);
        const OpenItem = () => setOpenItem(true);
        const CloseItem = () => setOpenItem(false);

        const [openQntd, setOpenQntd] = useState(false);
        const OpenQntd = () => setOpenQntd(true);
        const CloseQntd = () => setOpenQntd(false);

        const [openStatus, setOpenStatus] = useState(false);
        const OpenStatus = () => setOpenStatus(true);
        const CloseStatus = () => setOpenStatus(false);
        
        const [openEncerra, setOpenEncerra] = useState(false);
        const OpenEncerra = () => setOpenEncerra(true);
        const CloseEncerra = () => setOpenEncerra(false);

    return(
        <>
            <div className="container-pedido">
                <div className='tabela-pedidos'>
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

                {/* MODAL VER ITENS */}
                <Modal
                    open={openItem}
                    onClose={CloseItem}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div className='modal-itens'>
                        <button className='fechar' onClick={() => {
                            CloseItem();
                            setUpdatePedidos(false);
                        }}><i className='material-symbols-outlined'>close</i></button>
                        <div className='tb-itens'>
                            <DataGrid 
                            columns={columnItens}
                            rows={itens}
                            getRowId={getRowId2}
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
                </Modal>

                {/* EDITAR QNTD */}
                <Modal
                        open={openQntd}
                        onClose={CloseQntd}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <div className='modal'>
                            <div className='btn-modal'>

                                <div className='modal-cadastrar'>
                                    <p>Editar Quantidade</p>
                                    <div className='form_div marg-grande'>
                                        <input
                                            className="inputAnimado"
                                            type="text"
                                            placeholder='Quantidade do Item'
                                            value={quantidade}
                                            autoFocus
                                            onChange={(e) => setQuantidade(e.target.value)}
                                        /><label htmlFor="name" className="form__label">Quantidade</label>
                                    </div>
                                    <button className='btn-cancelar marg-media' onClick={() => { CloseQntd() }}>Cancelar</button>
                                    <button className='btn-salvar marg-pequena' onClick={(e) => { editarQuantidade(e, idItem, quantidade); setUpdatePedidos(true); CloseQntd(); CloseItem();}}>Salvar</button>
                                </div>

                            </div>
                        </div>
                    </Modal>

                    {/* ENCERRA PEDIDO */}
                    <Modal
                        open={openEncerra}
                        onClose={CloseEncerra}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <div className='modal'>
                            <div className='btn-modal'>
                                <div className='modal-desativar'>
                                    <p>Tem certeza que deseja encerrar o pedido {idpedido}?</p>
                                    <div className='botoes-sim-nao marg-grande'>
                                        <button className='btn-cancelar' onClick={() => { CloseEncerra() }}>Não</button>
                                        <button className='btn-salvar' onClick={() => { encerrarPedido(idpedido); setUpdatePedidos(true); CloseEncerra(); }}>Sim</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </Modal>

                {/* CANCELAR PEDIDO */}
                <Modal
                        open={openStatus}
                        onClose={CloseStatus}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <div className='modal'>
                            <div className='btn-modal'>

                                <div className='modal-ativar'>
                                    <p>Tem certeza que deseja cancelar o item {idItem}?</p>
                                    <div className='botoes-sim-nao marg-grande'>
                                        <button className='btn-cancelar' onClick={() => { CloseStatus() }}>Não</button>
                                        <button className='btn-salvar' onClick={(e) => { cancelarItem(e, idItem); setUpdatePedidos(true); CloseStatus(); CloseItem();}}>Sim</button>
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

export default Pedidos