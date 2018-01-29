package com.sery.freezesys.model;

import javax.persistence.*;

@Table(name = "tb_nit")
public class Nit {
    private Integer nitId;
    private String nitNum;
    private String version;
    private String antibodyType;
    private String status;
    private Integer tubAmount;
    private Integer divepipeAmount;
    private Integer strawAmount;
    private String remark;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer getNitId() {
        return nitId;
    }

    public void setNitId(Integer nitId) {
        this.nitId = nitId;
    }

    @Column(name = "num")
    public String getNitNum() {
        return nitNum;
    }

    public void setNitNum(String nitNum) {
        this.nitNum = nitNum;
    }

    @Column(name = "version")
    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    @Column(name = "antibody_type")
    public String getAntibodyType() {
        return antibodyType;
    }

    public void setAntibodyType(String antibodyType) {
        this.antibodyType = antibodyType;
    }

    @Column(name = "status")
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Column(name = "tub_amount")
    public Integer getTubAmount() {
        return tubAmount;
    }

    public void setTubAmount(Integer tubAmount) {
        this.tubAmount = tubAmount;
    }

    @Column(name = "divepipe_amount")
    public Integer getDivepipeAmount() {
        return divepipeAmount;
    }

    public void setDivepipeAmount(Integer divepipeAmount) {
        this.divepipeAmount = divepipeAmount;
    }

    @Column(name = "straw_amount")
    public Integer getStrawAmount() {
        return strawAmount;
    }

    public void setStrawAmount(Integer strawAmount) {
        this.strawAmount = strawAmount;
    }

    @Column(name = "remark")
    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public Nit(Integer nitId, String nitNum, String version, String antibodyType, String status,
               Integer tubAmount, Integer divepipeAmount, Integer strawAmount, String remark) {
        this.nitId = nitId;
        this.nitNum = nitNum;
        this.version = version;
        this.antibodyType = antibodyType;
        this.status = status;
        this.tubAmount = tubAmount;
        this.divepipeAmount = divepipeAmount;
        this.strawAmount = strawAmount;
        this.remark = remark;
    }

    public Nit() {
    }

    @Override
    public String toString() {
        return "Nit{" +
                "nitId=" + nitId +
                ", nitNum='" + nitNum + '\'' +
                ", version='" + version + '\'' +
                ", antibodyType='" + antibodyType + '\'' +
                ", status='" + status + '\'' +
                ", tubAmount=" + tubAmount +
                ", divepipeAmount=" + divepipeAmount +
                ", strawAmount=" + strawAmount +
                ", remark='" + remark + '\'' +
                '}';
    }
}
