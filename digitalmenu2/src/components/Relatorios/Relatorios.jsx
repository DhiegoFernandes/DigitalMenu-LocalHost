import './relatorios.css';
import '../Modal/modal_componentes.css';
import { Modal, Select, MenuItem, Button, TextField } from '@mui/material';
import { useState, useContext } from 'react';
import { MainContext } from '../../context/context';

function Relatorios() {
  const { produtosMaisFaturados, produtosMaisVendidos, totalEmPedidos } = useContext(MainContext);

  // Variáveis
  const [filtro, setFiltro] = useState({ tipo: '', isFaturamento: false });
  const [periodo, setPeriodo] = useState({ mes: '', ano: '' });
  const [dadosPesquisa, setDadosPesquisa] = useState([]);
  const [total, setTotal] = useState(false)

  // Variáveis do Modal
  const [openModal, setOpenModal] = useState(false);

  const handleChangeTipo = (event) => {
    setFiltro({ ...filtro, tipo: event.target.value });
  };

  const handleChangePeriodo = (event) => {
    setPeriodo({ ...periodo, [event.target.name]: event.target.value });
  };

  const handlePesquisar = () => {
    // Chamar a função de pesquisa apropriada com base nos valores selecionados
    if (filtro.tipo === 'produtoFaturado') {
      produtosMaisFaturados(periodo.mes, periodo.ano).then((resp) => {
        setDadosPesquisa(resp);
        setOpenModal(true);
      });
    } else if (filtro.tipo === 'produtoVendido') {
      produtosMaisVendidos(periodo.mes, periodo.ano).then((resp) => {
        setDadosPesquisa(resp);
        setOpenModal(true);
      });
    } else if (filtro.tipo === 'totalPedido') {
      totalEmPedidos(periodo.ano, periodo.mes).then((resp) => {
        setDadosPesquisa(resp);
        setOpenModal(true);
        setTotal(true)
      });
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <div className="container-relatorio">
        <div className='btn-relatorios'>
          <Select value={filtro.tipo} onChange={handleChangeTipo}>
            <MenuItem value="produtoFaturado">Produtos + Faturados</MenuItem>
            <MenuItem value="produtoVendido">Produtos + Vendidos</MenuItem>
            <MenuItem value="totalPedido">Total (R$) por Pedido</MenuItem>
          </Select>

          <TextField
            type="text"
            name="mes"
            label="Mês"
            value={periodo.mes}
            onChange={handleChangePeriodo}
          />

          <TextField
            type="text"
            name="ano"
            label="Ano"
            value={periodo.ano}
            onChange={handleChangePeriodo}
          />

          <Button variant="contained" onClick={handlePesquisar}>Pesquisar</Button>

          {/* MODAL DE RESULTADOS */}
          <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <div className='modal-pesquisa'>
              <button onClick={handleCloseModal}><i className='material-symbols-outlined'>close</i></button>
              {/* Renderizar os resultados aqui */}
              {/* {dadosPesquisa.map((dados, index) => (
                <div key={index}>
                  <p>NOME: {dados.NomeDoProduto}</p>
                  <p>{filtro.isFaturamento ? 'VALOR: R$' : 'QNTD: '} {dados.QuantidadeVendida}</p>
                </div>
              ))} */}
            {total ? 
                    <div>
                        {dadosPesquisa[0] && <p>Total arrecadado de pedidos no mês: R${dadosPesquisa[0].total}</p>}
                            </div>
                                :
                                dadosPesquisa.map((dados, index) => (
                                    <div key={index}>
                                        <p>NOME: {dados.NomeDoProduto}</p>
                                        <p>{filtro.isFaturamento ? 'VALOR: R$' : 'QNTD: '} {dados.QuantidadeVendida}</p>
                                    </div>
                                ))
            }
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default Relatorios;
