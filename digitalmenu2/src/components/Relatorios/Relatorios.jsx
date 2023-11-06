import './relatorios.css'
import '../Modal/modal_componentes.css';

function Relatorios(){
    return(
        <>
            <div className="container-relatorio">
                <div className='btn-relatorios'>
                    <button className='btn'>Produtos + vendidos</button>
                    <button className='btn'>Produtos + faturados</button>
                    <button className='btn'>Total (R$) por Pedido</button>
                </div>
                {/* <div className='tabela-relatorios'>
                    
                </div> */}
            </div>
        </>
    );
}

export default Relatorios