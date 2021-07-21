import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { ensureAuthentication } from "./middlewares/ensureAuthenticated";
import { ListUserSentComplimentsController } from "./controllers/ListUserSentComplimentsController";
import { ListUserReceivedComplimentsController } from "./controllers/ListUserReceivedComplimentsController";
import { ListTagsController } from "./controllers/ListTagsController";
import { ListUsersController } from "./controllers/ListUserController.";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listUserSentComplimentsController = new ListUserSentComplimentsController();
const listUserReceivedComplimentsController = new ListUserReceivedComplimentsController();
const listTagsController = new ListTagsController();
const listUsersController = new ListUsersController();

router.post("/users", createUserController.handle);

router.get("/users", ensureAuthentication, listUsersController.handle);

router.post("/login", authenticateUserController.handle)

router.get("/tags", ensureAuthentication, listTagsController.handle);

router.post("/tags", ensureAuthentication, ensureAdmin,  createTagController.handle);

router.post("/compliments", ensureAuthentication , createComplimentController.handle);

router.get("/user/compliments/sent", ensureAuthentication, listUserSentComplimentsController.handle);

router.get("/user/compliments/received", ensureAuthentication, listUserReceivedComplimentsController.handle);



export { router }