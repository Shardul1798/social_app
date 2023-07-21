import { Router } from "express"
import postRoutes from "./post.routes";
import { userRoutes } from "./user.routes";

class AppRoutes {
    public appRoute:Router;
    constructor() {
        this.appRoute = Router();
    }

    loadRoutes() {
        this.appRoute.use('/user', userRoutes.loadUserRoutes());
        this.appRoute.use('/post', postRoutes.loadPostRoutes());
        // this.route.use(FOLLOWER_MANAGEMENT)
        // this.route.use(SESSION)
        return this.appRoute;
    }
}

const appRoutes = new AppRoutes();
export default appRoutes;