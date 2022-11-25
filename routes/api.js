const express = require('express');
const router = express.Router() // routing function
const DATA = require('../models/model')  // db of student
const app = new express()


// router.get('/api/blog', async(req, res)=>{
//     // console.log('Call OK')
//     console.log('get call ok')
//     res.send('OKKK')
// })

router.post('/blog', async(req, res)=>{

    try {
        
        console.log(req.body)
        let item ={  // to fetch and save data from frontend in server
            bloggerName : req.body.bloggerName,
            avatar : req.body.avatar,
            followers: req.body.followers,
            blogHeading: req.body.blogHeading,
            subHeading: req.body.subHeading,
            blogImage: req.body.blogImage,
            blogPara: req.body.blogPara,
            comment: req.body.comment
        } 
        
        const newBlog = new DATA(item)  // checking incoming data with schema
        const savedBlog = await newBlog.save()  // saving to db

        res.send(savedBlog)

    } catch (error) {
        console.log(error)
    }

})



router.put('/blog/:id',async(req, res)=>{

    try {
         
        let id = req.params.id
        console.log('put id:',id)
        console.log('edited:',req.body)
        let datas = req.body.data
        // let datas = {}
        let updateStudent = await DATA.findOneAndUpdate({_id : id},{$push:{comment:{name:datas.name,content:datas.content}}},{new : true})

        res.send(updateStudent)
        console.log('updated student:',updateStudent)

    } catch (error) {
        console.log(error) 
    }
 
} ) 

router.put('/blog/follow/:id', async(req, res)=>{
    try {
        let id = req.params.id
        console.log('put id:',id)
        console.log('edited:',req.body)
        let follow = await DATA.findOneAndUpdate({_id:id},{followers:req.body.count,followingStatus:req.body.status},{new:true})
        console.log(follow)
        res.send(follow)
    } catch (error) {
        console.log(error)
    }
})


module.exports = router