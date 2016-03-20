'use strict';
import path from 'path';
import express from 'express';
import serveStatic from "serve-static";
import bodyParser from "body-parser"

module.exports = function (done) {
	const app = express();

	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json())
	const router = express.Router();
	$.router = router;
	app.use(router);

	app.use("/static",serveStatic(path.resolve(__dirname,"../../static")));
	app.listen($.config.get("web.port"),(err) =>{
		done(err);
	})
}