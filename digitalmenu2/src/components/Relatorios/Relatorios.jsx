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

    try {

      if (!periodo.ano || !periodo.mes) {
        alert('Por favor preencha todos os campos antes de pesquisar');
        return;
      }

      if (filtro.tipo === 'produtoFaturado') {
        produtosMaisFaturados(periodo.mes, periodo.ano).then((resp) => {
          setDadosPesquisa(resp);
          setOpenModal(true);
          setTotal(false);
        });
      } else if (filtro.tipo === 'produtoVendido') {
        produtosMaisVendidos(periodo.mes, periodo.ano).then((resp) => {
          setDadosPesquisa(resp);
          setOpenModal(true);
          setTotal(false);
        });
      } else if (filtro.tipo === 'totalPedido') {
        totalEmPedidos(periodo.ano, periodo.mes).then((resp) => {
          setDadosPesquisa(resp);
          setOpenModal(true);
          setTotal(true)
        });
      }
    } catch (error) {
      console.error('Erro na chamada ', error)
    }

  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <div className="main-relatorio">

        <div className='container-relatorios'>
          <div className='btn-relatorios'>
            <Select value={filtro.tipo} onChange={handleChangeTipo} >
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
          </div>


          <div className='relatorio-pesquisa'>
            {total ? (
              <div>
                {dadosPesquisa[0] && <p>Total arrecadado de pedidos no mês: R${dadosPesquisa[0].total}</p>}
              </div>
            ) : (
              dadosPesquisa.map((dados, index) => (
                <div className="dados-relatorio" key={index}>
                  <div>
                    <p className='txt_relProduto'>Nome: {dados.NomeDoProduto}</p>
                    <p className='txt_relTopProduto'>{filtro.isFaturamento ? 'VALOR: R$' : 'QNTD: '} {dados.QuantidadeVendida}</p>
                  </div>
                  <div>
                    <p className='relAreaImagem'>{dados.imagem ? <img className="relatorio_imagemProduto" src={`http://localhost:3333/uploads/${dados.imagem}`} alt="Imagem" width="100%" height="auto" /> : 'Imagem não disponível'}</p>
                  </div>

                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </>
  );
}

export default Relatorios;
