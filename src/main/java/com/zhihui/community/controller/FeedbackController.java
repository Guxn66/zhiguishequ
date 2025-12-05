package com.zhihui.community.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    private static final List<Map<String, Object>> feedbacks = new ArrayList<>();

    static {
        Map<String, Object> f1 = new HashMap<>();
        f1.put("id", 1);
        f1.put("userName", "张先生");
        f1.put("content", "林心怡咨询师非常专业，耐心倾听我的困扰，给了很多实用的建议，感谢！");
        f1.put("type", "表扬");
        f1.put("replied", true);
        f1.put("reply", "感谢您的认可！我们会继续努力为您提供优质服务。");
        f1.put("createTime", "2024-12-03 14:30");
        feedbacks.add(f1);

        Map<String, Object> f2 = new HashMap<>();
        f2.put("id", 2);
        f2.put("userName", "李女士");
        f2.put("content", "希望增加周末的心理咨询服务时间，平时工作没空来。");
        f2.put("type", "建议");
        f2.put("replied", false);
        f2.put("reply", "");
        f2.put("createTime", "2024-12-04 10:15");
        feedbacks.add(f2);

        Map<String, Object> f3 = new HashMap<>();
        f3.put("id", 3);
        f3.put("userName", "王奶奶");
        f3.put("content", "社工小张每周都来看我，帮我买菜收拾屋子，太感谢了！");
        f3.put("type", "表扬");
        f3.put("replied", true);
        f3.put("reply", "王奶奶保重身体，我们会一直陪伴您！");
        f3.put("createTime", "2024-12-02 16:20");
        feedbacks.add(f3);

        Map<String, Object> f4 = new HashMap<>();
        f4.put("id", 4);
        f4.put("userName", "陈同学");
        f4.put("content", "课后辅导班很有帮助，老师讲解很仔细，希望能继续举办。");
        f4.put("type", "建议");
        f4.put("replied", false);
        f4.put("reply", "");
        f4.put("createTime", "2024-12-05 09:00");
        feedbacks.add(f4);
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

