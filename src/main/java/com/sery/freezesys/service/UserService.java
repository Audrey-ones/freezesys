package com.sery.freezesys.service;

import com.sery.freezesys.model.User;

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

}
