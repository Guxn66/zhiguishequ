package com.zhihui.community.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    private static final List<Map<String, Object>> appointments = new ArrayList<>();

    static {
        Map<String, Object> a1 = new HashMap<>();
        a1.put("id", 1);
        a1.put("counselorId", 1);
        a1.put("counselorName", "林心怡");
        a1.put("date", "2024-12-10");
        a1.put("time", "09:00-10:00");
        a1.put("status", "pending");
        a1.put("residentName", "张先生");
        a1.put("residentPhone", "13800000001");
        a1.put("createTime", "2024-12-05 08:30");
        appointments.add(a1);

        Map<String, Object> a2 = new HashMap<>();
        a2.put("id", 2);
        a2.put("counselorId", 2);
        a2.put("counselorName", "陈建华");
        a2.put("date", "2024-12-12");
        a2.put("time", "14:00-15:00");
        a2.put("status", "confirmed");
        a2.put("residentName", "李女士");
        a2.put("residentPhone", "13800000002");
        a2.put("createTime", "2024-12-04 15:20");
        appointments.add(a2);

        Map<String, Object> a3 = new HashMap<>();
        a3.put("id", 3);
        a3.put("counselorId", 3);
        a3.put("counselorName", "王明珠");
        a3.put("date", "2024-12-15");
        a3.put("time", "10:00-11:00");
        a3.put("status", "pending");
        a3.put("residentName", "陈小姐");
        a3.put("residentPhone", "13800000003");
        a3.put("createTime", "2024-12-05 10:15");
        appointments.add(a3);

        Map<String, Object> a4 = new HashMap<>();
        a4.put("id", 4);
        a4.put("serviceName", "银发陪护");
        a4.put("date", "2024-12-08");
        a4.put("time", "15:00-17:00");
        a4.put("status", "completed");
        a4.put("residentName", "王奶奶");
        a4.put("residentPhone", "13800000004");
        a4.put("createTime", "2024-12-02 09:00");
        appointments.add(a4);
    }

    @GetMapping
    public Map<String, Object> getAppointments() {
        return Map.of("data", appointments);
    }

    @PostMapping
    public Map<String, Object> createAppointment(@RequestBody Map<String, Object> body) {
        long id = System.currentTimeMillis();
        body.put("id", id);
        body.put("status", "待确认");
        appointments.add(new HashMap<>(body));
        return Map.of("message", "预约成功", "id", id);
    }

    @GetMapping("/my")
    public Map<String, Object> getMyAppointments() {
        return Map.of("data", appointments);
    }

    @PutMapping("/{id}/status")
    public Map<String, Object> updateStatus(@PathVariable Long id, @RequestBody Map<String, Object> body) {
        appointments.stream()
            .filter(a -> Long.valueOf(a.get("id").toString()).equals(id))
            .findFirst()
            .ifPresent(a -> ((Map<String, Object>) a).put("status", body.get("status")));
        return Map.of("message", "状态更新成功");
    }

    @DeleteMapping("/{id}")
    public Map<String, Object> cancelAppointment(@PathVariable Long id) {
        appointments.removeIf(a -> Long.valueOf(a.get("id").toString()).equals(id));
        return Map.of("message", "取消成功");
    }
}

