package com.sery.freezesys.web;

import com.sery.freezesys.model.Patient;
import com.sery.freezesys.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

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
}
