package com.zhihui.community.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/training")
public class TrainingController {

    private static final List<Map<String, Object>> courses = new ArrayList<>();
    private static final List<Map<String, Object>> news = new ArrayList<>();

    static {
        courses.add(Map.of("id", 1, "title", "社区工作基础培训", "instructor", "张教授",
            "startTime", "2024-02-01 09:00", "endTime", "2024-02-01 17:00",
            "location", "社区活动中心", "maxParticipants", 30, "currentParticipants", 15));
        courses.add(Map.of("id", 2, "title", "心理咨询技巧进阶", "instructor", "李专家",
            "startTime", "2024-02-15 14:00", "endTime", "2024-02-15 18:00",
            "location", "线上培训", "maxParticipants", 50, "currentParticipants", 28));
        
        news.add(Map.of("id", 1, "title", "2024年社工培训计划发布", "summary", "新年度培训计划已发布，欢迎报名参加",
            "content", "详细培训内容...", "createdAt", "2024-01-15"));
        news.add(Map.of("id", 2, "title", "优秀学员表彰大会", "summary", "表彰2023年度优秀培训学员",
            "content", "表彰内容...", "createdAt", "2024-01-10"));
    }

    @GetMapping("/courses")
    public Map<String, Object> getCourses() {
        return Map.of("data", courses);
    }

    @GetMapping("/news")
    public Map<String, Object> getNews() {
        return Map.of("data", news);
    }

    @PostMapping("/courses")
    public Map<String, Object> addCourse(@RequestBody Map<String, Object> body) {
        long id = System.currentTimeMillis();
        body.put("id", id);
        courses.add(new HashMap<>(body));
        return Map.of("message", "添加成功", "id", id);
    }

    @PostMapping("/enroll")
    public Map<String, Object> enroll(@RequestBody Map<String, Object> body) {
        return Map.of("message", "报名成功");
    }
}

