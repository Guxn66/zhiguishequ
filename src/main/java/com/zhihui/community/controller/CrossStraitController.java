package com.zhihui.community.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/cross-strait")
public class CrossStraitController {

    private static final List<Map<String, Object>> lifeList = new ArrayList<>();
    private static final List<Map<String, Object>> activities = new ArrayList<>();

    static {
        lifeList.add(Map.of("id", 1, "author", "小明", "region", "台湾",
            "content", "今天参加了社区组织的两岸文化交流活动，认识了很多新朋友！",
            "createTime", "2024-11-28", "likeCount", 45, "commentCount", 12));
        lifeList.add(Map.of("id", 2, "author", "李先生", "region", "台湾",
            "content", "在大陆生活的第三年，越来越喜欢这里的生活节奏。",
            "createTime", "2024-11-27", "likeCount", 128, "commentCount", 36));
        
        activities.add(Map.of("id", 1, "title", "两岸美食文化节", "date", "2024-02-20",
            "location", "社区广场", "description", "品尝两岸特色美食"));
        activities.add(Map.of("id", 2, "title", "两岸青年交流会", "date", "2024-02-25",
            "location", "社区活动中心", "description", "促进两岸青年交流互动"));
    }

    @GetMapping("/life")
    public List<Map<String, Object>> getLifeList() {
        return lifeList;
    }

    @PostMapping("/life")
    public Map<String, Object> addLife(@RequestBody Map<String, Object> body) {
        long id = System.currentTimeMillis();
        body.put("id", id);
        body.put("likeCount", 0);
        body.put("commentCount", 0);
        lifeList.add(0, new HashMap<>(body));
        return Map.of("message", "发布成功", "id", id);
    }

    @GetMapping("/activities")
    public List<Map<String, Object>> getActivities() {
        return activities;
    }

    @PostMapping("/activities")
    public Map<String, Object> addActivity(@RequestBody Map<String, Object> body) {
        long id = System.currentTimeMillis();
        body.put("id", id);
        activities.add(new HashMap<>(body));
        return Map.of("message", "添加成功", "id", id);
    }
}

