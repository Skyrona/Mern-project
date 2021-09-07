const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password");
  res.status(200).json(users);
};

module.exports.userInfo = (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("ID unknown: " + req.params.id);
  }

  UserModel.findById(req.params.id, (err, data) => {
    if (!err) res.send(data);
    else console.log("Error, ID valid but not found");
  }).select("-password");
};

module.exports.updateUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("ID unknown: " + req.params.id);
  }

  try {
    const result = await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          bio: req.body.bio,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    ).select("-password");
    res.json(result);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.deleteUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("ID unknown: " + req.params.id);
  }

  try {
    await UserModel.deleteOne({ _id: req.params.id }).exec();
    res.status(200).json({ message: "User successfully deleted." });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.follow = async (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToFollow)
  ) {
    return res.status(400).send("ID unknown: " + req.params.id);
  }

  try {
    const user = await UserModel.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { following: req.body.idToFollow } },
      { new: true, upsert: true }
    );

    await UserModel.findByIdAndUpdate(
      req.body.idToFollow,
      { $addToSet: { followers: req.params.id } },
      { new: true, upsert: true }
    );

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
};

module.exports.unfollow = async (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToUnfollow)
  ) {
    return res.status(400).send("ID unknown: " + req.params.id);
  }

  try {
    const user = await UserModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { following: req.body.idToUnfollow } },
      { new: true, upsert: true }
    );

    await UserModel.findByIdAndUpdate(
      req.body.idToUnfollow,
      { $pull: { followers: req.params.id } },
      { new: true, upsert: true }
    );

    res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
