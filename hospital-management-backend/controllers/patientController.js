const Patient = require('../models/Patient');

// @desc    Register a new patient
// @route   POST /patients
const createPatient = async (req, res, next) => {
    try {
        const patient = await Patient.create(req.body);
        res.status(201).json(patient);
    } catch (error) {
        res.status(400); // Bad Request (usually validation errors)
        next(error);
    }
};

// @desc    Get all patient records
// @route   GET /patients
const getPatients = async (req, res, next) => {
    try {
        const patients = await Patient.find();
        res.status(200).json(patients);
    } catch (error) {
        res.status(500);
        next(error);
    }
};

// @desc    Search patients by name or disease
// @route   GET /patients/search
const searchPatients = async (req, res, next) => {
    try {
        const { name, disease } = req.query;
        let query = {};
        
        // Use Regex for case-insensitive partial matching
        if (name) query.fullName = { $regex: name, $options: 'i' };
        if (disease) query.disease = { $regex: disease, $options: 'i' };

        const patients = await Patient.find(query);
        res.status(200).json(patients);
    } catch (error) {
        res.status(500);
        next(error);
    }
};

// @desc    Get patient by ID
// @route   GET /patients/:id
const getPatientById = async (req, res, next) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            res.status(404); // Not Found
            throw new Error('Patient not found');
        }
        res.status(200).json(patient);
    } catch (error) {
        // Handle invalid MongoDB ObjectIDs
        if (error.kind === 'ObjectId') res.status(404);
        next(error);
    }
};

// @desc    Update patient details
// @route   PUT /patients/:id
const updatePatient = async (req, res, next) => {
    try {
        const patient = await Patient.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true } // Return updated doc & run schema validations
        );

        if (!patient) {
            res.status(404);
            throw new Error('Patient not found');
        }

        res.status(200).json(patient);
    } catch (error) {
        res.status(400);
        next(error);
    }
};

// @desc    Delete patient record
// @route   DELETE /patients/:id
const deletePatient = async (req, res, next) => {
    try {
        const patient = await Patient.findByIdAndDelete(req.params.id);

        if (!patient) {
            res.status(404);
            throw new Error('Patient not found');
        }

        res.status(200).json({ message: 'Patient record deleted successfully' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createPatient,
    getPatients,
    searchPatients,
    getPatientById,
    updatePatient,
    deletePatient
};