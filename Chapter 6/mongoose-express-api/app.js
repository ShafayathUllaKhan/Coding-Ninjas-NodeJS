import express from "express";
import userRoutes from "./routes/user.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import postRoutes from "./routes/post.routes.js";
import groupRoutes from "./routes/group.routes.js";

const app = express();
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/groups", groupRoutes);

export default app;
