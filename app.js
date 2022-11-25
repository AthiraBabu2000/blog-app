const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const app = new express();
const DATA = require('./models/model')

require('./middlewares/mongoDB') 


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(logger('dev'));

// ----------------------------------------for hosting in heroku---------------------------
 const path = require('path');                // for hosting in heroku
 app.use(express.static('./dist/Frontend'));  // for hosting in heroku



const port = process.env.PORT || 3000;
// const api = require('./routes/api')
// app.use('/api',api)



// ------------------------------------------API CALLS--------------------------------------
app.get('/api/blog', async(req, res)=>{
    try {
        
        const list = await DATA.find()
        console.log(list[0])
        res.send(list[0])
         console.log("get");
 
    } catch (error) {
        
        console.log(error) 

    }

})

app.post('/api/blog', async(req, res)=>{

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



app.put('/api/blog/:id',async(req, res)=>{

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

app.put('/api/blog/follow/:id', async(req, res)=>{
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


// --------------------------------------for heroku hosting--------------------------
 app.get('/*', function(req, res) {
   res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
}); 
   
  

app.listen(port, ()=>{
    console.log(`----------Server is running on port ${port}----------------`)
}) 