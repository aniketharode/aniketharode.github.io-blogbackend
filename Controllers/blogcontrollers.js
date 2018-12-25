const express = require('express');
const mongoose = require('mongoose');
const shortid = require('shortid');
const generate = require('../libs/responseLib');
const logger = require('../libs/loggerLib')

const BlogModel = mongoose.model('Blog');


let helloworld = (req,res) => {
    res.send("hello world");
} 

let routeParam = (req,res)=> {
console.log("route param is:-"+req.params);
res.send(req.params);
}

let queryParam = (req,res)=> {
    console.log("query param is:-"+req.query);
    res.send(req.query);
    }

let bodyParam = (req,res)=> {
    console.log("body param is:-"+req.body);
    res.send(req.body);
    }
 

let getAllBlogs = (req,res) =>{
    BlogModel.find()
.select('-__v -_id')
.lean()
.exec((err,result) => {
if(err){
    logger.error('error occured','getAllBlogs',10);
    let apiresponse = generate.generate(true,'Error occured while geting data',500,null);
    res.send(apiresponse);
}
else if(result==undefined || result==null || result==''){
    logger.error('error occured as result is undefined','getAllBlogs',10);
    let apiresponse = generate.generate(true,'blog not found',404,null);
res.send(apiresponse);
}
else{
    logger.info('get all the blogs','getAllBlogs',10);
    let apiresponse = generate.generate(false,'blog found',200,result);
    res.send(apiresponse);
}

})

}


/**
 * function to read single blog.
 */

let viewByBlogId = (req, res) => {

    BlogModel.findOne({ 'blogId': req.params.blogId }, (err, result) => {

        if (err) {
            logger.error('error occured','viewByBlogId',10);
            let apiresponse = generate.generate(true,'Error occured while geting data',500,null);
            res.send(apiresponse);
        } else if (result == undefined || result == null || result == '') {
            logger.error('error occured as result is undefined','getAllBlogs',10);
            let apiresponse = generate.generate(true,'blog not found',404,null);
res.send(apiresponse);
        } else {
            logger.info('get all the blogs','getAllBlogs',10);
            let apiresponse = generate.generate(false,'blog found',200,result);
            res.send(apiresponse);
        }
    })
}


let viewByCategory = (req, res) => {

    BlogModel.find({ 'category': req.params.category }, (err, result) => {

        if (err) {
            logger.error('error occured','viewByCategory',10);
            let apiresponse = generate.generate(true,'Error occured while geting data',500,null);
    res.send(apiresponse);
        } else if (result == undefined || result == null || result == '') {
            logger.error('error occured as result is undefined','viewByCategory',10);
            let apiresponse = generate.generate(true,'blog not found',404,null);
res.send(apiresponse);
        } else {
            logger.info('get all the blogs','viewByCategory',10);
            let apiresponse = generate.generate(false,'blog found',200,result);
    res.send(apiresponse);

        }
    })
}


let viewByAuthor = (req, res) => {

    BlogModel.find({ 'author': req.params.author }, (err, result) => {

        if (err) {
            logger.error('error occured','viewByAuthor',10);
            let apiresponse = generate.generate(true,'Error occured while geting data',500,null);
    res.send(apiresponse);
        } else if (result == undefined || result == null || result == '') {
            logger.error('error occured as result is undefined','viewByAuthor',10);
            let apiresponse = generate.generate(true,'blog not found',404,null);
res.send(apiresponse);
        } else {
            logger.info('get all the blogs','viewByAuthor',10);
            let apiresponse = generate.generate(false,'blog found',200,result);
    res.send(apiresponse);

        }
    })
}

//creattng the blog

let creatBlog = (req,res) => {
    var today = Date.now();
    var blogId = shortid.generate();

let newBlog = new BlogModel({

    blogId: blogId,
    title: req.body.title,
    description: req.body.description,
    bodyHtml: req.body.blogBody,
    isPublished: true,
    category: req.body.category,
    author: req.body.fullName,
    created: today,
    lastModified: today


})

let tags =  (req.body.tags != undefined && req.body.tags != null && req.body.tags != '') ? req.body.tags.split(',') : []

newBlog.tags = tags;

newBlog.save((err, result) => {
    if (err) {
        logger.error('error occured ','create blog',10);
        let apiresponse = generate.generate(true,'Error occured while geting data',500,null);
        res.send(apiresponse);
    } else {
        logger.info('blog created','create blog',10);
        let apiresponse = generate.generate(false,'blog found',200,result);
    res.send(apiresponse);

    }
}) // end new blog save


}


/**
 * function to edit blog by admin.
 */
let editBlog = (req, res) => {

    let options = req.body;
    console.log(options);
    BlogModel.update({ 'blogId': req.params.blogId }, options, { multi: true }).exec((err, result) => {

        if (err) {
            logger.error('error occured ','editBlog',10);
            let apiresponse = generate.generate(true,'Error occured while geting data',500,null);
    res.send(apiresponse);
        } else if (result == undefined || result == null || result == '') {
            logger.error('error occured as result is undefined','editBlog',10);
            let apiresponse = generate.generate(true,'blog not found',404,null);
            res.send(apiresponse);
        } else {
            logger.info('edited Blog succefull','editBlog',10);
            let apiresponse = generate.generate(false,'blog edited',200,result);
            res.send(apiresponse);
        }
    })
}


/**
 * function to delete the assignment collection.
 */
let deleteBlog = (req, res) => {
    BlogModel.remove({ 'blogId': req.params.blogId }, (err, result) => {
        if (err) {
            console.log(err)
            let apiresponse = generate.generate(true,'Error occured while geting data',500,null);
            res.send(apiresponse);
        } else if (result == undefined || result == null || result == '') {
            console.log('No Blog Found')
            let apiresponse = generate.generate(true,'blog not found',404,null);
            res.send(apiresponse);
        } else {
            let apiresponse = generate.generate(false,'deleted blog',200,result);
    res.send(apiresponse);

        }
    })
}



/**
 * function to increase views of a blog.
 */
let increaseBlogView = (req, res) => {

    BlogModel.findOne({ 'blogId': req.params.blogId }, (err, result) => {

        if (err) {
            console.log(err)
            let apiresponse = generate.generate(true,'Error occured while geting data',500,null);
            res.send(apiresponse);
        } else if (result == undefined || result == null || result == '') {
            console.log('No Blog Found')
            let apiresponse = generate.generate(true,'blog not found',404,null);
            res.send(apiresponse);
        } else {
            
            result.views += 1;
            result.save(function (err, result) {
                if (err) {
                    console.log(err)
                    res.send(err)
                }
                else {
                    console.log("Blog updated successfully")
                    let apiresponse = generate.generate(false,'Blog updated successfully',200,result);
                    res.send(apiresponse);

                }
            });// end result

        }
    })
}





module.exports = {
    helloworld:helloworld,
    routeParam:routeParam,
    queryParam:queryParam,
    bodyParam:bodyParam,
    getAllBlogs:getAllBlogs,
    viewByBlogId: viewByBlogId,
    viewByCategory: viewByCategory,
    viewByAuthor: viewByAuthor,
    createBlog: creatBlog,
    editBlog:editBlog,
    deleteBlog:deleteBlog,
    increaseBlogView:increaseBlogView
}