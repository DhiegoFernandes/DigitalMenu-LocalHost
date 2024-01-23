import './relatorios.css';
import '../Modal/modal_componentes.css';
import { Modal, Select, MenuItem, Button, TextField, FormControl, InputLabel } from '@mui/material';
import { useState, useContext } from 'react';
import { MainContext } from '../../context/context';
import graph from '../../assets/image/graph.png';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Relatorios() {
  const { produtosMaisFaturados, produtosMaisVendidos, totalEmPedidos } = useContext(MainContext);

  // Variáveis
  const [filtro, setFiltro] = useState({ tipo: '', isFaturamento: false });
  const [periodo, setPeriodo] = useState({ mes: '', ano: '' });
  const [dadosPesquisa, setDadosPesquisa] = useState([]);
  const [total, setTotal] = useState(false)

  const [esconder, setEsconder] = useState("indice-tabela-rel-escondido");

  // Variáveis do Modal
  const [openModal, setOpenModal] = useState(false);

  const handleChangeTipo = (event) => {
    setFiltro({ ...filtro, tipo: event.target.value });
  };

  const handleChangePeriodo = (event) => {
    setPeriodo({ ...periodo, [event.target.name]: event.target.value });
  };

  const formatarNumero = (numero, isFaturamento = false) => {
    if (typeof numero !== 'string') {
      numero = String(numero);
    }
  
    if (isFaturamento) {
      const partes = numero.split('.');
      const parteInteira = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      const parteDecimal = partes[1] ? `,${partes[1]}` : '';
      return `R$ ${parteInteira}${parteDecimal}`;
    }

    return numero.replace('.', ',');
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
          setEsconder("indice-tabela-rel");
        });
      } else if (filtro.tipo === 'produtoVendido') {
        produtosMaisVendidos(periodo.mes, periodo.ano).then((resp) => {
          setDadosPesquisa(resp);
          setOpenModal(true);
          setTotal(false);
          setFiltro({ ...filtro, isFaturamento: false });
          setEsconder("indice-tabela-rel");
        });
      } else if (filtro.tipo === 'totalPedido') {
        totalEmPedidos(periodo.ano, periodo.mes).then((resp) => {
          setDadosPesquisa(resp);
          setOpenModal(true);
          setTotal(true);
          setFiltro({ ...filtro, isFaturamento: false });
          setEsconder("indice-tabela-rel-escondido");
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

            <FormControl className="form-TipoRelatorio">
              <InputLabel sx={{ fontSize: 20 }}>Tipo de Relatório</InputLabel>
              <Select label="teste" className="select-TipoRelatorio" id="TipoRelatorio" value={filtro.tipo} onChange={handleChangeTipo}>
                <MenuItem value="produtoFaturado">Produtos + Faturados</MenuItem>
                <MenuItem value="produtoVendido">Produtos + Vendidos</MenuItem>
                <MenuItem value="totalPedido">Total (R$) por Pedidos</MenuItem>
              </Select>
            </FormControl>

            <FormControl className="form-TipoRelatorio">
              <InputLabel sx={{ fontSize: 20 }}>Mês</InputLabel>
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
              <InputLabel sx={{ fontSize: 20 }}>Ano</InputLabel>
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

            {console.log(dadosPesquisa)}
          </div>

          <div className={esconder}>

            <table className='dados-indice-tabela-rel'>
              <tr >
                <td> <div className='rel-Indice1'><p className='txt-rel-indice'>Nome</p></div></td>
                <td><div className='rel-Indice2'><p className='txt-rel-indice'>Valor</p></div></td>
                <td> <div className='rel-Indice3'><p className='txt-rel-indice'>Imagem</p></div></td>
              </tr>
            </table>

          </div>

          <div className='tabela-relatorio-pesquisa'>
            {total ? (
              <div className='dados-relatorio-mes'>

                {dadosPesquisa && <p className='txt-TotalMes'>Total arrecadado de pedidos no mês:</p>}
                <div className='relatorio-ganhos'>
                  <img className="img-grafico" src={graph} />
                  <p className='txt-valorTotalMes'>{formatarNumero(dadosPesquisa[0].total, true)}</p>


                </div>
                <div className='relatorio-totalPedidos'>
                  <p className='txt-qtdeMes'>de um total de:</p>
                  <p className='txt-qtdeTotalMes'>{dadosPesquisa[0].quantidade}</p>
                  <p className='txt-qtdeMes'> Pedidos</p>
                </div>


              </div>
            ) : (


              dadosPesquisa.map((dados, index) => (
                <div className="dados-relatorio" key={index}>



                  <table className='dadostabela-rel'>
                    <tr >
                      <td> <div className='rel-Dados1'> <p className='txt_relProduto'>{/* 'Nome: ' */}{dados.NomeDoProduto}</p></div></td>
                      <td><div className='rel-Dados2'><p className='txt_relTopProduto'> {formatarNumero(dados.QuantidadeVendida)}</p></div></td>
                      <td>
                        <div className='rel-Dados3'>
                          <div className='relAreaImagem'><p >{dados.imagem ? <img className="relatorio_imagemProduto" src={`http://localhost:3333/uploads/${dados.imagem}`} alt="Imagem" width="100%" height="auto" /> : 'Imagem não disponível'}</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </table>

                </div>
              ))
            )}
            <ToastContainer />
          </div>
        </div>

      </div>
    </>
  );
}

export default Relatorios;
