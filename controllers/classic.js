const Classic = require('../models/classic');
const ObjectId = require("mongodb").ObjectId;

exports.getClassic = async (req, res) => {
    try{
        const allClassic = await Classic.find();
        res.json(allClassic);
    } catch(err) {
        res.status(500).json({message: err.message});
    }
};


exports.createClassic = async (req, res) => {
    const classicBakugan = new Classic({
        name: req.body.name,
        gpower: req.body.gpower,
        attribute: req.body.attribute
    })
    try {
        const newClassic = await classicBakugan.save();
        res.status(201).json(newClassic);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
};

exports.updateClassic = async (req, res) => {
  try {
    const updatedClassic = await Classic.findByIdAndUpdate(
      req.params._id, 
      {
        name: req.body.name,
        gpower: req.body.gpower,
        attribute: req.body.attribute
      },
      { new: true, runValidators: true }
    );

    if (!updatedClassic) {
      return res.status(404).json({ message: 'Classic not found' });
    }

    res.status(200).json(updatedClassic);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteClassic = async (req, res) => {
  try {
    const deletedClassic = await Classic.findByIdAndDelete(req.params._id);
    

    if (!deletedClassic) {
      return res.status(404).json({ message: 'Classic not found' });
    }

    res.status(200).json({ message: 'Classic deleted successfully' });
  } catch (err) {
    console.log(req.params._id);
    res.status(500).json({ message: err.message });
    
  }
};

