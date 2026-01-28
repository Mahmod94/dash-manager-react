import {
  Button,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from '@mui/icons-material/Create';
import SearchIcon from "@mui/icons-material/Search";


import {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    type User,
} from "../api/userApi";

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
}
    from "@mui/material";



export default function UsersPage() {
  const [name, setName] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [searchText, setSeachText] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [deleteId, setDeleteId] = useState<number | null>(null);

  const openDeleteDialog = (id: number) => setDeleteId(id);
  const closeDeleteDialog = () => setDeleteId(null);
  
  const userToDelete = users.find((u) => u.id === deleteId);

/*    const filteredUsers = users.filter((u) => 
        u.name.toLowerCase().includes(searchText.trim().toLowerCase())
    );*/

    const filteredUsers = users
    .filter((u) => u.name.toLowerCase().includes(searchText.trim().toLowerCase())
    )
    .sort((a, b) => {
        if (sortOrder === "asc"){
            return a.name.localeCompare(b.name);
        }
        return b.name.localeCompare(a.name);
    });
    // Load users on mount
    useEffect(() => {
        const load = async () => {
            setLoading(true);
            setError(null);
            try
            {
                const data = await getUsers();
                setUsers(data);
            } catch(e) {
                setError (e instanceof Error ? e.message: "Unknown error");
            } finally {
                setLoading(false)
            }
        };

        load();
    }, []);



  const handleAddUser = async () => {
    if (!name.trim()) return;

    setLoading(true);
    setError(null);

    try {
        const newUser = await createUser(name.trim());
        setUsers((prev) => [...prev, newUser]);
        setName("");
    } catch (e) {
        setError(e instanceof Error ? e.message: "Unkown error");
    } finally {
        setLoading(false);
    }
  };

  const handleDeleteUser = async (id: number) => {
   setLoading(true);
   setError(null);
   try {
    await deleteUser(id);
    setUsers((prev) => prev.filter((u) => u.id !== id));
   } catch (e) {
    setError(e instanceof Error ? e.message: "Unkown error");
   } finally {
    setLoading(false);
   }
   
  };

 const startEdit = (user: User) => {
    setEditingId(user.id);
    setEditingName(user.name);
 };

 const saveEdit = async() => {
    if (editingId == null) return;
    if (!editingName.trim()) return;


    setLoading(true);
    setError(null);
    try
    {
        const updated = await updateUser(editingId, editingName.trim());
        setUsers((prev) => 
            prev.map((u) => (u.id === updated.id ? updated :u))
        );
        setEditingId(null);
        setEditingName("");
    } catch (e) {
        setError(e instanceof Error ? e.message: "Unknwon error");
    } finally {
        setLoading (false);
    }
 };

 const cancelEdit = () => {
    setEditingId(null);
    setEditingName("");   
 }

  return (
    <>
      <Typography variant="h4">Users</Typography>

      <Stack
        spacing={2}
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleAddUser();
        }}
      >
        <TextField
         label="Search users"
         value={searchText}
         onChange={(e) => setSeachText(e.target.value)}
         InputProps={{
            startAdornment: (
                <IconButton edge="start" aria-label="search">
                    <SearchIcon />
                </IconButton>
            )


         }}
         />
         <Button
            type="button"
            onClick={() => 
                setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
            }
            >
                Sort: {sortOrder === "asc" ? "A-Z" : "Z-A"}
            </Button>

        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Button type="submit">Add</Button>

        <List>
          {filteredUsers.map((user) => (
            <ListItem
              key={user.id}
              secondaryAction={
                <Stack direction="row" spacing={1}>
                    {editingId === user.id ? (
                        <>
                        <Button size="small" onClick={() => saveEdit()}>Save</Button>
                        <Button size="small" onClick={cancelEdit}>Cancel</Button>
                        </>
                    ) :(
                        <IconButton edge="end" aria-label="edit" onClick={() => startEdit(user)}>
                            <CreateIcon />
                        </IconButton>
                    )}
                    <IconButton edge="end" aria-label="delete" onClick={() =>openDeleteDialog(user.id)}>
                    <DeleteIcon />
                    </IconButton>


                </Stack>
              }
            >
              {editingId === user.id ? (
                <TextField
                    size="small"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    />
              ) : (
                user.name
              )}
            </ListItem>
          ))}
        </List>
        <Dialog
            open={deleteId !== null}
            onClose={closeDeleteDialog}
            aria-labelledby="delete-users-title"
            aria-describedby="delete-users-descroption">
                
                <DialogTitle id="delete-users-title">Delete User</DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete {userToDelete?.name}?
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button
                     onClick={async () => {
                        if (deleteId === null) return;
                        await handleDeleteUser(deleteId);
                        closeDeleteDialog();
                     }}
                     >
                        Confirm
                     </Button>
                     <Button
                        onClick={closeDeleteDialog}>Cancel</Button>
                </DialogActions>



            </Dialog>
      </Stack>


    </>
  );
}
