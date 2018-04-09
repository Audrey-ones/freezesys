package com.sery.freezesys.model;

import javax.persistence.*;

@Table(name = "tb_fingerprint")
public class FingerPrint {
    private Integer fingerprintId;
    private String fingerprintTemp;
    private Integer userId;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer getFingerprintId() {
        return fingerprintId;
    }

    public void setFingerprintId(Integer fingerprintId) {
        this.fingerprintId = fingerprintId;
    }

    @Column(name = "fingerprint_temp")
    public String getFingerprintTemp() {
        return fingerprintTemp;
    }

    public void setFingerprintTemp(String fingerprintTemp) {
        this.fingerprintTemp = fingerprintTemp;
    }

    @Column(name = "user_id")
    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public FingerPrint(Integer fingerprintId, String fingerprintTemp, Integer userId) {
        this.fingerprintId = fingerprintId;
        this.fingerprintTemp = fingerprintTemp;
        this.userId = userId;
    }

    public FingerPrint() {
    }

    @Override
    public String toString() {
        return "FingerPrint{" +
                "fingerprintId=" + fingerprintId +
                ", fingerprintTemp='" + fingerprintTemp + '\'' +
                ", userId=" + userId +
                '}';
    }
}
