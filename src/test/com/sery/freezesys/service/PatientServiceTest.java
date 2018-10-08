package com.sery.freezesys.service;

import com.sery.freezesys.model.Patient;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;

import static org.junit.Assert.*;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "/applicationContext.xml")
public class PatientServiceTest {
    @Autowired
    private PatientService patientService;

    @Test
    public void addPatient() {
        Patient patient = new Patient();
        patient.setMedicalRecord("F1976-2");
        patient.setFemaleName("吴海燕");
        patient.setMaleName("张大伟");
        patient.setFemaleIdNum("440123456789123456");
        patient.setMaleIdNum("320123456789123456");
        patient.setAddress("江苏省南京市栖霞区");
        patient.setPhone("13245678901");
        patient.setRemark("无");
        int result = patientService.addPatient(patient);
        System.out.println(result);
    }

    @Test
    public void getPatientList() {
        List<Patient> patientList = patientService.getPatientList();
        System.out.println(patientList);
    }

    @Test
    public void updatePatient() {
        Patient patient = new Patient();
        patient.setPatientId(11);
        patient.setMedicalRecord("ssfdf");
        patient.setFemaleName("gfghfh");
        patient.setMaleName("retfgd");
        patient.setFemaleIdNum("fgdfg");
        patient.setMaleIdNum("ghgh");
        patient.setAddress("hgh");
        patient.setPhone("ghgh");
        patient.setRemark("张雨绮");
        int result = patientService.updatePatient(patient);
        System.out.println(result);
    }

    @Test
    public void deletePatient() {
        int result = patientService.deletePatient(1);
        System.out.println(result);
    }

    @Test
    public void getPatientLike() {
        List<Patient> patientList = patientService.getPatientLike("F");
        System.out.println(patientList.size());
    }
}