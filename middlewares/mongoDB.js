const mongoose = require ('mongoose')
mongoose.connect('mongodb+srv://AthiraBabu321:jud0rEqXL1n6ygz5@cluster1.it4967f.mongodb.net/codechallenge?retryWrites=true&w=majority')

.then(()=>{
    console.log('-------mongodb connected successfully-------')
})
.catch((error)=>{
    console.log(error.message)
}) 