const Test = require("../../model/test");

const test = async (req, res) => {
  const { Name, Type, Powers } = req.body;

  try {
    // const CheckHero = await Test.findOne({Name});
    // if(CheckHero){
    //     return res.status(401).json({message: "User Already Exists"});
    // }

    const newHero = new Test({ Name, Type, Powers });
    await newHero.save();

    res.status(200).json({ message: "Success", data: newHero });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { test };
