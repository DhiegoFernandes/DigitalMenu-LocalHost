import { useContext, useEffect, useState } from 'react';
import { MainContext } from '../../context/context';
import { DataGrid } from '@mui/x-data-grid';
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
            minWidth: 150,
            hideable: false,
            renderHeader: (params) => <strong>{params.colDef.headerName}</strong>
        }
      ]
    
      const getRowId = (row) =>{
        return row.idproduto;
      }

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
                    <button>Cadastrar Produto</button>
                </div>
            </div>
        </>
    );
}

export default Produtos