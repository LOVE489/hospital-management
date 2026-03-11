const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
  },
  age: {
    type: Number,
    min: [0, 'Age must be positive'],
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
  },
  disease: {
    type: String,
    required: [true, 'Disease/Diagnosis is required'],
  },
  doctorAssigned: {
    type: String,
    required: [true, 'Doctor assigned is required'],
  },
  admissionDate: {
    type: Date,
    default: Date.now,
  },
  roomNumber: {
    type: String,
  },
  patientType: {
    type: String,
    enum: ['Inpatient', 'Outpatient'],
  },
  status: {
    type: String,
    enum: ['Admitted', 'Discharged'],
    default: 'Admitted',
  },
});

module.exports = mongoose.model('Patient', patientSchema);
