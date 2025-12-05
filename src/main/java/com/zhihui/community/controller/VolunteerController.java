package com.zhihui.community.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/volunteers")
public class VolunteerController {

    private static final List<Map<String, Object>> activities = new ArrayList<>();

    static {
        activities.add(Map.of("id", 1, "title", "社区环保活动", "date", "2024-02-10",
            "location", "社区公园", "points", 10, "maxVolunteers", 20, "currentVolunteers", 8));
        activities.add(Map.of("id", 2, "title", "关爱老人探访", "date", "2024-02-15",
            "location", "养老院", "points", 15, "maxVolunteers", 10, "currentVolunteers", 5));
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

