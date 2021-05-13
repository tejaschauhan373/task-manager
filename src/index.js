const express = require('express');
const userRouter = require('./router/user');
const taskRouter = require('./router/task');
const app = express();
app.use(express.json());

app.use(userRouter);
app.use(taskRouter);

app.listen(process.env.PORT || 3000, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});