import mongoose,{ Schema }from 'mongoose';


const categorySchema = new Schema({
    //_id:Schema.Types.ObjectId,
    // categoryname: String,
    name: {
        type: String,
        required: true,
    },
  },
  {
    collection: "Category",
  }
);

// import문에서는 export default
const model = mongoose.model("Category",categorySchema);
export default model;
