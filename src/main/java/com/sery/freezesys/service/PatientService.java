package com.sery.freezesys.service;

import com.sery.freezesys.model.Patient;

import java.util.List;

public interface PatientService {
    /**
     * 增加一条病人信息
     * @param patient
     * @return
     */
    int addPatient(Patient patient);

    /**
     * 查询所有的病人信息
     * @return
     */
    List<Patient> getPatientList();

    /**
     * 更新病人信息
     * @param patient
     * @return
     */
    int updatePatient(Patient patient);

    /**
     * 根据病人Id删除一个病人信息
     * @param patientId
     * @return
     */
    int deletePatient(int patientId);

    Patient getPatientById(int patientId);
}
