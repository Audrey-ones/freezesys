package com.sery.freezesys.service.impl;

import com.sery.freezesys.dao.PatientMapper;
import com.sery.freezesys.model.Patient;
import com.sery.freezesys.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientServiceImpl implements PatientService {
    @Autowired
    private PatientMapper patientMapper;

    @Override
    public int addPatient(Patient patient) {
        int result = patientMapper.insertPatient(patient);
        return result;
    }

    @Override
    public List<Patient> getPatientList() {
        List<Patient> patientList = patientMapper.selectAllPatient();
        return patientList;
    }

    @Override
    public int updatePatient(Patient patient) {
        int result = patientMapper.updatePatient(patient);
        return result;
    }
}
