import { BrowserRouter, Routes, Route } from 'react-router-dom'

import MainProvider from './context/context';
import PrivateRoute from './util/privateRoute';

import Home from './pages/Home/Home';
import System from './pages/Settings/System';
import Login from './pages/Log/Login';
import Client from './pages/Client/Client';
import Cardapio from './pages/Cardapio/Cardapio';

import Pedidos from './components/Pedidos/Pedidos';
import Produtos from './components/Produtos/Produtos';
import Categorias from './components/Categorias/Categorias';
import Relatorios from './components/Relatorios/Relatorios';
import Mesas from './components/Mesas/Mesas';

function Router(){
    return(
        <BrowserRouter>
            <MainProvider>
                <Routes>
                    <Route 
                        path='/'
                        element={<Login />}
                    />
                    <Route 
                        path='/home'
                        element={
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>
                        }
                    />
                    <Route 
                        path='/system'
                        element={
                        <PrivateRoute>
                            <System />
                        </PrivateRoute>
                        }
                    >
                        <Route path='produtos' element={
                        <PrivateRoute>
                            <Produtos />
                        </PrivateRoute>
                        }/>
                        <Route path='pedidos' element={
                        <PrivateRoute>
                            <Pedidos />
                        </PrivateRoute>
                        }/>
                        <Route path='categorias' element={
                        <PrivateRoute>
                            <Categorias />
                        </PrivateRoute>
                        }/>
                        <Route path='relatorios' element={
                        <PrivateRoute>
                            <Relatorios />
                        </PrivateRoute>
                        }/>
                        <Route path='mesas' element={
                        <PrivateRoute>
                            <Mesas />
                        </PrivateRoute>
                        }/>
                    </Route>
                    <Route 
                        path='/client'
                        element={      
                        <PrivateRoute>   
                            <Client />
                        </PrivateRoute> 
                        }
                    />
                    <Route
                        path='/cardapio'
                        element={
                            <PrivateRoute>
                                <Cardapio />
                            </PrivateRoute>
                        }
                    />


                </Routes>
            </MainProvider>
        </BrowserRouter>
    );
}

export default Router;