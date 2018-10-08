package com.sery.freezesys.dao;

import com.sery.freezesys.model.FingerPrint;
import com.sery.freezesys.model.User;

import java.util.List;
import java.util.Map;

public interface UserMapper {
    /**
     * 根据用户名密码实现用户登录
     * @param user
     * @return
     */
    User getUserByUser(User user);

    /**
     * 用户修改密码
     * @param map
     * @return
     */
    int updatePassword(Map map);

    /**
     * 用户注册
     * @param user
     * @return
     */
    int insertUser(User user);

    /**
     * 根据用户名查找用户
     * @param account
     * @return
     */
    List<User> getUserByAccount(String account);

    /**
     * 根据用户ID查找用户
     * @param userId
     * @return
     */
    User getUserById(int userId);

    /**
     * 查询非超级管理员以外的所有用户
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
     * 修改用户资料
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
     * 获取所有的指纹模板
     * @return
     */
    List<FingerPrint> getAllFingerprint();

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
    List<User> selectUserByKeyword(String keyword);

    /**
     * 根据用户Id删除指纹信息
     * @param userId
     * @return
     */
    int deleteFingerprintByUserId(int userId);

}
