import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false,
    },
    video: {
        type: String,
        required: false
    }
})

const Article = mongoose.model("Article", ArticleSchema);
export default Article;
