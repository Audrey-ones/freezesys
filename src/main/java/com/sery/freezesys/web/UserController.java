package com.sery.freezesys.web;

import com.sery.freezesys.model.User;
import com.sery.freezesys.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @RequestMapping(value = "sigin",method = RequestMethod.GET)
    public @ResponseBody
    Map sigIn(HttpServletRequest request){
        User user = new User();
        user.setAccount(request.getParameter("account"));
        user.setPassword(request.getParameter("password"));
        Map map = userService.signIn(user);
        return map;
    }

    @RequestMapping(value = "changepwd",method = RequestMethod.POST)
    public int changePwd(HttpServletRequest request){
        Map map = new HashMap();
        map.put("userId",request.getParameter("userId"));
        map.put("password",request.getParameter("password"));
        int result = userService.changePwd(map);
        return result;
    }

    @RequestMapping(value = "user",method = RequestMethod.POST)
    public int register(HttpServletRequest request){
        User user = new User();
        user.setAccount(request.getParameter("account"));
        user.setNickname(request.getParameter("nickname"));
        user.setPassword(request.getParameter("password"));
        user.setRemark(request.getParameter("remark"));
        int result = userService.register(user);
        return result;
    }

    @RequestMapping(value = "user",method = RequestMethod.GET)
    public int checkUser(HttpServletRequest request){
        int result = userService.getUserByAccount(request.getParameter("account"));
        return result;
    }

}
