const express = require('express');
const router = express.Router();
const {
    createPatient,
    getPatients,
    searchPatients,
    getPatientById,
    updatePatient,
    deletePatient
} = require('../controllers/patientController');

// Define search BEFORE /:id
router.get('/search', searchPatients);

router.route('/')
    .get(getPatients)
    .post(createPatient);

router.route('/:id')
    .get(getPatientById)
    .put(updatePatient)
    .delete(deletePatient);

module.exports = router;