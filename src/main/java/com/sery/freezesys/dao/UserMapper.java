package com.sery.freezesys.dao;

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


}
