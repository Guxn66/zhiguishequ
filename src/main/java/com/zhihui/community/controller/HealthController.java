package com.zhihui.community.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;
import java.util.HashMap;

@RestController
public class HealthController {

    @GetMapping("/health")
    public Map<String, Object> health() {
        Map<String, Object> result = new HashMap<>();
        result.put("status", "ok");
        result.put("message", "智汇社区API服务运行正常");
        result.put("version", "1.0.0");
        return result;
    }

    @GetMapping("/")
    public Map<String, Object> index() {
        Map<String, Object> result = new HashMap<>();
        result.put("name", "智汇社区后端API");
        result.put("version", "1.0.0");
        result.put("status", "running");
        return result;
    }
}

