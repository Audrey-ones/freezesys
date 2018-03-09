package com.sery.freezesys.service;

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
    int changePwd(Map map);

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

}
