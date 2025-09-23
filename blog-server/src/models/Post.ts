import { model, Schema } from "mongoose";

export interface IPost extends Document {
  title: string;
  content: string;
  author: Schema.Types.ObjectId;
}

const PostSchema = new Schema<IPost>(
  {
    title: {
      required: true,
      type: String,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
const Post = model<IPost>("Post", PostSchema);

export default Post;
