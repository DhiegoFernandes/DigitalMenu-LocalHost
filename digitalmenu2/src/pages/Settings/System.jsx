import { Outlet, useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './system.css'

//imagens
import logoDM from '../../assets/image/logo_digitalmenu2.png'

function System(){
    
    const [ativo, setAtivo] = useState("");
    const [ativo1, setAtivo1] = useState("");
    const [ativo2, setAtivo2] = useState("");
    const [ativo3, setAtivo3] = useState("");
    const [ativo4, setAtivo4] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        navigate('/system/relatorios');
        setAtivo("ativo")
    }, []);
    
    return(
        <>
            <div className='body-sidebar'>
                <aside className='menu-lateral'>
                    <header className='div-logo'>
                        <button className='btn-logo' onClick={() => {navigate('/home')}}><img className='logoDM' src={logoDM} alt="" /></button>
                    </header>

                    <header className='div-logo2'>
                        <button className='btn-logo2' onClick={() => {navigate('/home')}}><i className='material-symbols-outlined'>home</i></button>
                    </header>

                    <nav className=''>
                        <button onClick={() => {
                            navigate('relatorios'); 
                            setAtivo("ativo");
                            setAtivo1("");
                            setAtivo2("");
                            setAtivo3("");
                            setAtivo4("");
                            }}>
                            <span className={ativo}>
                                <i className='material-symbols-outlined'>bar_chart_4_bars</i>
                                <span>Relatórios</span>
                            </span>
                        </button>

                        <button onClick={() => {
                            navigate('produtos'); 
                            setAtivo("");
                            setAtivo1("ativo");
                            setAtivo2("");
                            setAtivo3("");
                            setAtivo4("");
                            }}>
                            <span className={ativo1}>
                                <i className='material-symbols-outlined'>menu_book</i>
                                <span>Produtos</span>
                            </span>
                        </button>

                        <button onClick={() => {
                            navigate('categorias'); 
                            setAtivo("");
                            setAtivo1("");
                            setAtivo2("ativo");
                            setAtivo3("");
                            setAtivo4("");
                            }}>
                            <span className={ativo2}>
                                <i className='material-symbols-outlined'>format_list_bulleted</i>
                                <span>Categorias</span>
                            </span>
                        </button>

                        <button onClick={() => {
                            navigate('mesas'); 
                            setAtivo("");
                            setAtivo1("");
                            setAtivo2("");
                            setAtivo3("ativo");
                            setAtivo4("");
                            }}>
                            <span className={ativo3}>
                                <i className='material-symbols-outlined'>table_restaurant</i>
                                <span>Mesas</span>
                            </span>
                        </button>

                        <button onClick={() => {
                            navigate('pedidos'); 
                            setAtivo("");
                            setAtivo1("");
                            setAtivo2("");
                            setAtivo3("");
                            setAtivo4("ativo");
                            }}>
                            <span className={ativo4}>
                                <i className='material-symbols-outlined'>contract</i>
                                <span>Pedidos</span>
                            </span>
                        </button>
                    </nav>

                </aside>   
                
                <div className='container-info'> 
                    <Outlet/>
                </div>  
                <ToastContainer />  
            </div>
        </>
    );
}

export default System