package com.sery.freezesys.web;

import com.sery.freezesys.model.Patient;
import com.sery.freezesys.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
public class PatientController {
    @Autowired
    private PatientService patientService;

    @RequestMapping(value = "patients",method = RequestMethod.GET)
    public @ResponseBody
    List<Patient> getPatientList(){
        List<Patient> patientList = patientService.getPatientList();
        return patientList;
    }

    @RequestMapping(value = "patients/{patientId}",method = RequestMethod.POST)
    public int deletePatient(@PathVariable("patientId") int patientId){
        int result = patientService.deletePatient(patientId);
        return result;
    }

    @RequestMapping(value = "patients",method = RequestMethod.POST)
    public int addPatient(HttpServletRequest request){
        Patient patient = new Patient();
        patient.setMedicalRecord(request.getParameter("medicalRecord"));
        patient.setFemaleName(request.getParameter("femaleName"));
        patient.setMaleName(request.getParameter("maleName"));
        patient.setFemaleIdNum(request.getParameter("femaleIdNum"));
        patient.setMaleIdNum(request.getParameter("maleIdNum"));
        patient.setAddress(request.getParameter("address"));
        patient.setPhone(request.getParameter("phone"));
        patient.setRemark(request.getParameter("remark"));
        int result = patientService.addPatient(patient);
        return result;
    }

    @RequestMapping(value = "patients/{patientId}",method = RequestMethod.GET)
    public @ResponseBody Patient getPatientById(@PathVariable("patientId") int patientId){
        Patient patient = patientService.getPatientById(patientId);
        return patient;
    }

    @RequestMapping(value = "patientEdit",method = RequestMethod.POST)
    public int editPatient(HttpServletRequest httpServletRequest){
        Patient patient = new Patient();
        patient.setPatientId(Integer.parseInt(httpServletRequest.getParameter("patientId")));
        patient.setMedicalRecord(httpServletRequest.getParameter("medicalRecord"));
        patient.setFemaleName(httpServletRequest.getParameter("femaleName"));
        patient.setMaleName(httpServletRequest.getParameter("maleName"));
        patient.setFemaleIdNum(httpServletRequest.getParameter("femaleIdNum"));
        patient.setMaleIdNum(httpServletRequest.getParameter("maleIdNum"));
        patient.setAddress(httpServletRequest.getParameter("address"));
        patient.setPhone(httpServletRequest.getParameter("phone"));
        patient.setRemark(httpServletRequest.getParameter("remark"));
        int result = patientService.updatePatient(patient) ;
        return result;
    }
}
