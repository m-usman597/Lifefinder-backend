const ScrapClinics = require("../../model/clinic");

// Get all hospitals
const getAllClinics = async (req, res) => {
  try {
    const clinics = await ScrapClinics.find();
    res.status(200).json(clinics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get hospital by ID
const getClinicById = async (req, res) => {
  const { id } = req.params;
  try {
    const hospital = await ScrapClinics.findById(id);
    if (!hospital) {
      return res.status(200).json({ messages: "Hospital not found" });
    }
    res.status(200).json({ result: hospital });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getClinicById,
  getAllClinics,
};
