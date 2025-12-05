package com.zhihui.community.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/volunteers")
public class VolunteerController {

    private static final List<Map<String, Object>> activities = new ArrayList<>();

    static {
        Map<String, Object> v1 = new HashMap<>();
        v1.put("id", 1);
        v1.put("title", "社区环保清洁行动");
        v1.put("date", "2024-12-15");
        v1.put("location", "智汇社区公园");
        v1.put("points", 10);
        v1.put("maxVolunteers", 30);
        v1.put("currentVolunteers", 18);
        v1.put("description", "参与社区公共区域清洁，美化我们的家园");
        v1.put("status", "ongoing");
        activities.add(v1);

        Map<String, Object> v2 = new HashMap<>();
        v2.put("id", 2);
        v2.put("title", "关爱老人爱心探访");
        v2.put("date", "2024-12-20");
        v2.put("location", "社区养老服务中心");
        v2.put("points", 15);
        v2.put("maxVolunteers", 15);
        v2.put("currentVolunteers", 12);
        v2.put("description", "探访社区独居老人，陪伴聊天，帮助做家务");
        v2.put("status", "ongoing");
        activities.add(v2);

        Map<String, Object> v3 = new HashMap<>();
        v3.put("id", 3);
        v3.put("title", "儿童课后辅导班");
        v3.put("date", "2024-12-18");
        v3.put("location", "社区儿童活动中心");
        v3.put("points", 12);
        v3.put("maxVolunteers", 10);
        v3.put("currentVolunteers", 8);
        v3.put("description", "为社区儿童提供课后作业辅导和兴趣培养");
        v3.put("status", "ongoing");
        activities.add(v3);

        Map<String, Object> v4 = new HashMap<>();
        v4.put("id", 4);
        v4.put("title", "两岸美食文化节志愿者");
        v4.put("date", "2024-12-25");
        v4.put("location", "社区文化广场");
        v4.put("points", 20);
        v4.put("maxVolunteers", 25);
        v4.put("currentVolunteers", 15);
        v4.put("description", "协助两岸美食文化节活动的组织与服务工作");
        v4.put("status", "ongoing");
        activities.add(v4);
    }

    @GetMapping("/activities")
    public Map<String, Object> getActivities() {
        return Map.of("data", activities);
    }

    @PostMapping("/activities")
    public Map<String, Object> addActivity(@RequestBody Map<String, Object> body) {
        long id = System.currentTimeMillis();
        body.put("id", id);
        activities.add(new HashMap<>(body));
        return Map.of("message", "添加成功", "id", id);
    }

    @PostMapping("/register")
    public Map<String, Object> register(@RequestBody Map<String, Object> body) {
        return Map.of("message", "报名成功");
    }

    @GetMapping("/my")
    public Map<String, Object> getMyActivities() {
        return Map.of("data", List.of(), "totalHours", 0, "totalPoints", 0);
    }
}

