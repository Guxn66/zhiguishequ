package com.zhihui.community.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/training")
public class TrainingController {

    private static final List<Map<String, Object>> courses = new ArrayList<>();
    private static final List<Map<String, Object>> news = new ArrayList<>();

    static {
        Map<String, Object> t1 = new HashMap<>();
        t1.put("id", 1);
        t1.put("title", "社区工作者入门培训");
        t1.put("instructor", "张明华教授");
        t1.put("duration", "8小时");
        t1.put("description", "系统学习社区工作基础知识，包括社区治理、居民沟通、矛盾调解等核心技能。");
        t1.put("coverImage", "https://picsum.photos/400/300?random=10");
        t1.put("status", 1);
        courses.add(t1);

        Map<String, Object> t2 = new HashMap<>();
        t2.put("id", 2);
        t2.put("title", "心理咨询技巧进阶");
        t2.put("instructor", "李芳心理师");
        t2.put("duration", "4小时");
        t2.put("description", "掌握专业心理咨询技巧，学习如何与居民建立信任关系，提供有效的心理支持。");
        t2.put("coverImage", "https://picsum.photos/400/300?random=11");
        t2.put("status", 1);
        courses.add(t2);

        Map<String, Object> t3 = new HashMap<>();
        t3.put("id", 3);
        t3.put("title", "老年人关怀服务实务");
        t3.put("instructor", "王德生主任");
        t3.put("duration", "6小时");
        t3.put("description", "学习老年人身心特点，掌握老年关怀服务技巧，提升服务老年居民的专业能力。");
        t3.put("coverImage", "https://picsum.photos/400/300?random=12");
        t3.put("status", 1);
        courses.add(t3);

        Map<String, Object> t4 = new HashMap<>();
        t4.put("id", 4);
        t4.put("title", "青少年工作方法");
        t4.put("instructor", "陈建华老师");
        t4.put("duration", "4小时");
        t4.put("description", "了解青少年心理发展特点，学习与青少年有效沟通的方法，开展青少年服务活动。");
        t4.put("coverImage", "https://picsum.photos/400/300?random=13");
        t4.put("status", 1);
        courses.add(t4);

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

