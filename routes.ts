import { Router } from "https://deno.land/x/oak/mod.ts";
import { Controllers } from "./controllers.ts";

const router = new Router();

router.get("/employees", Controllers.allUsers);
router.get("/employee/:id", Controllers.oneUser);
router.delete("/employee/:id", Controllers.deleteUser);
router.post("/employee", Controllers.createUser);
router.put("/employee/:id", Controllers.updateUser);

export default router;
