const {existsSync, readFileSync, writeFileSync, readFile} = require('fs');
module.exports = function(path) {


    function readTasks() {
        if(existsSync(path)) {
            return JSON.parse(readFileSync(path))
        } else {
            return {}
        }
    }

    return {
        
        getTasksByStatus() {
            const tasks = readTasks();
            return tasks;
        },
        changeTaskStatus(task, oldStatus, newStatus) {
            const tasks = readTasks();
            if (tasks[oldStatus] instanceof Array && tasks[newStatus] instanceof Array) {
                let index = tasks[oldStatus].findIndex(t => t === task);
                if (index) {
                    tasks[oldStatus].splice(index, 1);
                    tasks[newStatus].push(task);
                    writeFileSync(path, JSON.stringify(tasks));
                    return true;
                }
            }
            return false;
        }
    };
};