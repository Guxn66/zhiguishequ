package com.zhihui.community.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    private static final List<Map<String, Object>> appointments = new ArrayList<>();

    static {
        appointments.add(Map.of("id", 1, "counselorId", 1, "counselorName", "林医师",
            "date", "2024-02-10", "time", "09:00-10:00", "status", "待确认",
            "residentName", "张先生", "residentPhone", "13800000001"));
        appointments.add(Map.of("id", 2, "counselorId", 2, "counselorName", "陈老师",
            "date", "2024-02-12", "time", "14:00-15:00", "status", "已确认",
            "residentName", "李女士", "residentPhone", "13800000002"));
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

