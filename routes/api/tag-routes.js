const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: {model: Product, as: 'products'}
  })
  .then((tagData) => {
    res.json(tagData);
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findByPk(req.params.id, {
    include: {model: Product, as: 'products'}
  })
  .then((tag) => {
    res.json(tag);
  });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then((tagCreated) => {
    res.json(tagCreated);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
  {
    tag_name: req.body.tag_name
  },
  {
    where: {
      id: req.params.id
    }
  })
  .then((tagUpdated) => {
    res.json(tagUpdated);
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then((tagDeleted) => {
    res.json(tagDeleted);
  });
});

module.exports = router;
