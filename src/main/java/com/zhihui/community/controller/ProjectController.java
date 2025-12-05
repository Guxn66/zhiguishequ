package com.zhihui.community.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private static final List<Map<String, Object>> projects = new ArrayList<>();

    static {
        projects.add(Map.of("id", 1, "name", "两岸融合示范项目", "description", "促进两岸居民融合交流",
            "status", "进行中", "startDate", "2024-01-01", "endDate", "2024-12-31", "budget", 50000));
        projects.add(Map.of("id", 2, "name", "银发关怀计划", "description", "为社区老人提供关怀服务",
            "status", "进行中", "startDate", "2024-01-01", "endDate", "2024-06-30", "budget", 30000));
    }

    @GetMapping
    public Map<String, Object> getProjects() {
        return Map.of("data", projects);
    }

    @GetMapping("/{id}")
    public Map<String, Object> getProject(@PathVariable Long id) {
        return projects.stream()
            .filter(p -> Long.valueOf(p.get("id").toString()).equals(id))
            .findFirst()
            .orElse(Map.of("error", "项目不存在"));
    }

    @PostMapping
    public Map<String, Object> addProject(@RequestBody Map<String, Object> body) {
        long id = System.currentTimeMillis();
        body.put("id", id);
        projects.add(new HashMap<>(body));
        return Map.of("message", "添加成功", "id", id);
    }
}

