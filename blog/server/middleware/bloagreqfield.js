const chefield = async (req,res,next) => {
    console.log(req.body);
    
    const {title , content , category} = req.body;
    if(!title || !content || !category) {
        return res.send({msg : "All fields are required"});
    }
    next();
}

module.exports = chefield;