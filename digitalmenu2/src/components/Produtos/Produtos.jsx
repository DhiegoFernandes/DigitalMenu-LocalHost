import { useContext, useEffect, useState } from 'react';
import { MainContext } from '../../context/context';
import { DataGrid } from '@mui/x-data-grid';
import { Modal } from '@mui/material';
import localePTBR from '../../util/locale';


import './produtos.css'
import '../Modal/modal_componentes.css';


function Produtos() {

    const { listarProdutos, cadastrarProduto, editaProduto, desativarProduto, listarCategorias } = useContext(MainContext);

    const [produtos, setProdutos] = useState([]);
    const [categorias, setCategorias] = useState([]);

    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");
    const [descricao, setDescricao] = useState("");
    const [categoria, setCategoria] = useState("");
    const [idproduto, setIdproduto] = useState("");
    const [status, setStatus] = useState("");
    const [imagem, setImagem] = useState("");
    const [updateProdutos, setUpdateProdutos] = useState(true)

    useEffect(() => {
        if (updateProdutos) {
            listarProdutos().then((resp) => {
                setProdutos(resp);
                setUpdateProdutos(false);
            });
            listarCategorias().then((resp) => {
                setCategorias(resp);
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
            minWidth: 150,
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
                    <button><i className='material-symbols-outlined' onClick={() => {setNome(params.row.nome); setIdproduto(params.row.idproduto);  OpenDesativar();}}>delete</i></button>

                </div>
            )
        }
    ]

    const getRowId = (row) => {
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



    return (
        <>
            <div className="container-produto">
                <div className='tabela-produtos'>
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
                    <button onClick={() => {
                            setIdproduto("");
                            setNome("");
                            setPreco("");
                            setCategoria("");
                            setDescricao("")
                            setStatus(""); 
                            Open();  
                        }}>Cadastrar Produto</button>

                    {/* CADASTRAR */}
                    <Modal
                        open={open}
                        onClose={Close}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <div className='modal'>
                            <div className='btn-modal'>
                            <form action="/produto" method="POST" encType="multipart/form-data">
                                <div className='modal-cadastrar-grande'>

                                    <p>Cadastrar Produto</p>
                                    <div className='form_div'>
                                        <div className='form_div'>
                                            <input
                                                className='inputAnimado'
                                                required=""
                                                type="text"
                                                autoFocus
                                                placeholder='nome'
                                                value={nome}
                                                onChange={(e) => setNome(e.target.value)}
                                            /><label htmlFor="nome" className="form__label">Nome do produto</label>
                                        </div>
                                        <div className='form_div'>
                                            <input
                                                className='inputAnimado'
                                                required=""
                                                type="text"
                                                autoFocus
                                                placeholder='preço'
                                                value={preco}
                                                onChange={(e) => setPreco(e.target.value)}
                                            /><label htmlFor="name" className="form__label">Preço</label>
                                        </div>
                                        <div className='form_div'>
                                            <input
                                                className='inputAnimado'
                                                required=""
                                                type="text"
                                                autoFocus
                                                placeholder='descrição'
                                                value={descricao}
                                                onChange={(e) => setDescricao(e.target.value)}
                                            /><label htmlFor="name" className="form__label">Descrição</label>
                                        </div>
                                        <div className='form_div'>
                                            <input
                                                type="file"
                                                name="imagem"
                                                onChange={(e) => setImagem(e.target.files[0])}
                                            />
                                        </div>

                                        <div className='form_div'>
                                        <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                                        {categorias.map((categoria) => (
                                                <option key={categoria.nome} value={categoria.nome}> {categoria.nome} </option>
                                        ))}
                                        </select>
                                    </div>
                                    </div>
                                    <button className='btn-cancelar  marg-media' onClick={() => { Close() }}>Cancelar</button>
                                    <button className='btn-salvar  marg-media' onClick={(e) => {
                                         console.log('Imagem para envio:', document.querySelector('input[name="imagem"]').files[0]); // Adicione esta linha
                                        cadastrarProduto(e, nome, preco, descricao, categoria, imagem)
                                        Close(); 
                                        setUpdateProdutos(true); }}>Salvar</button>
                                </div>
                                </form>
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
                            <div className='btn-modal'>
                                <div className='modal-cadastrar-grande'>
                                    <p>Editar Produto:</p>
                                    <p className='nome-produto'> {nome}</p>
                                    <p className='texto-id-produto'>IDº {idproduto}</p>
                                    <div className='form_div '>
                                        <input
                                            className='inputAnimado'
                                            required=""
                                            type="text"
                                            autoFocus
                                            placeholder='nome'
                                            value={nome}
                                            onChange={(e) => setNome(e.target.value)}
                                        /><label htmlFor="nome" className="form__label">Nome do produto</label>
                                    </div>
                                    <div className='form_div'>
                                        <input
                                            className='inputAnimado'
                                            required=""
                                            type="text"
                                            autoFocus
                                            placeholder='preço'
                                            value={preco}
                                            onChange={(e) => setPreco(e.target.value)}
                                        /><label htmlFor="nome" className="form__label">Preço</label>
                                    </div>
                                    <div className='form_div'>
                                        <input
                                            className='inputAnimado'
                                            required=""
                                            type="text"
                                            autoFocus
                                            placeholder='descrição'
                                            value={descricao}ya
                                            onChange={(e) => setDescricao(e.target.value)}
                                        /><label htmlFor="nome" className="form__label">Descrição</label>
                                    </div>
                                    <div className='form_div'>
                                        <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                                        {categorias.map((categoria) => (
                                                <option key={categoria.nome} value={categoria.nome}>{categoria.nome}</option>
                                        ))}
                                        </select>
                                    </div>
                                    <div>
                                        <select value={status} onChange={(e) => setStatus(e.target.value)}>
                                            <option value="ATIVADO">ATIVADO</option>
                                            <option value="DESATIVADO">DESATIVADO</option>
                                        </select>
                                    </div>
                                    <button className='btn-cancelar marg-media' onClick={() => { CloseEditar() }}>Cancelar</button>
                                    <button className='btn-salvar marg-pequena' onClick={(e) => { editaProduto(e, nome, preco, descricao, categoria, status, idproduto); CloseEditar(); setUpdateProdutos(true); }}>Salvar</button>
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
                                    <p>Tem certeza que deseja desativar o produto:</p>
                                    <p className='nome-produto'>{nome}?</p>
                                    <div className='botoes-sim-nao marg-grande'>
                                        <button className='btn-cancelar' onClick={() => CloseDesativar()}>Não</button>
                                        <button className='btn-salvar' onClick={(e) => { desativarProduto(e, idproduto); CloseDesativar(); setUpdateProdutos(true); }}>Sim</button>
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

export default Produtos