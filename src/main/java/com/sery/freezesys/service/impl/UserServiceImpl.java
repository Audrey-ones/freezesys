package com.sery.freezesys.service.impl;

import com.sery.freezesys.dao.UserMapper;
import com.sery.freezesys.model.Token;
import com.sery.freezesys.model.User;
import com.sery.freezesys.service.UserService;
import com.sery.freezesys.utils.TokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserMapper userMapper;

    @Override
    public Map signIn(User user) {
        User u = userMapper.getUserByUser(user);
        Map map = new HashMap();
        Token token = null;
        if (u != null){
            token = new Token();
            token.setUserId(u.getUserId());
            token.setToken(TokenUtil.getToken());
            map.put("user",u);
            map.put("token",token);
        }else {
            map.put("user",null);
        }
        return map;
    }

    @Override
    public int changePwd(Map map) {
        int result = userMapper.updatePassword(map);
        return result;
    }

    @Override
    public int register(User user) {
        int result = userMapper.insertUser(user);
        return result;
    }

    @Override
    public int getUserByAccount(String account) {
        List<User> userList = userMapper.getUserByAccount(account);
        if (userList.size() != 0){
            return 0;
        }
        return 1;
    }
}
