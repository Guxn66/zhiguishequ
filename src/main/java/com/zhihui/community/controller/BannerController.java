package com.zhihui.community.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/banners")
public class BannerController {

    private static final List<Map<String, Object>> banners = new ArrayList<>();

    static {
        Map<String, Object> b1 = new HashMap<>();
        b1.put("id", 1);
        b1.put("title", "欢迎使用智汇社区");
        b1.put("imageUrl", "https://picsum.photos/750/400?random=1");
        b1.put("link", "/pages/index/index");
        b1.put("sortOrder", 1);
        b1.put("status", 1);
        banners.add(b1);

        Map<String, Object> b2 = new HashMap<>();
        b2.put("id", 2);
        b2.put("title", "两岸融合·共建家园");
        b2.put("imageUrl", "https://picsum.photos/750/400?random=2");
        b2.put("link", "/pages/integration/activities/index");
        b2.put("sortOrder", 2);
        b2.put("status", 1);
        banners.add(b2);

        Map<String, Object> b3 = new HashMap<>();
        b3.put("id", 3);
        b3.put("title", "心理咨询服务开放预约");
        b3.put("imageUrl", "https://picsum.photos/750/400?random=3");
        b3.put("link", "/pages/counseling/index");
        b3.put("sortOrder", 3);
        b3.put("status", 1);
        banners.add(b3);
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

