const router = require('express').Router();
const { Category, Product, ProductTag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allProducts = await Category.findAll({
      include: [{ model: Product },],
    });
    res.status(200).json(allProducts);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const allProducts = await Category.findByPk(req.params.id, {
      include: [{ model: Product },],
    });

    if (!allProducts) {
      res.status(404).json({ message: 'No products found with that id!' });
      return;
    }

    res.status(200).json(allProducts);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newProduct = await Category.create(req.body); 
      res.status(200).json(newProduct);
  } catch (err) {
      res.status(400).json(err);
    }
});


router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updatedProduct = await Category.update(req.body,
      {where: {
        id: req.params.id
      }}); 
      res.status(200).json(updatedProduct);
  } catch (err) {
      res.status(400).json(err);
    }
});


  // delete a category by its `id` value
  router.delete('/:id', async (req, res) => {
    try {
      const unusedProduct = await Category.destroy({
        where: {
          id: req.params.id
        }
      });
  
      if (!unusedProduct) {
        res.status(404).json({ message: 'No product found with this id!' });
        return;
      }
  
      res.status(200).json(unusedProduct);
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;
