export type User = {
    id: number;
    name: string;
}

// "Databas" i minnet (Lever så läge sidan är igång)

let usersDb: User[] = [
    {id: 1, name: "Ali"},
    {id: 2, name: "Sara"},
];

function delay(ms: number) {
    return new Promise<void>((resolve) => setTimeout (resolve, ms))
}

// Slumpa fel ibland för att träna felhantering ( stäng av vid behov )
const SHOULD_RANDOM_FAIL = true;
function maybeFail()
{
    if (!SHOULD_RANDOM_FAIL) return;
    const r = Math.random();
    if (r < 0.2) throw new Error("Network error (fake");
}

export async function getUsers(): Promise<User[]> {
    await delay(400); ///// vad gör await ?
    maybeFail();
    //returnerar kopia
    return[...usersDb]; // när använder man ... egentligen
}

export async function createUser(name: string): Promise<User>{
    await delay(300);
    maybeFail();

    const newUser: User = { id: Date.now(), name };
    usersDb = [...usersDb, newUser];
    return newUser;
}

export async function updateUser(id: number, name: string): Promise<User> {
    await delay(300);
    maybeFail();

    const existing = usersDb.find((u) => u.id === id);
    if (!existing) throw new Error("User not found");

    const updated: User = { ...existing, name };
    usersDb = usersDb.map((u) => (u.id === id ? updated : u));
    return updated;

}

export async function deleteUser(id: number): Promise<void> {
    await delay(250);
    maybeFail();

    const exists = usersDb.some((u) => u.id === id);
    if (!exists) throw new Error("User not found");

    usersDb = usersDb.filter((u) => u.id !== id);
}