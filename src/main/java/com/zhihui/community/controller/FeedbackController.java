package com.zhihui.community.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/feedbacks")
public class FeedbackController {

    private static final List<Map<String, Object>> feedbacks = new ArrayList<>();

    static {
        feedbacks.add(Map.of("id", 1, "content", "服务很好，社工很热情",
            "type", "表扬", "status", "已回复", "reply", "感谢您的认可！", "createdAt", "2024-01-10"));
        feedbacks.add(Map.of("id", 2, "content", "希望增加周末服务时间",
            "type", "建议", "status", "待处理", "reply", "", "createdAt", "2024-01-12"));
    }

    @GetMapping
    public Map<String, Object> getFeedbacks() {
        return Map.of("data", feedbacks);
    }

    @PostMapping
    public Map<String, Object> addFeedback(@RequestBody Map<String, Object> body) {
        long id = System.currentTimeMillis();
        body.put("id", id);
        body.put("status", "待处理");
        body.put("createdAt", new Date().toString());
        feedbacks.add(new HashMap<>(body));
        return Map.of("message", "反馈提交成功", "id", id);
    }

    @GetMapping("/my")
    public Map<String, Object> getMyFeedbacks() {
        return Map.of("data", feedbacks);
    }

    @PutMapping("/{id}/reply")
    public Map<String, Object> replyFeedback(@PathVariable Long id, @RequestBody Map<String, Object> body) {
        feedbacks.stream()
            .filter(f -> Long.valueOf(f.get("id").toString()).equals(id))
            .findFirst()
            .ifPresent(f -> {
                ((Map<String, Object>) f).put("reply", body.get("reply"));
                ((Map<String, Object>) f).put("status", "已回复");
            });
        return Map.of("message", "回复成功");
    }
}

