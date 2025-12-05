package com.zhihui.community.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @PostMapping("/resident/login")
    public Map<String, Object> residentLogin(@RequestBody Map<String, Object> body) {
        String phone = (String) body.get("phone");
        String password = (String) body.get("password");
        
        // 体验版：简单验证
        if (phone != null && "123456".equals(password)) {
            return Map.of(
                "token", "demo-token-" + System.currentTimeMillis(),
                "user", Map.of("id", 1, "phone", phone, "name", "体验用户", "type", "resident")
            );
        }
        return Map.of("error", "手机号或密码错误");
    }

    @PostMapping("/resident/register")
    public Map<String, Object> residentRegister(@RequestBody Map<String, Object> body) {
        return Map.of("message", "注册成功", "id", System.currentTimeMillis());
    }

    @PostMapping("/worker/login")
    public Map<String, Object> workerLogin(@RequestBody Map<String, Object> body) {
        String workerId = (String) body.get("workerId");
        String password = (String) body.get("password");
        
        if (workerId != null && "123456".equals(password)) {
            return Map.of(
                "token", "worker-token-" + System.currentTimeMillis(),
                "user", Map.of("id", 1, "workerId", workerId, "name", "社工用户", "type", "worker")
            );
        }
        return Map.of("error", "工号或密码错误");
    }

    @GetMapping("/check")
    public Map<String, Object> checkAuth(@RequestHeader(value = "Authorization", required = false) String auth) {
        if (auth != null && auth.startsWith("Bearer ")) {
            return Map.of("valid", true);
        }
        return Map.of("valid", false);
    }
}

