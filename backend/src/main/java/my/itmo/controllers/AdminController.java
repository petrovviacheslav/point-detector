package my.itmo.controllers;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import my.itmo.dto.UserDTO;
import my.itmo.network.WriteMeRequest;
import my.itmo.services.interfaces.AdminService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/admin")
public class AdminController {
    private final AdminService adminService;

    @GetMapping(value = "/getAllUsers")
    public List<UserDTO> getAllUsers() {
        log.info("Пришёл запрос на получение всех пользователей");
        return adminService.getAllUsers();
    }

    @PostMapping(value = "/write-to-me")
    public ResponseEntity writeToMe(@RequestBody WriteMeRequest req) {
        log.info("Пришёл запрос на отправку данных мне по почте");
        return adminService.writeToMe(req);
    }
}
