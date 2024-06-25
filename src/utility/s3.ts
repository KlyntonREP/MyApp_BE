import aws from 'aws-sdk';
import env from '../config/environmentVariables';
import multer, { FileFilterCallback } from 'multer';
import { HttpException } from './http.exception';
import { Request } from 'express';
import log from '../utility/logger';

const s3 = new aws.S3({
    accessKeyId: `${env.AWS_ACCESS_KEY}`,
    secretAccessKey: `${env.AWS_SECRET_KEY}`,
    region: `${env.AWS_BUCKET_REGION}`,
});

export const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (_: Request, file: Express.Multer.File, callback: FileFilterCallback) => {
        // Define the allowed extension
        const allowedFileMimeTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];

        if (allowedFileMimeTypes.includes(file.mimetype)) return callback(null, true);
        callback(new HttpException(`Error: File type: ${file.mimetype} not allowed!`, 400));
    },
    limits: {
        fileSize: 1024 * 1024 * 10, // 10mb file size
    },
});

// // Configure AWS S3

export const uploadImageToS3 = async (file: Express.Multer.File): Promise<string> => {
    const key = `images/upload/${Date.now()}-${file.originalname}`;
    await s3
        .upload({
            Bucket: env.AWS_BUCKET_NAME!,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
        })
        .promise();
    return `https://${env.AWS_BUCKET_NAME}.s3.amazonaws.com/${key}`;
};

export const uploadMultipleImages = async (files: Express.Multer.File[]): Promise<string[]> => {
    return await Promise.all(files?.map(uploadImageToS3));
};

//   deleting the image file from AWS s3 bucket
export const deleteFileFromS3 = async (fileUrl: string) => {
    try {
        if (!fileUrl.includes('.s3.amazonaws.com/')) return;
        s3.deleteObject({
            Bucket: env.AWS_BUCKET_NAME!,
            Key: fileUrl.split('.s3.amazonaws.com/')[1],
        })
            .promise()
            .then(() => {
                log.info(`File: ${fileUrl} deleted from S3 bucket`);
            });
    } catch (error) {
        console.error('Error deleting file from S3:', error);
    }
};
