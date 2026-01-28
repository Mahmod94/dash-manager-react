import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  type User = {
    id: number;
    name: string;
    age: number;
};


const users: User[] = [
    { id: 1, name: "Samuel", age: 23 },
    { id: 2, name: "Sara", age: 30},
    { id: 3, name: "Adam", age: 18},
];

const adult: User[] = users.filter((u) => u.age >= 18);

const names: string[] = users.map((u) => u.name);


  return (
    <>
      <ul>
        {}
      </ul>
    </>
  )
}

export default App
