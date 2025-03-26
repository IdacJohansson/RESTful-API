import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();
app.use(express.json());
const PORT = 8080;

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Users API",
      version: "1.0.0",
      description: "API for managing users",
    },
  },
  apis: ["./server.js"],
};

// Generate swagger-documentation
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

let users = [
  {
    id: 1,
    name: "Harry Potter",
    email: "harry@example.com",
  },
  {
    id: 2,
    name: "Merlin",
    email: "merlin@example.com",
  },
  {
    id: 2,
    name: "Gandalf",
    email: "gandalf@example.com",
  },
];

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieves a list of users
 *     description: Retrieves a list of users from email service
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 */

app.get("/users", (req, res) => {
  res.json(users);
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Add a new user
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Added a new user!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 */

app.post("/users", (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email,
  };
  users.push(newUser);
  res.json({ message: "Added a new user:", user: newUser });
});

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user
 *     description: Updates an existing user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *       404:
 *         description: User not found
 */

app.put("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  res.json({ message: "User updated!", user });
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: Deletes an existing user by their ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user to delete
 *     responses:
 *       200:
 *         description: User deleted!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: User not found
 */

app.delete("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  users = users.filter((u) => u.id !== userId);
  res.json({ message: "User deleted!" });
});
