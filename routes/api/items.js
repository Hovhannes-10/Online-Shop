const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const Item = require('../../models/item');

router.get('/', (req , res) =>{
    Item.find()
    .sort({date: -1})
    .then(items => res.json(items))
})

router.post('/' ,(req , res) =>{
    const file = req.files.file
    file.mv(`${__dirname}../../../client/public/uploads/${file.name}`, err =>{
      if (err) {
        console.error(err)
        return res.status(500).send(err);
      }
    })
    const imgPath = `/uploads/${file.name}`
    const newItem = new Item({
        name: req.body.name,
        img: imgPath,
        price:req.body.price,
        info: req.body.info,
        count:0,
        inCart:false 
    })
    newItem.save().then(item => res.json(item))
});
router.put("/:id", (req, res) =>{

  Item.findById(req.params.id , (err , item) =>{
    if (err) {
      // console.log(err) 
    }
    item.inCart=!item.inCart;
    item.count = 1;
    item.save().then(item => res.json(item))
  })
})
router.post('/remove_cart' ,(req , res) =>{
  Item.find({inCart:true})
    .sort({date: -1})
    .then(items => {
      items.forEach(e => {
        e.inCart = !e.inCart;
        e.save() 
      }) 
      console.log(items)
      res.json([])
    })
})

router.delete('/:id',auth, (req , res) => {
    Item.findById(req.params.id)
    .then( (item) => item.remove().then(()=>res.json({success:true})))
    .catch(err => res.status(404).json({success:false}))
})

module.exports = router 