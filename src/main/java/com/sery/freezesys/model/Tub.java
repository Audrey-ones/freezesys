package com.sery.freezesys.model;

import javax.persistence.*;

@Table(name = "tb_tub")
public class Tub {
    private Integer tubId;
    private String tubNum;
    private Integer nitId;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer getTubId() {
        return tubId;
    }

    public void setTubId(Integer tubId) {
        this.tubId = tubId;
    }

    @Column(name = "tub_num")
    public String getTubNum() {
        return tubNum;
    }

    public void setTubNum(String tubNum) {
        this.tubNum = tubNum;
    }

    @Column(name = "nit_id")
    public Integer getNitId() {
        return nitId;
    }

    public void setNitId(Integer nitId) {
        this.nitId = nitId;
    }

    public Tub(Integer tubId, String tubNum, Integer nitId) {
        this.tubId = tubId;
        this.tubNum = tubNum;
        this.nitId = nitId;
    }

    public Tub() {
    }

    @Override
    public String toString() {
        return "Tub{" +
                "tubId=" + tubId +
                ", tubNum='" + tubNum + '\'' +
                ", nitId=" + nitId +
                '}';
    }
}
