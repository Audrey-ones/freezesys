package com.sery.freezesys.dao;

import com.sery.freezesys.model.Patient;

import java.util.List;
import java.util.Map;

public interface PatientMapper {
    /**
     * 插入一条病人信息
     * @param patient
     * @return
     */
    int insertPatient(Patient patient);

    /**
     * 查询所有的病人信息
     * @return
     */
    List<Patient> selectAllPatient();

    /**
     * 根据病历号和女方姓名查找一条病人记录
     * @param map
     * @return
     */
    Patient selectPatient(Map map);

    /**
     * 根据病人ID查找一条病人记录
     * @param patientId
     * @return
     */
    Patient selectPatientById(int patientId);

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
}
