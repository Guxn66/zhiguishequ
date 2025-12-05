package com.zhihui.community.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/banners")
public class BannerController {

    private static final List<Map<String, Object>> banners = new ArrayList<>();

    static {
        banners.add(Map.of("id", 1, "title", "欢迎使用智汇社区", "imageUrl", "", "link", "", "sort", 1));
        banners.add(Map.of("id", 2, "title", "社区服务活动", "imageUrl", "", "link", "", "sort", 2));
    }

    @GetMapping
    public List<Map<String, Object>> getBanners() {
        return banners;
    }

    @PostMapping
    public Map<String, Object> addBanner(@RequestBody Map<String, Object> body) {
        long id = System.currentTimeMillis();
        body.put("id", id);
        banners.add(new HashMap<>(body));
        return Map.of("message", "添加成功", "id", id);
    }

    @PutMapping("/{id}")
    public Map<String, Object> updateBanner(@PathVariable Long id, @RequestBody Map<String, Object> body) {
        banners.removeIf(b -> Long.valueOf(b.get("id").toString()).equals(id));
        body.put("id", id);
        banners.add(new HashMap<>(body));
        return Map.of("message", "更新成功");
    }

    @DeleteMapping("/{id}")
    public Map<String, Object> deleteBanner(@PathVariable Long id) {
        banners.removeIf(b -> Long.valueOf(b.get("id").toString()).equals(id));
        return Map.of("message", "删除成功");
    }
}

