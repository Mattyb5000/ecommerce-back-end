const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// Find all tags
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll();
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});
//Find tag by ID
router.get('/:id', async (req, res) => {

  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }]
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});
//Create new tag
router.post('/', async (req, res) => {

  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});
//Update tag by ID
router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
    if (!tagData) {
      res.status(404).json({
        message: 'No tag found with this id!'
      });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});
//Delete tag by ID
router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
  // Tag.destroy({
  //   where: {
  //     id: req.params.id
  //   },
  // })
  // .then((tagData) => {
  //   if (!tagData) {
  //     res.status(404).json({
  //       message: 'No tag fond with this id!'
  //     })
  //     return;
  //   }
  //   res.json(tagData);
  // })
  // .catch((err) => {
  //   res.status(500).json(err)
  // });
});

module.exports = router;
