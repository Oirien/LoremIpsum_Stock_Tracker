const express = require('express');
const ObjectID = require('mongodb').ObjectID;

const createRouterStocks = function (collection) {
    const router = express.Router();

    router.get('/search', (req, res) => {
        console.log(req.query.q);
        collection
            .find(
                { $text: { $search: req.query.q } },
                { score: { $meta: 'textScore' } },
            )
            .sort({ score: { $meta: 'textScore' } })
            .toArray()
            .then((docs) => res.json(docs))
            .catch((err) => {
                console.error(err);
                res.status(500);
                res.json({ status: 500, error: err });
            });
    });

    router.get('/', (req, res) => {
        collection
            .find()
            .toArray()
            .then((docs) => res.json(docs))
            .catch((err) => {
                console.error(err);
                res.status(500);
                res.json({ status: 500, error: err });
            });
    });

    router.get('/:id', (req, res) => {
        const id = req.params.id;
        collection
            .findOne({ _id: ObjectID(id) })
            .then((doc) => res.json(doc))
            .catch((err) => {
                console.error(err);
                res.status(500);
                res.json({ status: 500, error: err });
            });
    });

    router.post('/', (req, res) => {
        const newData = req.body;

        collection
            .insertOne(newData)
            .then((doc) => {
                res.json(doc.ops[0]);
            })
            .catch((err) => {
                console.log(err);
                res.status(500);
                res.json({ status: 500, error: err });
            });
    });

    router.put('/:id', (req, res) => {
        const id = req.params.id;
        const updatedData = req.body;
        delete updatedData._id;

        collection
            .updateOne({ _id: ObjectID(id) }, { $set: updatedData })
            .then((result) => {
                res.json(result);
            })
            .catch((err) => {
                res.status(500);
                res.json({ status: 500, error: err });
            });
    });

    router.delete('/:id', (req, res) => {
        collection
            .deleteOne({ _id: ObjectID(req.params.id) })
            .then((doc) => {
                res.json(doc);
            })
            .catch((err) => {
                console.log(err);
                res.status(500);
                res.json({ status: 500, error: err });
            });
    });

    return router;
};

module.exports = createRouterStocks;
