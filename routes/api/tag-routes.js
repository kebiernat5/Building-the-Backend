const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTags = await Tag.findAll({
      include: [{ model: Product },],
    });
    res.status(200).json(allTags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const oneTag = await Tag.findByPk(req.params.id, {
    });

    if (!oneTag) {
      res.status(404).json({ message: 'No products found with that id!' });
      return;
    }

    res.status(200).json(oneTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.post('/', (req, res) => {
//   // create a new tag
//   Tag.create(req.body)
//     .then((tag) => {
//       // if there's product tags, we need to create pairings to bulk create in the ProductTag model
//       if (req.body.ids.length) {
//         const tagIdArr = req.body.ids.map((id) => {
//           return {
//             id: tag.id,
//             id,
//           };
//         });
//         return Tag.bulkCreate(tagIdArr);
//       }
//       // if no product tags, just respond
//       res.status(200).json(tag);
//     })
//     .then((tagIds) => res.status(200).json(tagIds))
//     .catch((err) => {
//       console.log(err);
//       res.status(400).json(err);
//     });
// });

router.post('/', (req, res) => {
  Tag.create (req.body)
.then((TagData) =>{
  res.json(TagData);
});
});
// router.put('/:id', (req, res) => {
//   // update a tag's name by its `id` value
//   Tag.update(req.body, {
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then((tag) => {
//       // find all associated tags from ProductTag
//       return Tag.findAll({ where: { productTag_id: req.params.id } });
//     })
//     .then((productTags) => {
//       // get list of current tag_ids
//       const tagIds = tags.map(({ tag_id }) => tag_id);
//       // create filtered list of new tag_ids
//       const newTags = req.body.tagIds
//         .filter((tag_id) => !tagIds.includes(tag_id))
//         .map((tag_id) => {
//           return {
//             tag_id: req.params.id,
//             tag_id,
//           };
//         });
//       // figure out which ones to remove
//       const tagsToRemove = tags
//         .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
//         .map(({ id }) => id);

//       // run both actions
//       return Promise.all([
//         Tag.destroy({ where: { id: tagsToRemove } }),
//         Tag.bulkCreate(newTags),
//       ]);
//     })
//     .then((updatedTags) => res.json(updatedTags))
//     .catch((err) => {
//       // console.log(err);
//       res.status(400).json(err);
//     });
// });

router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where:{
      id: req.params.id
      },
  })
  .then((TagData) =>{
    res.json(TagData);
  });
});

// router.delete('/:id', async (req, res) => {
//   // delete on tag by its `id` value
//   try {
//     const deleteTag = await Tag.destroy({
//       where: {
//         id: req.params.id
//       }
//     });

//     if (!deleteTag) {
//       res.status(404).json({ message: 'No product found with this id!' });
//       return;
//     }

//     res.status(200).json(deleteTag);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.delete('/:id', (req, res) => {
  Tag.destroy ({
    where:{
      id: req.params.id
      },
  })
  .then((TagData) =>{
    res.json(TagData);
  });
});

module.exports = router;

