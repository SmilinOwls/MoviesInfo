const express = require('express');
const router = express.Router();
const categoryC = require('../controllers/category.c');
const productC = require('../controllers/product.c');

function isAuthorized(req,res,next){
    if(!req.session.user){
        res.redirect('/user/signin');
    } 
    else next();
};

router.get('/',isAuthorized, async(req,res,next) => {

    const categories = await categoryC.all();
    for(let category of categories){
        category.isActive = false;
    }

    categories[0].isActive = true;
    const products = await productC.allByCatId(1);

    res.render('home',{
        categories: categories,
        products: products,
        chk: true,
        title: "Category"
    })
});

router.use('/:id/product',async(req,res,next) => {
    const id = parseInt(req.params.id);
    const categories = await categoryC.all();
    const products = await productC.allByCatId(id);
    for(let category of categories){
        category.isActive = false;
        if(category.CatID === id) category.isActive = true;
    }

    res.render('home',{categories: categories, products: products, chk: true,title: "Product"})
    
});

router.use('/curd',async (req,res,next) =>{
    const categories = await categoryC.all();
    res.render('curd',{title: "CURD category",categories: categories,chk: true});
});

router.post('/:CatID/edit',async(req,res,next)=>{
    const CatID = parseInt(req.params.CatID);
    const categories = await categoryC.all();
    for(const category of categories){
        category.isEdit = false;
        if(category.CatID === CatID) category.isEdit = true; 
    }
    res.render('curd',{title: "Edit category",categories: categories,chk: true});
});

router.post('/:CatID/delete',async(req,res,next)=>{
    if(typeof req.params.CatID === undefined){
        res.redirect('/category/curd');
        return;
    }
    const CatID = parseInt(req.params.CatID);
    const products = await productC.allByCatId(CatID);
    if(products.length > 0) {
        console.log('Cannot delete this category because it has products reference');
        res.redirect('/category/curd');
        return;
    }
    categoryC.del(CatID).then(data => {res.redirect('/category/curd');})
    .catch(error => console.log(error));
    
});

router.post('/:CatID/update',async(req,res,next)=>{
    const cat = {
        CatID: req.params.CatID,
        CatName: req.body.catName
    };
    //console.log(cat);
    categoryC.update(cat).then(data => {res.redirect('/category/curd');})
    .catch(error => console.log(error));
});

router.post('/add',async(req,res,next)=>{
    const categories = await categoryC.all();
    res.render('curd',{title: "Add category",categories: categories,chk: true, add: true});
});

router.post('/insert',async(req,res,next)=>{
    const cat = {
        CatID: req.body.catID,
        CatName: req.body.catName
    };
    categoryC.add(cat).then(data => {res.redirect('/category/curd');})
    .catch(error => console.log(error));
});


module.exports = router;