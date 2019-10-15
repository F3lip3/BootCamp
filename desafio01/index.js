const express = require('express');
const server = express();

let numberOfRequests = 0;
const projects = [];

function logRequests(req, res, next) {
    numberOfRequests++;
    console.log('Number of requests:', numberOfRequests);
    return next();
}

function projectExists(req, res, next) {
    const { id } = req.params;
    const project = projects.find(x => x.id === id);
    if (!project) {
        return res.status(400).json({ error: 'Project not found!' });
    }
    req.project = project;
    return next();
}

server.use(express.json());
server.use(logRequests);

server.get('/projects', (req, res) => {
    return res.json(projects);
});

server.post('/projects', (req, res) => {
    const { id, title } = req.body;

    const project = {
        id,
        title,
        task: []
    };

    projects.push(project);

    return res.json(project);
});

server.post('/projects/:id/tasks', projectExists, (req, res) => {
    const { title } = req.body;
    req.project.task.push(title);
    return res.json(req.project);
});

server.put('/projects/:id', projectExists, (req, res) => {
    const { title } = req.body;
    req.project.title = title;
    return res.json(req.project);
});

server.delete('/projects/:id', projectExists, (req, res) => {
    const index = projects.findIndex(x => x.id === req.project.id);
    projects.splice(index, 1);
    return res.json(projects);
});

server.listen(3333);
