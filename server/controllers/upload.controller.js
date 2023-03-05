const multer = require('multer')
const multerS3 = require('multer-s3')
const { S3Client } = require('@aws-sdk/client-s3')
const { User } = require('../models/user.model.js')

const s3 = new S3Client({
    region: process.env.AWS_S3_REGION,
    credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY,
        secretAccessKey: process.env.AWS_S3_ACCESS_KEY_SECRET
    }
})

let counter = 1
const upload = multer({
    storage: multerS3({
        s3,
        bucket: 'cast-a-spell',
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname })
        },
        key: async function (req, file, cb) {
            const user = await User.findById(req.user);
            cb(null, `${user.username}(${counter}).jpg`);
            counter++;
        }
    })
});

async function uploadImages(req, res) {
    const uploadSingle = upload.array('images')
    uploadSingle(req, res, async err => {
        if (err) return res.status(400).json({ message: err.message })
        const imagesLocation = req.files.map(obj => obj.location);
        try {
            const result = await User.updateOne({ _id: req.user }, { $set: { images: imagesLocation } })
            res.status(200).json({ result });
        } catch (e) {
            console.log(e);
            return res.status(400).json({ message: e.message });
        }
    })
}

module.exports = {
    uploadImages
};