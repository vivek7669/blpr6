const blpost = require("../model/Blog.schema");
const multer = require("multer");
const user = require("../model/user.schema");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

const getBlogById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await blpost.findOne({ _id: id }).populate("author").populate("comments");
    res.send({ data });
  } catch (error) {
    res.send({ error });
  }
};
const getAllBloag = async (req, res) => {
  try {
    const data = await blpost.find().populate("author").populate("likedBy").populate("comments");;
    res.send({ data });
  } catch (error) {
    res.send({ error });
  }
};

const getAllBloagBuuid = async (req, res) => {
  try {
    let { id } = req.params;
    const data = await blpost.find({ author: id });
    res.send({ data });
  } catch (error) {
    res.send({ error });
  }
};

const genBloag = async (req, res) => {
  const { title, content, category, author } = req.body;

  try {
    let data = { title, content, category, image: req.file.path, author };

    //! step to Bidirectional Populating
    const bdata = await blpost.create(data);
    let findUser = await user.findById(author);
       
    findUser.blogIds.push(bdata.id)
    await findUser.save()
    console.log("bdata,user", bdata, findUser);

    if (bdata)
      return res
        .status(200)
        .send({ msg: "Bloag Is Genrated.", BloagData: bdata });
    return res
      .status(401)
      .send({ msg: "Bloag Genrated Time To Occured Error." });
  } catch (error) {
    return res.status(501).send({ err: error });
  }
};

const removeBloag = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await blpost.findByIdAndDelete({ _id: id }).lean();
    if (!data) {
      return res.status(401).send({ msg: "Blog Remove Time Occured Error." });
    }
    return res.status(200).send({ msg: "Blog Remove Successfully.", data });
  } catch (error) {
    return res.status(501).send({ err: error });
  }
};

const ModifyBloag = async (req, res) => {
  const { id } = req.params;

  if (req?.file != null) {
    req.body.image = req.file.path;
  }

  const { title, content, image, category } = req.body;

  try {
    const data = await blpost.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    if (!data) {
      return res.status(401).send({ msg: "Blog  Updated Time Created Error." });
    }
    return res.status(200).send({ msg: "Blog Is Updated.", data });
  } catch (error) {
    return res.status(501).send({ err: error });
  }
};

module.exports = {
  getAllBloag,
  getBlogById,
  getAllBloagBuuid,
  genBloag,
  removeBloag,
  ModifyBloag,
  upload,
};
