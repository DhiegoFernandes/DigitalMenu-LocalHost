import { useContext, useEffect, useState } from 'react';
import { MainContext } from '../../context/context';
import { DataGrid } from '@mui/x-data-grid';
import { Modal } from '@mui/material';
import localePTBR from '../../util/locale';

import './pedidos.css'


function Pedidos(){

        const {listarPedidos, listarItens} = useContext(MainContext);
    
        const [pedidos, setPedidos] = useState([]);
        const [itens, setItens] = useState([]);
        const [updatePedidos, setUpdatePedidos] = useState(true)
      
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
                field: "subtotal",
                headerName: "Subtotal",
                minWidth: 50,
                hideable: false,
                renderHeader: (params) => <strong>{params.colDef.headerName}</strong>
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
                headerName: "Horário do Pedido",
                minWidth: 170,
                hideable: false,
                renderHeader: (params) => <strong>{params.colDef.headerName}</strong>
            },
            {
                field: "actions",
                headerName: "Ações",
                minWidth: 90,
                hideable: false,
                renderHeader: (params) => <strong>{params.colDef.headerName}</strong>,
                renderCell: (params) => (
                    <div className='btn-actions'>
                        <button><i className='material-symbols-outlined'>arrow_drop_down_circle</i></button>
                        <button><i className='material-symbols-outlined'>cancel</i></button>
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
                </div>
            </div>
        </>
    );
}

export default Pedidos