import express from 'express';


const app = express();
app.use(express.json());

const PORT = 8080; 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


let users = [
    {
        id: 1,
        name: 'Harry Potter',
        email: 'harry@example.com'
    },
    {
        id: 2,
        name: 'Merlin',
        email: 'merlin@example.com'
    },
    {
        id: 2,
        name: 'Gandalf',
        email: 'gandalf@example.com'
    }
];

// Routes

app.get('/users', (req, res) => {
    res.json(users);
});

app.post('/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email,
    }
    users.push(newUser);
    res.json({message: "Added a new user:", user: newUser}); 
});

app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id); 
    const user = users.find(u => u.id === userId);
    if (!user){
        return res.status(404).json({message: "User not found"});
    }
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    res.json({message: "User updated!", user});
})

app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    users = users.filter((u) => u.id !== userId);
    res.json({message: "User deleted!"});
})
