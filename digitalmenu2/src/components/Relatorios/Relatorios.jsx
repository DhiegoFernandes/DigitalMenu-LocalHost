import './relatorios.css';
import '../Modal/modal_componentes.css';
import { Modal, Select, MenuItem, Button, TextField, FormControl, InputLabel } from '@mui/material';
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
          setFiltro({ ...filtro, isFaturamento: true });
        });
      } else if (filtro.tipo === 'produtoVendido') {
        produtosMaisVendidos(periodo.mes, periodo.ano).then((resp) => {
          setDadosPesquisa(resp);
          setOpenModal(true);
          setTotal(false);
          setFiltro({ ...filtro, isFaturamento: false });
        });
      } else if (filtro.tipo === 'totalPedido') {
        totalEmPedidos(periodo.ano, periodo.mes).then((resp) => {
          setDadosPesquisa(resp);
          setOpenModal(true);
          setTotal(true);
          setFiltro({ ...filtro, isFaturamento: false });
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
        <h1>o css ainda nao ta pronto aqui
          .dhiego
        </h1>
        <div className='container-relatorios'>
          <div className='btn-relatorios'>

            <FormControl className="form-TipoRelatorio">
              <InputLabel>Tipo de Relatório</InputLabel>
              <Select className="select-TipoRelatorio" id="TipoRelatorio" value={filtro.tipo} onChange={handleChangeTipo} >
                <MenuItem value="produtoFaturado">Produtos + Faturados</MenuItem>
                <MenuItem value="produtoVendido">Produtos + Vendidos</MenuItem>
                <MenuItem value="totalPedido">Total (R$) por Pedido</MenuItem>
              </Select>
            </FormControl>


            <FormControl className="form-TipoRelatorio">
              <InputLabel>Mês</InputLabel>
              <Select className="select-TipoRelatorio" type="text"
                name="mes"
                label="Mês"
                value={periodo.mes}
                onChange={handleChangePeriodo} >
                <MenuItem value="1">Janeiro</MenuItem>
                <MenuItem value="2">Fevereiro</MenuItem>
                <MenuItem value="3">Março</MenuItem>
                <MenuItem value="4">Abril</MenuItem>
                <MenuItem value="5">Maio</MenuItem>
                <MenuItem value="6">Junho</MenuItem>
                <MenuItem value="7">Julho</MenuItem>
                <MenuItem value="8">Agosto</MenuItem>
                <MenuItem value="9">Setembro</MenuItem>
                <MenuItem value="10">Outubro</MenuItem>
                <MenuItem value="11">Novembro</MenuItem>
                <MenuItem value="12">Dezembro</MenuItem>
              </Select>
            </FormControl>


            <FormControl className="form-TipoRelatorio">
              <InputLabel>Ano</InputLabel>
              <Select className="select-TipoRelatorio" type="text"
                name="ano"
                label="Ano"
                value={periodo.ano}
                onChange={handleChangePeriodo} >
                <MenuItem value="2022">2022</MenuItem>
                <MenuItem value="2023">2023</MenuItem>
              </Select>
            </FormControl>
            {/* 
            <TextField className='textField-relatorio'
              type="text"
              name="ano"
              label="Ano"
              value={periodo.ano}
              onChange={handleChangePeriodo}
            /> */}

            <Button className="" variant="contained" onClick={handlePesquisar}>Gerar Relatório</Button>
          </div>


          <div className='tabela-relatorio-pesquisa'>
            {total ? (
              <div className='dados-relatorio'>
                {dadosPesquisa[0] && <p className='txt-TotalMes'>Total arrecadado de pedidos no mês:</p>}
                <p className='txt-valorTotalMes'>R${dadosPesquisa[0].total}</p>
              </div>
            ) : (

              dadosPesquisa.map((dados, index) => (

                <div className="dados-relatorio" key={index}>
                  <p className='txt_relProduto'>Nome: {dados.NomeDoProduto}</p>
                  <p className='txt_relTopProduto'>{filtro.isFaturamento ? 'Valor faturado: R$' : 'QNTD: '} {dados.QuantidadeVendida}</p>
                  <div className='relAreaImagem'>
                    <p >{dados.imagem ? <img className="relatorio_imagemProduto" src={`http://localhost:3333/uploads/${dados.imagem}`} alt="Imagem" width="100%" height="auto" /> : 'Imagem não disponível'}</p>
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
