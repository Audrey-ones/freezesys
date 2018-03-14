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

    /**
     * 查找所有的病人信息
     * @return
     */
    @RequestMapping(value = "patients",method = RequestMethod.GET)
    public @ResponseBody
    List<Patient> getPatientList(){
        List<Patient> patientList = patientService.getPatientList();
        return patientList;
    }

    /**
     * 根据病人ID删除一条病人记录
     * @param patientId
     * @return
     */
    @RequestMapping(value = "patients/{patientId}",method = RequestMethod.POST)
    public int deletePatient(@PathVariable("patientId") int patientId){
        int result = patientService.deletePatient(patientId);
        return result;
    }

    /**
     * 添加一条病人记录信息
     * @param request
     * @return
     */
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

    /**
     * 根据病人ID查找一条病人记录
     * @param patientId
     * @return
     */
    @RequestMapping(value = "patients/{patientId}",method = RequestMethod.GET)
    public @ResponseBody Patient getPatientById(@PathVariable("patientId") int patientId){
        Patient patient = patientService.getPatientById(patientId);
        return patient;
    }

    /**
     * 编辑一条病人记录信息
     * @param httpServletRequest
     * @return
     */
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
