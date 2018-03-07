package com.sery.freezesys.model;

import javax.persistence.*;

@Table(name = "tb_user")
public class User {
    private Integer userId;
    private String account;
    private String nickname;
    private String password;
    private String role;
    private String nitDel;
    private String strawDel;
    private String patientDel;
    private String remark;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    @Column(name = "account")
    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    @Column(name = "nickname")
    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    @Column(name = "password")
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Column(name = "role")
    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @Column(name = "nit_del")
    public String getNitDel() {
        return nitDel;
    }

    public void setNitDel(String nitDel) {
        this.nitDel = nitDel;
    }

    @Column(name = "straw_del")
    public String getStrawDel() {
        return strawDel;
    }

    public void setStrawDel(String strawDel) {
        this.strawDel = strawDel;
    }

    @Column(name = "patient_del")
    public String getPatientDel() {
        return patientDel;
    }

    public void setPatientDel(String patientDel) {
        this.patientDel = patientDel;
    }

    @Column(name = "remark")
    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public User(Integer userId, String account, String nickname, String password,
                String role, String nitDel, String strawDel, String patientDel, String remark) {
        this.userId = userId;
        this.account = account;
        this.nickname = nickname;
        this.password = password;
        this.role = role;
        this.nitDel = nitDel;
        this.strawDel = strawDel;
        this.patientDel = patientDel;
        this.remark = remark;
    }

    public User() {
    }

    @Override
    public String toString() {
        return "User{" +
                "userId=" + userId +
                ", account='" + account + '\'' +
                ", nickname='" + nickname + '\'' +
                ", password='" + password + '\'' +
                ", role='" + role + '\'' +
                ", nitDel='" + nitDel + '\'' +
                ", strawDel='" + strawDel + '\'' +
                ", patientDel='" + patientDel + '\'' +
                ", remark='" + remark + '\'' +
                '}';
    }
}
