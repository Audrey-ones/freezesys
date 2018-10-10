package com.sery.freezesys.service.impl;

import com.sery.freezesys.dao.NitMapper;
import com.sery.freezesys.dao.PatientMapper;
import com.sery.freezesys.dao.StrawMapper;
import com.sery.freezesys.model.Divepipe;
import com.sery.freezesys.model.Patient;
import com.sery.freezesys.model.Straw;
import com.sery.freezesys.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PatientServiceImpl implements PatientService {
    @Autowired
    private PatientMapper patientMapper;

    @Autowired
    private StrawMapper strawMapper;

    @Autowired
    private NitMapper nitMapper;

    @Override
    public int addPatient(Patient patient) {
        //先判断是否存在该病人信息
        Map patientMap = new HashMap();
        patientMap.put("medicalRecord",patient.getMedicalRecord());
        patientMap.put("femaleName",patient.getFemaleName());
        Patient resultPatient = patientMapper.selectPatient(patientMap);
        int result;
        //当查询到的结果为空时，插入一条病人记录
        if (resultPatient == null){
            result = patientMapper.insertPatient(patient);
        }else {//当查询结果不为空时，说明该病人记录已经存在，不需要再重复插入
            result = 0;
        }

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

    @Override
    public int deletePatient(int patientId) {
        List<Straw> strawList = strawMapper.getStrawByPatientId(patientId);
        for (Straw straw : strawList){
            Divepipe divepipe = nitMapper.selectDivepipeById(straw.getDivepipeId());
            Map map = new HashMap();
            map.put("divepipeId",divepipe.getDivepipeId());
            map.put("flagNum",divepipe.getFlagNum()+1);
            nitMapper.updateFlagNum(map);
        }
        //删除该病人的所有麦管记录
        strawMapper.deleteStrawByPatientId(patientId);
        int result = patientMapper.deletePatient(patientId);
        return result;
    }

    @Override
    public Patient getPatientById(int patientId) {
        Patient patient = patientMapper.selectPatientById(patientId);
        return patient;
    }

    @Override
    public int getStrawCountByPatientId(int patientId) {
        List<Straw> strawList = strawMapper.getStrawByPatientId(patientId);
        int count = strawList.size();
        return count;
    }


    @Override
    public List<Patient> getPatientLike(String keys) {
        List<Patient> patientList = patientMapper.selectPatientsLike(keys);
        return patientList;
    }

}
