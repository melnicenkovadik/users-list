import React from 'react';
import {AddUser} from "./AddUser";
import {UsersList} from "./UsersList";

function App() {

    return (
        <div className="layout">
            <AddUser/>
           <UsersList/>
        </div>
    );
}

export default App;
