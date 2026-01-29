import { useState } from "react";

type User = {
  id: number;
  name: string;
}


export default function App()
{
  const [users, setUser] = useState<User[]>([]);
  const [name, setName] = useState<string>("");

  const [fname, setFName] = useState<string>("");
  const [fruits, setFruit] = useState<string[]>([]);

  function handleAdd(){
    if (!name.trim()) return;

    const newUser: User = {
      id: Date.now(),
      name,
    };

    setUser(prev => [...prev, newUser]);
    setName("");
  };

  const addFruit = () => {
    if (!fname.trim()) return;

    setFruit(prev => [...prev, fname]);
    setFName("");
  };

  const handleDelete = (id: number) => {
    setUser(prev => prev.filter(u => u.id !== id));
  };

  const handleDeleteF = (fruit : string) => {
    setFruit(prev => prev.filter(f => f !== fruit));
  };

  return(
    <>
    <div>
      <h2>Users</h2>
      <input type="text" value={name} onChange={e => setName(e.target.value)}/>
      <button onClick={handleAdd}>add</button>
      <ul>
        {users.map((u) => (
          <li key={u.id}>{u.name}{" "} <button onClick={() => handleDelete(u.id)}>delete</button></li>
        ))}
      </ul>

      <h2>Fruits</h2>
      <input type="text" value={fname} onChange={e => setFName(e.target.value)} />
      <button onClick={addFruit}>add</button>
      <ul>
        {fruits.map((f) => (
          <li key={f}>{f}{" "} <button onClick={() => handleDeleteF(f)}>delete</button></li>
        ))}
      </ul>
    </div>
    
    </>
  );

}