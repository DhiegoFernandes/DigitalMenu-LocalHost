import { useContext, useEffect, useState } from 'react';
import { MainContext } from '../../context/context';
import { DataGrid } from '@mui/x-data-grid';
import { Modal } from '@mui/material';
import localePTBR from '../../util/locale';

import './produtos.css'

function Produtos(){

    const {listarProdutos} = useContext(MainContext);

    const [produtos, setProdutos] = useState([]);
  
    useEffect(() => {
      listarProdutos().then((resp) => {
        setProdutos(resp);
      });
    }, []);

    const colunmProdutos = [
        {
            field: "idproduto",
            headerName: "ID Produto",
            minWidth: 90,
            hideable: false,
            renderHeader: (params) => <strong>{params.colDef.headerName}</strong>
        },
        {
            field: "nome",
            headerName: "Nome",
            minWidth: 100,
            hideable: false,
            renderHeader: (params) => <strong>{params.colDef.headerName}</strong>
        },
        {
            field: "descricao",
            headerName: "Descrição",
            minWidth: 150,
            hideable: false,
            renderHeader: (params) => <strong>{params.colDef.headerName}</strong>
        },
        {
            field: "preco",
            headerName: "Preço",
            minWidth: 50,
            hideable: false,
            renderHeader: (params) => <strong>{params.colDef.headerName}</strong>
        },
        {
            field: "status",
            headerName: "Status do Produto",
            minWidth: 150,
            hideable: false,
            renderHeader: (params) => <strong>{params.colDef.headerName}</strong>
        },
        {
            field: "id_categoria",
            headerName: "Categoria do Pedido",
            minWidth: 160,
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
    return row.idproduto;
    }

    const [open, setOpen] = useState(false);
    const Open = () => setOpen(true);
    const Close = () => setOpen(false);

    return(
        <>
            <div className="container-produto">
                <div className='box'>
                  <DataGrid
                    columns={colunmProdutos}
                    rows={produtos}
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
                <div className='btn-cadastro-produto'>
                    <button onClick={() => {Open()}}>Cadastrar Produto</button> 
                    <Modal
                        open={open}
                        onClose={Close}
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

export default Produtos