import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: {type:String,required:true,trim: true,maxLength:80},
    fileUrl:{type:String, required:true},
    thumbUrl:{type:String,required:false},
    description: {type:String,required:true,trim:true,minLength:2},
    createdAt : {type:Date,required:true,default:Date.now},
    owner:{type: mongoose.Schema.Types.ObjectId,required:true,ref:"User"
    },
    hashtags:[{type:String,trim:true}],
    comments:[{type:mongoose.Schema.Types.ObjectId,required:true,ref:"Comment"}],
    meta:{
        views:{type:Number,default:0,required:true},
        rating:{type:Number,default:0,required:true},

    },
    

});

videoSchema.static('formatHashtags',function(hashtags){
return hashtags.split(",").map((word)=>word.startsWith('#')?word:`#${word}`)

})



const movieModel = mongoose.model("Video",videoSchema);
export default movieModel;