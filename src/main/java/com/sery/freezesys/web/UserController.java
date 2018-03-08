package com.sery.freezesys.web;

import com.sery.freezesys.model.User;
import com.sery.freezesys.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    /**
     * 登录
     * @param request
     * @return
     */
    @RequestMapping(value = "sigin",method = RequestMethod.GET)
    public @ResponseBody
    Map sigIn(HttpServletRequest request){
        User user = new User();
        user.setAccount(request.getParameter("account"));
        user.setPassword(request.getParameter("password"));
        Map map = userService.signIn(user);
        return map;
    }

    /**
     * 修改密码
     * @param request
     * @return
     */
    @RequestMapping(value = "changepwd",method = RequestMethod.POST)
    public int changePwd(HttpServletRequest request){
        Map map = new HashMap();
        map.put("userId",request.getParameter("userId"));
        map.put("password",request.getParameter("password"));
        int result = userService.changePwd(map);
        return result;
    }

    /**
     * 注册
     * @param request
     * @return
     */
    @RequestMapping(value = "user",method = RequestMethod.POST)
    public int register(HttpServletRequest request){
        User user = new User();
        user.setAccount(request.getParameter("account"));
        user.setNickname(request.getParameter("nickname"));
        user.setPassword(request.getParameter("password"));
        user.setRole(request.getParameter("role"));
        user.setNitDel(request.getParameter("nitDel"));
        user.setStrawDel(request.getParameter("strawDel"));
        user.setPatientDel(request.getParameter("patientDel"));
        user.setRemark(request.getParameter("remark"));
        int result = userService.register(user);
        return result;
    }

    /**
     * 根据用户ID获取用户密码
     * @param userId
     * @return
     */
    @RequestMapping(value = "getPwd/{userId}",method = RequestMethod.GET)
    public String getPasswordById(@PathVariable("userId") int userId){
        User user = userService.getUserById(userId);
        String password = user.getPassword();
        return password;
    }

    @RequestMapping(value = "allUsers",method = RequestMethod.GET)
    public List<User> getAllUsers(){
        List<User> userList = userService.getAllUsers();
        return userList;
    }

    @RequestMapping(value = "users/{userId}",method = RequestMethod.POST)
    public int deleteUserById(@PathVariable("userId") int userId){
        int result = userService.deleteUserById(userId);
        return result;
    }

}
