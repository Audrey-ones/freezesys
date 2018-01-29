package com.sery.freezesys.model;

import javax.persistence.*;

@Table(name = "tb_divepipe")
public class Divepipe {
    private Integer divepipeId;
    private String divepipeNum;
    private Integer flagNum;
    private Integer tubId;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer getDivepipeId() {
        return divepipeId;
    }

    public void setDivepipeId(Integer divepipeId) {
        this.divepipeId = divepipeId;
    }

    @Column(name = "divepipe_num")
    public String getDivepipeNum() {
        return divepipeNum;
    }

    public void setDivepipeNum(String divepipeNum) {
        this.divepipeNum = divepipeNum;
    }

    @Column(name = "flag_num")
    public Integer getFlagNum() {
        return flagNum;
    }

    public void setFlagNum(Integer flagNum) {
        this.flagNum = flagNum;
    }

    @Column(name = "tub_id")
    public Integer getTubId() {
        return tubId;
    }

    public void setTubId(Integer tubId) {
        this.tubId = tubId;
    }

    public Divepipe(Integer divepipeId, String divepipeNum, Integer flagNum, Integer tubId) {
        this.divepipeId = divepipeId;
        this.divepipeNum = divepipeNum;
        this.flagNum = flagNum;
        this.tubId = tubId;
    }

    public Divepipe() {
    }

    @Override
    public String toString() {
        return "Divepipe{" +
                "divepipeId=" + divepipeId +
                ", divepipeNum='" + divepipeNum + '\'' +
                ", flagNum=" + flagNum +
                ", tubId=" + tubId +
                '}';
    }
}
