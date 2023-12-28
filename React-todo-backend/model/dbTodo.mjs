import mongoose from "mongoose"

const TodoSchema = mongoose.Schema({
    message: String,
})

export default mongoose.model("TodoContent",TodoSchema);