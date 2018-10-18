package com.sery.freezesys.service;

import com.sery.freezesys.model.FingerPrint;
import com.sery.freezesys.model.User;

import java.util.List;
import java.util.Map;

public interface UserService {
    /**
     * 用户登录
     * @param user
     * @return
     */
    Map signIn(User user);

    /**
     * 用户修改密码
     * @param map
     * @return
     */
    User changePwd(Map map,int userId);

    /**
     * 用户注册
     * @param user
     * @return
     */
    int register(User user);

    /**
     * 根据用户ID查找用户
     * @param userId
     * @return
     */
    User getUserById(int userId);

    /**
     * 获取非超级管理员以外的所有用户
     * @return
     */
    List<User> getAllUsers();

    /**
     * 根据用户Id删除用户
     * @param userId
     * @return
     */
    int deleteUserById(int userId);

    /**
     * 更新用户信息
     * @param user
     * @return
     */
    int updateUser(User user);

    /**
     * 根据解冻权限查找用户昵称
     * @return
     */
    List<User> getUserNickname();

    /**
     * 登记指纹模板
     * @param fingerPrint
     * @return
     */
    int insertFingerprint(FingerPrint fingerPrint);

    /**
     * 获取所有的模板信息
     * @return
     */
    List<FingerPrint> getAllFingerprintInfo();

    /**
     * 使用指纹登录，获取用户信息返回
     * @param userId
     * @return
     */
    Map signInByFingerprint(int userId);

    /**
     * 根据用户ID查找该用户的指纹信息
     * @param userId
     * @return
     */
    FingerPrint getFingerprintByUserId(int userId);

    /**
     * 根据关键字查询用户信息
     * @param keyword
     * @return
     */
    List<User> getUserByKeyword(String keyword);

    /**
     * 根据用户Id删除指纹信息
     * @param userId
     * @return
     */
    int deleteFingerprintByUserId(int userId);

}
