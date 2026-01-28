type User = {
    id: number;
    name: string;
    age: number;
}


const result = users.filter(u => u.name.startsWith("A"));