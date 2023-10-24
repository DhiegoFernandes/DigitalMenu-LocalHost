import './relatorios.css'
import '../Modal/modal_componentes.css';

function Relatorios(){
    return(
        <>
            <div className="container-relatorio">
                <div className='btn-relatorios'>
                    <button>Produtos + vendidos</button>
                    <button>Produtos + faturados</button>
                    <button>Total produtos (uni.)</button>
                    <button>Total Pedidos (R$)</button>
                    <button>Gorjetas</button>
                </div>
                <div className='box'>
                    
                </div>
            </div>
        </>
    );
}

export default Relatorios