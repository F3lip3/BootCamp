import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, res) => {
    let test = 'a';
    if (test === 'a') test = 'b';
    return res.json({ message: 'Hello World' });
});

export default routes;
