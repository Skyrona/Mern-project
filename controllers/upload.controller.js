const UserModel = require("../models/user.model");
const fs = require("fs");

module.exports.uploadProfile = async (req, res) => {
  try {
    if (
      req.file.mimetype !== "image/jpg" &&
      req.file.mimetype !== "image/png" &&
      req.file.mimetype !== "image/jpeg"
    ) {
      throw Error("invalid file");
    }

    if (req.file.size > 500000) throw Error("Max size");

  } catch (err) {
    return res.status(201).json({ message: err });
  }

  const fileName = req.body.name + ".jpg";

  fs.writeFile(
    `${__dirname}/../client/public/uploads/profile/${fileName}`,
    req.file.buffer,
    () => {
        ""
    }
  );

  try {
      const response = await UserModel.findByIdAndUpdate(
          req.body.userId,
          { $set: {picture: "./uploads/profile/" + fileName}},
          { new: true, upsert: true }
      ).select("-password");
      res.send(response);

  } catch (err) {
    return res.send(err);
  }

};
