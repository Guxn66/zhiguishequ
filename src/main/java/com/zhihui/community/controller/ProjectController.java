package com.zhihui.community.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private static final List<Map<String, Object>> projects = new ArrayList<>();

    static {
        Map<String, Object> p1 = new HashMap<>();
        p1.put("id", 1);
        p1.put("title", "两岸融合示范社区建设项目");
        p1.put("category", "项目进展");
        p1.put("content", "本项目旨在打造两岸融合示范社区，促进两岸居民交流互动，已完成第一阶段建设。");
        p1.put("publishDate", "2024-12-01");
        p1.put("status", 1);
        projects.add(p1);

        Map<String, Object> p2 = new HashMap<>();
        p2.put("id", 2);
        p2.put("title", "2024年度社区服务经费使用公示");
        p2.put("category", "财务公开");
        p2.put("content", "2024年度社区服务经费总额50万元，已使用35万元，用于社区活动、设施维护、人员培训等。");
        p2.put("publishDate", "2024-11-25");
        p2.put("status", 1);
        projects.add(p2);

        Map<String, Object> p3 = new HashMap<>();
        p3.put("id", 3);
        p3.put("title", "银发关怀计划进展通报");
        p3.put("category", "项目进展");
        p3.put("content", "银发关怀计划已服务社区老人286人次，开展上门服务156次，组织集体活动12场。");
        p3.put("publishDate", "2024-11-20");
        p3.put("status", 1);
        projects.add(p3);

        Map<String, Object> p4 = new HashMap<>();
        p4.put("id", 4);
        p4.put("title", "社区元旦联欢会活动通知");
        p4.put("category", "活动公告");
        p4.put("content", "定于2024年12月31日举办社区元旦联欢会，届时将有精彩文艺表演和抽奖活动，欢迎居民踊跃参加。");
        p4.put("publishDate", "2024-12-03");
        p4.put("status", 1);
        projects.add(p4);
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

