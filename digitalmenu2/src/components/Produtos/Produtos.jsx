import { useContext, useEffect, useState } from 'react';
import { MainContext } from '../../context/context';
import { DataGrid } from '@mui/x-data-grid';
import { Modal } from '@mui/material';
import localePTBR from '../../util/locale';


import './produtos.css'
import '../Modal/modal_componentes.css';


function Produtos(){

    const {listarProdutos, cadastrarProduto, editaProduto, desativarProduto} = useContext(MainContext);

    const [produtos, setProdutos] = useState([]);

    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");
    const [descricao, setDescricao] = useState("");
    const [categoria, setCategoria] = useState("");
    const [idproduto, setIdproduto] = useState("");
    const [status, setStatus] = useState("");
    const [updateProdutos, setUpdateProdutos] = useState(true)
  
    useEffect(() => {
        if(updateProdutos){
            listarProdutos().then((resp) => {
            setProdutos(resp);
            setUpdateProdutos(false);
            });
        }
    }, [updateProdutos]);

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
            field: "categoria",
            headerName: "Categoria do Produto",
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
                    <button><i className='material-symbols-outlined' onClick={() => {
                        setIdproduto(params.row.idproduto);
                        setNome(params.row.nome);
                        setPreco(params.row.preco);
                        setCategoria(params.row.categoria);
                        setDescricao(params.row.descricao)
                        setStatus(params.row.status);
                        OpenEditar();
                        }}
                        >edit</i></button>
                    <button><i className='material-symbols-outlined' onClick={() => {setIdproduto(params.row.idproduto); OpenDesativar();}}>delete</i></button>
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

    const [openEditar, setOpenEditar] = useState(false);
    const OpenEditar = () => setOpenEditar(true);
    const CloseEditar = () => setOpenEditar(false);

    const [openDesativar, setOpenDesativar] = useState(false);
    const OpenDesativar = () => setOpenDesativar(true);
    const CloseDesativar = () => setOpenDesativar(false);

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
                    
                    {/* CADASTRAR */}
                    <Modal
                        open={open}
                        onClose={Close}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <div className='modal'>
                            <p>Cadastrar Produto</p>
                            <input 
                                type="text" 
                                autoFocus
                                placeholder='nome'
                                value={nome}
                                onChange={(e) => setNome(e.target.value)} 
                            />
                            <input 
                                type="text" 
                                autoFocus
                                placeholder='preço'
                                value={preco}
                                onChange={(e) => setPreco(e.target.value)}  
                            />
                            <input 
                                type="text" 
                                autoFocus
                                placeholder='descrição'
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)} 
                            />
                            <input 
                                type="text" 
                                autoFocus
                                placeholder='categoria'
                                value={categoria}
                                onChange={(e) => setCategoria(e.target.value)} 
                            />
                            <div className='btn-modal'>
                                <button className='btn-cancelar' onClick={() => {Close()}}>Cancelar</button>
                                <button className='btn-salvar' onClick={(e) => {cadastrarProduto(e, nome, preco, descricao, categoria); Close(); setUpdateProdutos(true);}}>Salvar</button>  
                            </div>
                        </div>
                    </Modal>

                    {/* EDITAR */}
                    <Modal
                        open={openEditar}
                        onClose={CloseEditar}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <div className='modal'>
                            <p>Editar Produto: {nome} nº {idproduto}</p>
                            <input 
                                type="text" 
                                autoFocus
                                placeholder='nome'
                                value={nome}
                                onChange={(e) => setNome(e.target.value)} 
                            />
                            <input 
                                type="text" 
                                autoFocus
                                placeholder='preço'
                                value={preco}
                                onChange={(e) => setPreco(e.target.value)}  
                            />
                            <input 
                                type="text" 
                                autoFocus
                                placeholder='descrição'
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)} 
                            />
                            <input 
                                type="text" 
                                autoFocus
                                placeholder='categoria'
                                value={categoria}
                                onChange={(e) => setCategoria(e.target.value)} 
                            />
                            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="ATIVADO">ATIVADO</option>
                                <option value="DESATIVADO">DESATIVADO</option>
                            </select>
                            <div className='btn-modal'>
                                <button className='btn-cancelar' onClick={() => {CloseEditar()}}>Cancelar</button>
                                <button className='btn-salvar' onClick={(e) => {editaProduto(e, nome, preco, descricao, categoria, status, idproduto); CloseEditar(); setUpdateProdutos(true);}}>Salvar</button>  
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
                                <p>Tem certeza que deseja desativar o Produto de nº {idproduto}?</p>
                                <button className='btn-cancelar' onClick={() => CloseDesativar()}>Não</button>
                                <button className='btn-salvar' onClick={(e) => {desativarProduto(e, idproduto); CloseDesativar(); setUpdateProdutos(true);}}>Sim</button>  
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        </>
    );
}

export default Produtos