package com.sery.freezesys.model;

import javax.persistence.*;
import java.util.Date;

@Table(name = "tb_straw")
public class Straw {
    private Integer strawId;
    private String strawNum;
    private String barcodeNum;
    private Integer patientId;
    private Integer divepipeId;
    private String sampleType;
    private Integer sampleAmount;
    private Date freezeTime;
    private Date expireTime;
    private String freezeStatus;
    private String operator;
    private String remark;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer getStrawId() {
        return strawId;
    }

    public void setStrawId(Integer strawId) {
        this.strawId = strawId;
    }

    @Column(name = "num")
    public String getStrawNum() {
        return strawNum;
    }

    public void setStrawNum(String strawNum) {
        this.strawNum = strawNum;
    }

    @Column(name = "barcode_num")
    public String getBarcodeNum() {
        return barcodeNum;
    }

    public void setBarcodeNum(String barcodeNum) {
        this.barcodeNum = barcodeNum;
    }

    @Column(name = "patient_id")
    public Integer getPatientId() {
        return patientId;
    }

    public void setPatientId(Integer patientId) {
        this.patientId = patientId;
    }

    @Column(name = "divepipe_id")
    public Integer getDivepipeId() {
        return divepipeId;
    }

    public void setDivepipeId(Integer divepipeId) {
        this.divepipeId = divepipeId;
    }

    @Column(name = "sample_type")
    public String getSampleType() {
        return sampleType;
    }

    public void setSampleType(String sampleType) {
        this.sampleType = sampleType;
    }

    @Column(name = "sample_amount")
    public Integer getSampleAmount() {
        return sampleAmount;
    }

    public void setSampleAmount(Integer sampleAmount) {
        this.sampleAmount = sampleAmount;
    }

    @Column(name = "freeze_time")
    public Date getFreezeTime() {
        return freezeTime;
    }

    public void setFreezeTime(Date freezeTime) {
        this.freezeTime = freezeTime;
    }

    @Column(name = "expire_time")
    public Date getExpireTime() {
        return expireTime;
    }

    public void setExpireTime(Date expireTime) {
        this.expireTime = expireTime;
    }

    @Column(name = "freeze_status")
    public String getFreezeStatus() {
        return freezeStatus;
    }

    public void setFreezeStatus(String freezeStatus) {
        this.freezeStatus = freezeStatus;
    }

    @Column(name = "operator")
    public String getOperator() {
        return operator;
    }

    public void setOperator(String operator) {
        this.operator = operator;
    }

    @Column(name = "remark")
    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public Straw(Integer strawId, String strawNum, String barcodeNum, Integer patientId,
                 Integer divepipeId, String sampleType, Integer sampleAmount, Date freezeTime,
                 Date expireTime, String freezeStatus, String operator, String remark) {
        this.strawId = strawId;
        this.strawNum = strawNum;
        this.barcodeNum = barcodeNum;
        this.patientId = patientId;
        this.divepipeId = divepipeId;
        this.sampleType = sampleType;
        this.sampleAmount = sampleAmount;
        this.freezeTime = freezeTime;
        this.expireTime = expireTime;
        this.freezeStatus = freezeStatus;
        this.operator = operator;
        this.remark = remark;
    }

    public Straw() {
    }

    @Override
    public String toString() {
        return "Straw{" +
                "strawId=" + strawId +
                ", strawNum='" + strawNum + '\'' +
                ", barcodeNum='" + barcodeNum + '\'' +
                ", patientId=" + patientId +
                ", divepipeId=" + divepipeId +
                ", sampleType='" + sampleType + '\'' +
                ", sampleAmount=" + sampleAmount +
                ", freezeTime=" + freezeTime +
                ", expireTime=" + expireTime +
                ", freezeStatus='" + freezeStatus + '\'' +
                ", operator='" + operator + '\'' +
                ", remark='" + remark + '\'' +
                '}';
    }
}
