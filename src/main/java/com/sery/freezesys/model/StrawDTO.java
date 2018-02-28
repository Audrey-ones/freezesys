package com.sery.freezesys.model;

public class StrawDTO {
    private Integer strawId;
    private String strawNum;
    private String freezeNum;
    private String barcodeNum;
    private String medicalRecord;
    private String femaleName;
    private String maleName;
    private String nitNum;
    private String tubNum;
    private String divepipeNum;
    private String sampleType;
    private Integer sampleAmount;
    private String sampleNum;
    private String freezeTime;
    private String expireTime;
    private String thawTime;
    private String freezeStatus;
    private String operator;
    private String remark;

    public Integer getStrawId() {
        return strawId;
    }

    public void setStrawId(Integer strawId) {
        this.strawId = strawId;
    }

    public String getStrawNum() {
        return strawNum;
    }

    public void setStrawNum(String strawNum) {
        this.strawNum = strawNum;
    }

    public String getFreezeNum() {
        return freezeNum;
    }

    public void setFreezeNum(String freezeNum) {
        this.freezeNum = freezeNum;
    }

    public String getBarcodeNum() {
        return barcodeNum;
    }

    public void setBarcodeNum(String barcodeNum) {
        this.barcodeNum = barcodeNum;
    }

    public String getMedicalRecord() {
        return medicalRecord;
    }

    public void setMedicalRecord(String medicalRecord) {
        this.medicalRecord = medicalRecord;
    }

    public String getFemaleName() {
        return femaleName;
    }

    public void setFemaleName(String femaleName) {
        this.femaleName = femaleName;
    }

    public String getMaleName() {
        return maleName;
    }

    public void setMaleName(String maleName) {
        this.maleName = maleName;
    }

    public String getNitNum() {
        return nitNum;
    }

    public void setNitNum(String nitNum) {
        this.nitNum = nitNum;
    }

    public String getTubNum() {
        return tubNum;
    }

    public void setTubNum(String tubNum) {
        this.tubNum = tubNum;
    }

    public String getDivepipeNum() {
        return divepipeNum;
    }

    public void setDivepipeNum(String divepipeNum) {
        this.divepipeNum = divepipeNum;
    }

    public String getSampleType() {
        return sampleType;
    }

    public void setSampleType(String sampleType) {
        this.sampleType = sampleType;
    }

    public Integer getSampleAmount() {
        return sampleAmount;
    }

    public void setSampleAmount(Integer sampleAmount) {
        this.sampleAmount = sampleAmount;
    }

    public String getFreezeTime() {
        return freezeTime;
    }

    public void setFreezeTime(String freezeTime) {
        this.freezeTime = freezeTime;
    }

    public String getThawTime() {
        return thawTime;
    }

    public void setThawTime(String thawTime) {
        this.thawTime = thawTime;
    }

    public String getFreezeStatus() {
        return freezeStatus;
    }

    public void setFreezeStatus(String freezeStatus) {
        this.freezeStatus = freezeStatus;
    }

    public String getOperator() {
        return operator;
    }

    public void setOperator(String operator) {
        this.operator = operator;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getSampleNum() {
        return sampleNum;
    }

    public void setSampleNum(String sampleNum) {
        this.sampleNum = sampleNum;
    }

    public String getExpireTime() {
        return expireTime;
    }

    public void setExpireTime(String expireTime) {
        this.expireTime = expireTime;
    }

    @Override
    public String toString() {
        return "StrawDTO{" +
                "strawId=" + strawId +
                ", strawNum='" + strawNum + '\'' +
                ", freezeNum='" + freezeNum + '\'' +
                ", barcodeNum='" + barcodeNum + '\'' +
                ", medicalRecord='" + medicalRecord + '\'' +
                ", femaleName='" + femaleName + '\'' +
                ", maleName='" + maleName + '\'' +
                ", nitNum='" + nitNum + '\'' +
                ", tubNum='" + tubNum + '\'' +
                ", divepipeNum='" + divepipeNum + '\'' +
                ", sampleType='" + sampleType + '\'' +
                ", sampleAmount=" + sampleAmount +
                ", sampleNum='" + sampleNum + '\'' +
                ", freezeTime='" + freezeTime + '\'' +
                ", expireTime='" + expireTime + '\'' +
                ", thawTime='" + thawTime + '\'' +
                ", freezeStatus='" + freezeStatus + '\'' +
                ", operator='" + operator + '\'' +
                ", remark='" + remark + '\'' +
                '}';
    }
}
