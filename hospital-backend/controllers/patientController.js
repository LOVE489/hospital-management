const Patient = require('../models/Patient');

// @desc    Register a new patient
// @route   POST /patients
// @access  Public
const createPatient = async (req, res, next) => {
  try {
    const patient = await Patient.create(req.body);
    res.status(201).json(patient);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all patients
// @route   GET /patients
// @access  Public
const getPatients = async (req, res, next) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    next(error);
  }
};

// @desc    Get patient by ID
// @route   GET /patients/:id
const getPatientById = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(patient);
  } catch (error) {
    next(error);
  }
};

// @desc    Update patient details
// @route   PUT /patients/:id
const updatePatient = async (req, res, next) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(patient);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete patient record
// @route   DELETE /patients/:id
const deletePatient = async (req, res, next) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json({ message: 'Patient deleted' });
  } catch (error) {
    next(error);
  }
};

// @desc    Search patients by name or disease
// @route   GET /patients/search
const searchPatients = async (req, res, next) => {
  try {
    const { name, disease } = req.query;
    const query = {};
    if (name) {
      query.fullName = { $regex: name, $options: 'i' };
    }
    if (disease) {
      query.disease = { $regex: disease, $options: 'i' };
    }
    const patients = await Patient.find(query);
    res.status(200).json(patients);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPatient,
  getPatients,
  getPatientById,
  updatePatient,
  deletePatient,
  searchPatients,
};
