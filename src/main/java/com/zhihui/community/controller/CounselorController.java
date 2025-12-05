package com.zhihui.community.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/counselors")
public class CounselorController {

    private static final List<Map<String, Object>> counselors = new ArrayList<>();

    static {
        counselors.add(Map.of(
            "id", 1, "name", "林医师", "avatar", "",
            "qualification", "国家二级心理咨询师",
            "specialty", "婚姻家庭、情绪管理",
            "introduction", "从业10年，专注于家庭关系和情绪调节"
        ));
        counselors.add(Map.of(
            "id", 2, "name", "陈老师", "avatar", "",
            "qualification", "心理治疗师",
            "specialty", "青少年心理、学业压力",
            "introduction", "擅长青少年心理辅导，帮助学生健康成长"
        ));
    }

    @GetMapping
    public Map<String, Object> getCounselors() {
        return Map.of("data", counselors);
    }

    @PostMapping
    public Map<String, Object> addCounselor(@RequestBody Map<String, Object> body) {
        long id = System.currentTimeMillis();
        body.put("id", id);
        counselors.add(new HashMap<>(body));
        return Map.of("message", "添加成功", "id", id);
    }

    @PutMapping("/{id}")
    public Map<String, Object> updateCounselor(@PathVariable Long id, @RequestBody Map<String, Object> body) {
        counselors.removeIf(c -> Long.valueOf(c.get("id").toString()).equals(id));
        body.put("id", id);
        counselors.add(new HashMap<>(body));
        return Map.of("message", "更新成功");
    }

    @DeleteMapping("/{id}")
    public Map<String, Object> deleteCounselor(@PathVariable Long id) {
        counselors.removeIf(c -> Long.valueOf(c.get("id").toString()).equals(id));
        return Map.of("message", "删除成功");
    }
}

