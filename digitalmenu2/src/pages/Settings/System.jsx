import { Outlet, useNavigate, Link } from 'react-router-dom'

function System(){
    
    const navigate = useNavigate();
    
    return(
        <>
            <div>
                <nav>
                    <Link to={'relatorios'}>Relatorios</Link>
                    <Link to={'produtos'}>Produtos</Link>
                    <Link to={'categorias'}>Categorias</Link>
                    <Link to={'mesas'}>Mesas</Link>
                    <Link to={'pedidos'}>Pedidos</Link>
                </nav>
                <h1>System</h1>
                <button onClick={() => navigate('/home')}>Home</button>
                <Outlet />
            </div>
        </>
    );
}

export default System