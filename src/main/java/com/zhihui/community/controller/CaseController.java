package com.zhihui.community.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/cases")
public class CaseController {

    private static final List<Map<String, Object>> cases = new ArrayList<>();

    static {
        Map<String, Object> c1 = new HashMap<>();
        c1.put("id", 1);
        c1.put("title", "独居老人关爱服务案例");
        c1.put("category", "老年关怀");
        c1.put("summary", "社工定期探访独居老人王奶奶，提供生活照料和情感陪伴，帮助其重拾生活信心。");
        c1.put("content", "王奶奶今年78岁，独居多年，子女在外地工作。社工小张每周两次上门探访...");
        c1.put("coverImage", "https://picsum.photos/400/300?random=20");
        c1.put("views", 256);
        c1.put("createdAt", "2024-11-10");
        cases.add(c1);

        Map<String, Object> c2 = new HashMap<>();
        c2.put("id", 2);
        c2.put("title", "青少年心理辅导成功案例");
        c2.put("category", "青少年成长");
        c2.put("summary", "初三学生小明因考试焦虑严重影响学习，通过心理咨询成功克服焦虑，成绩明显提升。");
        c2.put("content", "小明是一名初三学生，临近中考压力巨大，经常失眠、焦虑...");
        c2.put("coverImage", "https://picsum.photos/400/300?random=21");
        c2.put("views", 189);
        c2.put("createdAt", "2024-11-08");
        cases.add(c2);

        Map<String, Object> c3 = new HashMap<>();
        c3.put("id", 3);
        c3.put("title", "家庭关系调解案例");
        c3.put("category", "家庭关系");
        c3.put("summary", "婆媳矛盾导致家庭不和，社工介入调解，帮助家庭成员建立有效沟通，重归和睦。");
        c3.put("content", "张女士与婆婆因育儿观念不同产生严重分歧，家庭气氛紧张...");
        c3.put("coverImage", "https://picsum.photos/400/300?random=22");
        c3.put("views", 312);
        c3.put("createdAt", "2024-11-05");
        cases.add(c3);

        Map<String, Object> c4 = new HashMap<>();
        c4.put("id", 4);
        c4.put("title", "台胞社区融入服务案例");
        c4.put("category", "社区服务");
        c4.put("summary", "帮助新来厦门的台胞家庭快速融入社区生活，解决就学、就医等实际问题。");
        c4.put("content", "林先生一家从台湾来厦门定居，初到社区面临诸多生活困难...");
        c4.put("coverImage", "https://picsum.photos/400/300?random=23");
        c4.put("views", 428);
        c4.put("createdAt", "2024-10-28");
        cases.add(c4);
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

