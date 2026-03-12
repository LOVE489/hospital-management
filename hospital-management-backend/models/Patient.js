const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    fullName: { 
        type: String, 
        required: [true, 'Full Name is required'] 
    },
    email: { 
        type: String, 
        required: [true, 'Email is required'], 
        unique: true 
    },
    phoneNumber: { 
        type: String, 
        required: [true, 'Phone Number is required'] 
    },
    age: { 
        type: Number, 
        required: [true, 'Age is required'],
        min: [1, 'Age must be a positive number']
    },
    gender: { 
        type: String, 
        enum: ['Male', 'Female', 'Other'] 
    },
    disease: { 
        type: String, 
        required: [true, 'Disease/Diagnosis is required'] 
    },
    doctorAssigned: { 
        type: String, 
        required: [true, 'Assigned Doctor is required'] 
    },
    admissionDate: { 
        type: Date, 
        default: Date.now 
    },
    roomNumber: { 
        type: String 
    },
    patientType: { 
        type: String, 
        enum: ['Inpatient', 'Outpatient'] 
    },
    status: { 
        type: String, 
        default: 'Admitted',
        enum: ['Admitted', 'Discharged']
    }
}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);