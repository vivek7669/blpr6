const blpost = require("../model/Blog.schema");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

const getAllBloag = async (req, res) => {
  const data = await blpost.find();
  res.send({ data });
};

const genBloag = async (req, res) => {
  const { title, content, category } = req.body;
  try {
    let data = { title, content, category, image: req.file.path };

    const bdata = await blpost.create(data);
    console.log(bdata);

    if (bdata) return res.status(200).send({ msg: "Bloag Is Genrated.", BloagData: bdata });
    return res.status(401).send({ msg: "Bloag Genrated Time To Occured Error." });
  } catch (error) {
    return res.status(501).send({ err: error });
  }
};

const removeBloag = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await blpost.findByIdAndDelete({_id: id}).lean();
    if (!data) {
      return res.status(401).send({ msg: "Bloa Remove Time Occured Error." });
    }
    return res.status(200).send({ msg: "Bloa Remove Successfully.", data });
  } catch (error) {
    return res.status(501).send({ err: error });
  }
};

const ModifyBloag = async (req,res) => {
    const { id } = req.params;

    const {title , content ,image ,category} = req.body;
 
    try {
        const data = await blpost.findByIdAndUpdate({_id : id},req.body,{new : true});
        if(!data) { return res.status(401).send({msg : "Blog  Updated Time Created Error."}); }
        return res.status(200).send({msg : "Blog Is Updated." , data});
    } catch (error) {
        return res.status(501).send({err : error});
    }
}

module.exports = { getAllBloag, genBloag, removeBloag, ModifyBloag, upload };
