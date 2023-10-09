import { useNavigate } from 'react-router-dom';

function Client(){
    
    const navigate = useNavigate();
    
    return(
        <>
            <div>
                <h1>Client</h1>
                <button onClick={() => navigate('/home')}>Home</button>
            </div>
        </>
    );
}

export default Client