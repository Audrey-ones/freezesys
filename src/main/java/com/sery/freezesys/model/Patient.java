package com.sery.freezesys.model;

import javax.persistence.*;

@Table(name = "tb_patient")
public class Patient {
    private Integer patientId;
    private String medicalRecord;
    private String femaleName;
    private String maleName;
    private String femaleIdNum;
    private String maleIdNum;
    private String address;
    private String phone;
    private String remark;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer getPatientId() {
        return patientId;
    }

    public void setPatientId(Integer patientId) {
        this.patientId = patientId;
    }

    @Column(name = "medical_record")
    public String getMedicalRecord() {
        return medicalRecord;
    }

    public void setMedicalRecord(String medicalRecord) {
        this.medicalRecord = medicalRecord;
    }

    @Column(name = "female_name")
    public String getFemaleName() {
        return femaleName;
    }

    public void setFemaleName(String femaleName) {
        this.femaleName = femaleName;
    }

    @Column(name = "male_name")
    public String getMaleName() {
        return maleName;
    }

    public void setMaleName(String maleName) {
        this.maleName = maleName;
    }

    @Column(name = "female_id_num")
    public String getFemaleIdNum() {
        return femaleIdNum;
    }

    public void setFemaleIdNum(String femaleIdNum) {
        this.femaleIdNum = femaleIdNum;
    }

    @Column(name = "male_id_num")
    public String getMaleIdNum() {
        return maleIdNum;
    }

    public void setMaleIdNum(String maleIdNum) {
        this.maleIdNum = maleIdNum;
    }

    @Column(name = "address")
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @Column(name = "phone")
    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    @Column(name = "remark")
    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public Patient(Integer patientId, String medicalRecord, String femaleName, String maleName,
                   String femaleIdNum, String maleIdNum, String address, String phone, String remark) {
        this.patientId = patientId;
        this.medicalRecord = medicalRecord;
        this.femaleName = femaleName;
        this.maleName = maleName;
        this.femaleIdNum = femaleIdNum;
        this.maleIdNum = maleIdNum;
        this.address = address;
        this.phone = phone;
        this.remark = remark;
    }

    public Patient() {
    }

    @Override
    public String toString() {
        return "Patient{" +
                "patientId=" + patientId +
                ", medicalRecord='" + medicalRecord + '\'' +
                ", femaleName='" + femaleName + '\'' +
                ", maleName='" + maleName + '\'' +
                ", femaleIdNum='" + femaleIdNum + '\'' +
                ", maleIdNum='" + maleIdNum + '\'' +
                ", address='" + address + '\'' +
                ", phone='" + phone + '\'' +
                ", remark='" + remark + '\'' +
                '}';
    }
}
