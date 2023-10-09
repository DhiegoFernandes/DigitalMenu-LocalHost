import { Outlet } from 'react-router-dom'

function System(){
    return(
        <>
            <div>
                <h1 className='italic'>System</h1>
                <Outlet />
            </div>
        </>
    );
}

export default System