
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() =>{
    fetch('http://localhost:5000/users')
    .then(res => res.json())
    .then(data => setUsers(data))
  },[])
  

  const handleAddUser = event =>{
      event.preventDefault();
      const form = event.target;
      const name = event.target.name.value;
      const email = event.target.email.value;
      const user = {name, email}
      console.log(user)

  
      fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
          'content-type' : 'application/json'
        },
        body: JSON.stringify(user)
      })
      .then(res => res.json())
      .then(data =>{
        console.log(data)
        const newUsers = [...users, data];
        setUsers(newUsers);
        form.reset()
      })

  }

  return (
    
    <>
      <h1>Users Management System</h1>

      <form onSubmit={handleAddUser}>
        <input type="text" name="name" id="" />
        <br />
        <input type="email" name="email" id="" />
        <br />
        <input type="submit" name="" value='Add user' id="" />
      </form>

      <p>Number of users: {users.length}</p>
      <div>
        {
          users.map(user => <p key={user.id}>{user.id}. {user.name} : {user.email}</p>)
        }
      </div>
    </>
  )
}

export default App
