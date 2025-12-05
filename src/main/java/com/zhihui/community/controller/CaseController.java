package com.zhihui.community.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/cases")
public class CaseController {

    private static final List<Map<String, Object>> cases = new ArrayList<>();

    static {
        cases.add(Map.of("id", 1, "title", "独居老人关爱服务", "summary", "为社区独居老人提供定期探访服务",
            "content", "详细案例内容...", "imageUrl", "", "createdAt", "2024-01-10"));
        cases.add(Map.of("id", 2, "title", "青少年心理辅导", "summary", "帮助青少年解决学习压力问题",
            "content", "详细案例内容...", "imageUrl", "", "createdAt", "2024-01-08"));
    }

    @GetMapping
    public Map<String, Object> getCases() {
        return Map.of("data", cases);
    }

    @GetMapping("/{id}")
    public Map<String, Object> getCase(@PathVariable Long id) {
        return cases.stream()
            .filter(c -> Long.valueOf(c.get("id").toString()).equals(id))
            .findFirst()
            .orElse(Map.of("error", "案例不存在"));
    }

    @PostMapping
    public Map<String, Object> addCase(@RequestBody Map<String, Object> body) {
        long id = System.currentTimeMillis();
        body.put("id", id);
        cases.add(new HashMap<>(body));
        return Map.of("message", "添加成功", "id", id);
    }

    @DeleteMapping("/{id}")
    public Map<String, Object> deleteCase(@PathVariable Long id) {
        cases.removeIf(c -> Long.valueOf(c.get("id").toString()).equals(id));
        return Map.of("message", "删除成功");
    }
}

