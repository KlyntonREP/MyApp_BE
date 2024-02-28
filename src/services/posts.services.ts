import { UserModel, PostModel } from '../models/index';
import { uploadFile } from '../utility/s3';
import { ICreatePost } from '../dto';
import log from '../utility/logger';

export const createPostService = async (payload: ICreatePost, user: string, files: any) => {
    try {
        const { caption } = payload;
        let imageUrl;
        let videoUrl;
        if (!user) {
            return { status: 404, message: 'User Not Found' };
        }
        if (files.image) {
            const imageFile = files.image[0]; // Assuming the image field contains a single file
            imageUrl = await uploadFile(imageFile, 'images'); // Process the files as needed by uploading them to AWS S3 and generate URLs
        } else {
            log.info('No image is being sent');
        }
        if (files.video) {
            const videoFile = files.video[0]; // Assuming the video field contains a single file
            videoUrl = await uploadFile(videoFile, 'videos'); // Process the files as needed by uploading them to AWS S3 and generate URLs
        } else {
            log.info('No video is being sent');
        }

        // Create the post object
        const post = {
            userId: user,
            caption,
            imageUrl,
            videoUrl,
        };
        // Save the blog post to the database or perform any other required operations
        const postCreated = PostModel.create(post);
        const User: any = await UserModel.findById(user).exec();
        User.posts.push((await postCreated).id);
        User.save();

        if (!postCreated) {
            return { status: 400, message: 'Failed to create featured post' };
        }

        // Send the response with the created blog post
        return { status: 201, message: 'Post created Successfully', data: post };
    } catch (error) {
        return { status: 500, message: 'Internal Server Error', data: error };
    }
};

// fetches all the posts on a users homepage
export const homepageService = async (user: string) => {
    try {
        const User: any = await UserModel.findById(user);
        if (!User) {
            return { status: 404, message: 'User not found' };
        }
        if (User.following.length < 1) {
            return { status: 400, message: 'Please follow someone to be able to view posts' };
        }
        // Fetch posts for the user and their followers
        const posts = await PostModel.find({ userId: { $in: [...User.following, user] } })
            .sort({ timestamp: -1 }) // Sort by timestamp in descending order for recent posts
            .exec();

        return { status: 201, message: 'Posts Gotten Successfully', data: posts };
    } catch (error) {
        log.info('Create post error', error);
        return { status: 500, message: 'Internal Server Error', data: error };
    }
};
