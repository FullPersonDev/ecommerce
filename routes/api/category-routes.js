const router = require('express').Router();
const { where } = require('sequelize');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: {model: Product}
  })
  .then((categoryData) => {
    res.json(categoryData);
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk(req.params.id, {
    include: {model: Product}
  })
  .then((category) => {
    res.json(category);
  });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
  .then((categoryUpdated) => {
    res.json(categoryUpdated);
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
  {
    category_name: req.body.category_name
  },
  {
    where: {
    id: req.params.id
    }
  })
  .then((categoryUpdated) => {
    res.json(categoryUpdated);
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then((categoryDeleted) => {
    res.json(categoryDeleted);
  });
});

module.exports = router;
