const express = require('express');
const {join, resolve} = require('path');
const PORT = process.env.PORT || 8080;
const {getTasksByStatus, changeTaskStatus} = require('./service')('tasks.json');
express()
    .use(express.static(join(resolve('..'), 'client')))
    .get('/tasks', (request, response) => {
        const tasks = getTasksByStatus();
        if(Object.keys(tasks).length > 0) {
            response.json(tasks);
        } else {
            response.sendStatus(204);
        }
    })
    .put('/tasks', (request, response) => {
        if (request.query.task && request.query.oldStatus && request.query.newStatus) {
            if (changeTaskStatus(request.query.task, request.query.oldStatus, request.query.newStatus)) {
                response.sendStatus(204);
            } else {
                response.sendStatus(403);
            }
        } else {
            response.sendStatus(400);
        }
    })
    .listen(PORT, () => console.log(`Server is running on port ${PORT}.`));