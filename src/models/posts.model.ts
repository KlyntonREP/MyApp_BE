import mongoose, { Schema, Document } from 'mongoose';

export interface PostDoc extends Document {
    userId: string;
    caption: string;
    imageUrl: string;
    videoUrl: string;
}

const PostSchema = new Schema<PostDoc>(
    {
        userId: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        caption: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
            required: true,
        },
        videoUrl: {
            type: String,
            required: false,
        },
    },
    { timestamps: true },
);

const PostModel = mongoose.model<PostDoc>('Post', PostSchema);

export default PostModel;
