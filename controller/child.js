const Child = require("../model/Child");
const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKeyId: process.env.AWS_SECRET_ACCESS_KEY_ID,
  region: process.env.AWS_REGION,
});

exports.createChild = async (req, res) => {
  const {
    name,
    sex,
    dob,
    father_name,
    mother_name,
    district_id,
    photo,
  } = req.body;
  try {
    const newChild = new Child({
      name,
      sex,
      dob,
      father_name,
      mother_name,
      district_id,
      photo,
      user: userId,
    });

    await newChild.save();
    return res.status(200).json({
      success: true,
      status: 200,
      message: "Operation performed successfully",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

exports.getChild = async (req, res) => {
  try {
    const child = await Child.find({ user: req.headers.token }).select({
      _id: 1,
      name: 1,
      sex: 1,
      dob: 1,
      father_name: 1,
      mother_name: 1,
      district_id: 1,
      photo: 1,
    });
    return res.status(200).json({
      success: true,
      status: 200,
      message: "Child Profile Detail",
      child_profile: child,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

exports.uploadImage = async (req, res) => {
  try {
    const { imageName, mimeType, image } = req.body;

    const fileContent = fs.readFileSync(image.path);

    const type = mimeType.split("/")[1];

    const params = {
      Bucket: "hacker-sanju",
      Key: `child/${uuidv4()}.${type}`,
      Body: fileContent,
      ACL: "public-read",
      ContentEncoding: "base64",
      ContentType: `image/${type}`,
    };

    s3.upload(params, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          error: "Image upload to s3 failed",
        });
      }

      return res.json({ url: data.Location, Key: data.Key });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

exports.updateImage = async (req, res) => {
  try {
    const { imageName, mimeType, image, key } = req.body;

    const fileContent = fs.readFileSync(image.path);
    const type = mimeType.split("/")[1];

    const deleteParams = {
      Bucket: "hacker-sanju",
      Key: `${key}`,
    };
    s3.deleteObject(deleteParams, (err, data) => {
      if (err) {
        console.log("error during update".err);
      } else {
        console.log("update to s3".data);
      }
    });
    const params = {
      Bucket: "hacker-sanju",
      Key: `child/${uuidv4()}.${type}`,
      Body: fileContent,
      ACL: "public-read",
      ContentEncoding: "base64",
      ContentType: `image/${type}`,
    };
    s3.upload(params, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          error: "Image upload to s3 failed",
        });
      }

      return res.json({
        url: data.Location,
        key: data.Key,
      });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};
