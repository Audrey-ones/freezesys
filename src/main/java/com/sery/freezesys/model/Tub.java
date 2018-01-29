package com.sery.freezesys.model;

import javax.persistence.*;

@Table(name = "tb_tub")
public class Tub {
    private Integer tubId;
    private String tubNum;
    private String nitNum;

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

    @Column(name = "nit_num")
    public String getNitNum() {
        return nitNum;
    }

    public void setNitNum(String nitNum) {
        this.nitNum = nitNum;
    }

    public Tub(Integer tubId, String tubNum, String nitNum) {
        this.tubId = tubId;
        this.tubNum = tubNum;
        this.nitNum = nitNum;
    }

    public Tub() {
    }

    @Override
    public String toString() {
        return "Tub{" +
                "tubId=" + tubId +
                ", tubNum='" + tubNum + '\'' +
                ", nitNum='" + nitNum + '\'' +
                '}';
    }
}
