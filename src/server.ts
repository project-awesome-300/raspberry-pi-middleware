
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as logger from "morgan";
import * as path from "path";
import * as cors from "cors";
import errorHandler = require("errorhandler");
import methodOverride = require("method-override");
import { IndexRoute } from "./routes/index.route";
import { GCloudRoute } from "./routes/gcloud.route";
import { FirebaseDBRoute } from "./routes/firebasedb.route";
import { APIRoute } from "./routes/api.route";

export class Server {
  public app: express.Application;


  public static bootstrap(): Server {
    return new Server();
  }

  constructor() {
    //create expressjs application
    this.app = express();

    //configure application
    this.config();

    //add routes
    this.routes();

    //add api
    this.api();
  }


  public api() {
    //empty for now
  }

  public config() {
    //add static paths
    this.app.use(express.static(path.join(__dirname, "public")));
    this.app.use(express.static(path.join(__dirname, "camera")));
    //configure pug
    this.app.set("views", path.join(__dirname, "views"));
    this.app.set("view engine", "pug");

    //use logger middlware
    this.app.use(logger("dev"));

    //use json form parser middlware
    this.app.use(bodyParser.json({
      limit: '50mb'
    }));

    //use query string parser middlware
    this.app.use(bodyParser.urlencoded({
      extended: true,
      limit: '50mb'
    }));

    this.app.use(cors({ origin: true }));
    //use cookie parser middleware
    this.app.use(cookieParser("SECRET_GOES_HERE"));

    //use override middlware
    this.app.use(methodOverride());

    //catch 404 and forward to error handler
    this.app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
      err.status = 404;
      next(err);
    });

    //error handling
    this.app.use(errorHandler());
  }
  private routes() {
    let router: express.Router;
    router = express.Router();

    //IndexRoute
    IndexRoute.create(router);
    APIRoute.create(router);
    GCloudRoute.create(router);
    FirebaseDBRoute.create(router);

    //use router middleware
    this.app.use(router);
  }
}