package com.sery.freezesys.service;

import com.sery.freezesys.model.FingerPrint;
import com.sery.freezesys.model.User;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;
import java.util.Map;

import static org.junit.Assert.*;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"/applicationContext.xml"})
public class UserServiceTest {
    @Autowired
    private UserService userService;

    @Test
    public void signIn() {
        User user = new User();
        user.setAccount("nit");
        user.setPassword("123456");
        Map map = userService.signIn(user);
        System.out.println(map);
    }

    @Test
    public void deleteUserById() {
        int result = userService.deleteUserById(1);
        System.out.println(result);
    }

    @Test
    public void getUserNickname() {
        List<User> userList = userService.getUserNickname();
        System.out.println(userList);
    }

    @Test
    public void insertFingerprint() {
        FingerPrint fingerPrint = new FingerPrint();
        fingerPrint.setFingerprintTemp("4dsf5dfsdkfls,dmfkdnmfkd");
        fingerPrint.setUserId(10);
        int result = userService.insertFingerprint(fingerPrint);
        System.out.println(result);
    }

    @Test
    public void getAllFingerprintInfo() {
        List list = userService.getAllFingerprintInfo();
        System.out.println(list);
    }

    @Test
    public void getFingerprintByUserId() {
        FingerPrint fingerPrint = userService.getFingerprintByUserId(10);
        System.out.println(fingerPrint);
    }

    @Test
    public void getUserByKeyword() {
        List<User> userList = userService.getUserByKeyword("ad");
        System.out.println(userList);
    }
}