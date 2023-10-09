import { Outlet } from 'react-router-dom'

function System(){
    return(
        <>
            <div>
                <h1>System</h1>
                <Outlet />
            </div>
        </>
    );
}

export default System