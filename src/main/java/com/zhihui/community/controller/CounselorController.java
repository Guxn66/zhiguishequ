package com.zhihui.community.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/counselors")
public class CounselorController {

    private static final List<Map<String, Object>> counselors = new ArrayList<>();

    static {
        Map<String, Object> c1 = new HashMap<>();
        c1.put("id", 1);
        c1.put("name", "林心怡");
        c1.put("avatar", "https://api.dicebear.com/7.x/avataaars/svg?seed=linxinyi");
        c1.put("qualification", "国家二级心理咨询师");
        c1.put("specialty", "婚姻家庭,情绪管理,人际关系");
        c1.put("introduction", "从业12年，专注于家庭关系调解和情绪疏导。曾任三甲医院心理科主任，累计服务超过3000个家庭。");
        c1.put("phone", "13800001001");
        c1.put("status", 1);
        counselors.add(c1);

        Map<String, Object> c2 = new HashMap<>();
        c2.put("id", 2);
        c2.put("name", "陈建华");
        c2.put("avatar", "https://api.dicebear.com/7.x/avataaars/svg?seed=chenjianhua");
        c2.put("qualification", "心理治疗师/教育学硕士");
        c2.put("specialty", "青少年心理,学业压力,考前焦虑");
        c2.put("introduction", "专注青少年心理健康15年，擅长处理学业压力、考试焦虑、亲子沟通等问题，帮助超过2000名学生重拾信心。");
        c2.put("phone", "13800001002");
        c2.put("status", 1);
        counselors.add(c2);

        Map<String, Object> c3 = new HashMap<>();
        c3.put("id", 3);
        c3.put("name", "王明珠");
        c3.put("avatar", "https://api.dicebear.com/7.x/avataaars/svg?seed=wangmingzhu");
        c3.put("qualification", "高级心理咨询师");
        c3.put("specialty", "职场压力,抑郁焦虑,个人成长");
        c3.put("introduction", "10年企业EAP服务经验，专业处理职场压力、职业倦怠、抑郁焦虑等问题，助力职场人士身心健康。");
        c3.put("phone", "13800001003");
        c3.put("status", 1);
        counselors.add(c3);

        Map<String, Object> c4 = new HashMap<>();
        c4.put("id", 4);
        c4.put("name", "张德民");
        c4.put("avatar", "https://api.dicebear.com/7.x/avataaars/svg?seed=zhangdemin");
        c4.put("qualification", "老年心理咨询师");
        c4.put("specialty", "老年心理,丧亲辅导,临终关怀");
        c4.put("introduction", "专注老年人心理健康服务20年，擅长老年抑郁、丧亲哀伤辅导，帮助老人安享晚年。");
        c4.put("phone", "13800001004");
        c4.put("status", 1);
        counselors.add(c4);
    }

    @GetMapping
    public Map<String, Object> getCounselors() {
        return Map.of("data", counselors);
    }

    @PostMapping
    public Map<String, Object> addCounselor(@RequestBody Map<String, Object> body) {
        long id = System.currentTimeMillis();
        body.put("id", id);
        counselors.add(new HashMap<>(body));
        return Map.of("message", "添加成功", "id", id);
    }

    @PutMapping("/{id}")
    public Map<String, Object> updateCounselor(@PathVariable Long id, @RequestBody Map<String, Object> body) {
        counselors.removeIf(c -> Long.valueOf(c.get("id").toString()).equals(id));
        body.put("id", id);
        counselors.add(new HashMap<>(body));
        return Map.of("message", "更新成功");
    }

    @DeleteMapping("/{id}")
    public Map<String, Object> deleteCounselor(@PathVariable Long id) {
        counselors.removeIf(c -> Long.valueOf(c.get("id").toString()).equals(id));
        return Map.of("message", "删除成功");
    }
}

