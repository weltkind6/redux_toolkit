import React from 'react';
import './App.css';
import {AppDispatch, fetchUsers, RootState} from "./store/store";
import {useDispatch, useSelector} from "react-redux";

function App() {
    const dispatch = useDispatch<AppDispatch>();
    const { users, loading, error } = useSelector((state: RootState) => state.users);

    dispatch(fetchUsers());

    if (loading === 'loading') {
        return <div>Loading...</div>;
    }

    if (loading === 'failed') {
        return <div>Error: {error}</div>;
    }


    return (
    <div className="App">
        <div>
            <h2>Users List</h2>
            {users.map(({id, name, email}) => (
                <div key={id}>
                    <div>
                        <span>name: </span>
                        <strong>{name}</strong>
                    </div>
                   <div style={{marginBottom: '10px'}}>
                       <span>email: </span>
                       <strong> {email}</strong>
                   </div>
                </div>
            ))}
        </div>
    </div>
  );
}

export default App;
