import { useState } from "react";


export default function App()
{
  type User = {
    id: number;
    name: string;
    age: number;
  }

  const u: User[] = [
    { id: 1, name: "Sam", age: 23},
    { id: 2, name: "Sara", age: 15},
    { id: 3, name: "Salwa", age: 34}
  ]


  const [users, setUser] = useState<User[]>([]);

  



  return (
    <>

    </>
  );

}