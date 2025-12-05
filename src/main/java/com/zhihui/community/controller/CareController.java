package com.zhihui.community.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/care")
public class CareController {

    private static final List<Map<String, Object>> services = new ArrayList<>();

    static {
        services.add(Map.of("id", 1, "name", "临终关怀", "icon", "🕯️", "description", "为末期病人及家属提供身心支持"));
        services.add(Map.of("id", 2, "name", "银发陪护", "icon", "👴", "description", "关爱长者，提供日常陪伴服务"));
        services.add(Map.of("id", 3, "name", "青少年关怀", "icon", "👦", "description", "关注青少年成长与发展"));
        services.add(Map.of("id", 4, "name", "妇女关怀", "icon", "👩", "description", "关注女性身心健康与权益"));
    }

    @GetMapping("/services")
    public List<Map<String, Object>> getServices() {
        return services;
    }

    @PostMapping("/services")
    public Map<String, Object> addService(@RequestBody Map<String, Object> body) {
        long id = System.currentTimeMillis();
        body.put("id", id);
        services.add(new HashMap<>(body));
        return Map.of("message", "添加成功", "id", id);
    }

    @PutMapping("/services/{id}")
    public Map<String, Object> updateService(@PathVariable Long id, @RequestBody Map<String, Object> body) {
        services.removeIf(s -> Long.valueOf(s.get("id").toString()).equals(id));
        body.put("id", id);
        services.add(new HashMap<>(body));
        return Map.of("message", "更新成功");
    }

    @DeleteMapping("/services/{id}")
    public Map<String, Object> deleteService(@PathVariable Long id) {
        services.removeIf(s -> Long.valueOf(s.get("id").toString()).equals(id));
        return Map.of("message", "删除成功");
    }

    @PostMapping("/apply")
    public Map<String, Object> applyCare(@RequestBody Map<String, Object> body) {
        return Map.of("message", "申请成功，社工将尽快与您联系", "id", System.currentTimeMillis());
    }
}

