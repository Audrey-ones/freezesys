package com.sery.freezesys.service.impl;

import com.sery.freezesys.dao.UserMapper;
import com.sery.freezesys.model.FingerPrint;
import com.sery.freezesys.model.Token;
import com.sery.freezesys.model.User;
import com.sery.freezesys.service.UserService;
import com.sery.freezesys.utils.TokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
    public User changePwd(Map map,int userId) {
        int result = userMapper.updatePassword(map);
        User user = userMapper.getUserById(userId);
        return user;
    }

    @Override
    public int register(User user) {
        int result;
        List<User> userList = userMapper.getUserByAccount(user.getAccount());
        if (userList.size() != 0){
            result =0;
        }else {
            result = userMapper.insertUser(user);
        }
        return result;
    }

    @Override
    public User getUserById(int userId) {
        User user = userMapper.getUserById(userId);
        return user;
    }

    @Override
    public List<User> getAllUsers() {
        List<User> userList = userMapper.getAllUsers();
        return userList;
    }

    @Override
    public int deleteUserById(int userId) {
        userMapper.deleteFingerprintByUserId(userId);
        int result = userMapper.deleteUserById(userId);
        return result;
    }

    @Override
    public int updateUser(User user) {
        int result = userMapper.updateUser(user);
        return result;
    }

    @Override
    public List<User> getUserNickname() {
        List<User> userList = userMapper.getUserNickname();
        return userList;
    }

    @Override
    public int insertFingerprint(FingerPrint fingerPrint) {
        int result = userMapper.insertFingerprint(fingerPrint);
        return result;
    }

    @Override
    public List<FingerPrint> getAllFingerprintInfo() {
        List<FingerPrint> fingerPrintList = userMapper.getAllFingerprint();
        return fingerPrintList;
    }

    @Override
    public Map signInByFingerprint(int userId) {
        Map map = new HashMap();
        User user = userMapper.getUserById(userId);
        Token token = new Token();
        token.setUserId(user.getUserId());
        token.setToken(TokenUtil.getToken());
        map.put("user",user);
        map.put("token",token);
        return map;
    }

    @Override
    public FingerPrint getFingerprintByUserId(int userId) {
        FingerPrint fingerPrint = userMapper.getFingerprintByUserId(userId);
        return fingerPrint;
    }

    @Override
    public List<User> getUserByKeyword(String keyword) {
        List<User> userList = userMapper.selectUserByKeyword(keyword);
        return userList;
    }

    @Override
    public int deleteFingerprintByUserId(int userId) {
        int result;
        FingerPrint fingerPrint = userMapper.getFingerprintByUserId(userId);
        if (fingerPrint != null){
            result = userMapper.deleteFingerprintByUserId(userId);
        }else {
            result = 0;
        }

        return result;
    }

}
