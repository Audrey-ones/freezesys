package com.sery.freezesys.model;

public class NitDTO {
    private Integer divepipeId;
    private String nitNum;
    private String tubNum;
    private String divepipeNum;
    private Integer flagNum;

    public NitDTO(Integer divepipeId, String nitNum, String tubNum, String divepipeNum, Integer flagNum) {
        this.divepipeId = divepipeId;
        this.nitNum = nitNum;
        this.tubNum = tubNum;
        this.divepipeNum = divepipeNum;
        this.flagNum = flagNum;
    }

    public NitDTO() {
    }

    public Integer getDivepipeId() {
        return divepipeId;
    }

    public void setDivepipeId(Integer divepipeId) {
        this.divepipeId = divepipeId;
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

    public Integer getFlagNum() {
        return flagNum;
    }

    public void setFlagNum(Integer flagNum) {
        this.flagNum = flagNum;
    }

    public String getDivepipeNum() {
        return divepipeNum;
    }

    public void setDivepipeNum(String divepipeNum) {
        this.divepipeNum = divepipeNum;
    }

    @Override
    public String toString() {
        return "NitDTO{" +
                "divepipeId=" + divepipeId +
                ", nitNum='" + nitNum + '\'' +
                ", tubNum='" + tubNum + '\'' +
                ", divepipeNum='" + divepipeNum + '\'' +
                ", flagNum=" + flagNum +
                '}';
    }
}
