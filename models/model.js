const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    bloggerName: {
        type: String
    },
    avatar: {
        type: String
    },
    followers: {
        type: Number
    },
    blogHeading: {
        type: String
    },
    subHeading: {
        type: String
    },
    blogImage: {
        type: String
    },
    blogPara: {
        type: String
    },
    followingStatus:{
        type: String
    },
    comment: 
        [{
            name:{
                type: String
            },
            content: {
                type: String
            }

        }],
       
    

})
let BlogDATA = mongoose.model('blogdetail', BlogSchema);
module.exports = BlogDATA
