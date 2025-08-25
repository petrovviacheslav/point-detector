package my.itmo.services;

import lombok.RequiredArgsConstructor;
import my.itmo.dto.UserDTO;
import my.itmo.network.WriteMeRequest;
import my.itmo.services.interfaces.AdminService;
import my.itmo.services.interfaces.UserRepository;
import my.itmo.services.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;



@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {
    private final UserRepository userRepository;
    private final UserService userService;

    @Autowired
    private EmailService emailService;

    @Override
    public List<UserDTO> getAllUsers() {
        if (Objects.equals(userService.getCurrentUser().username(), "parzi")) {
            return userRepository.findAll()
                    .stream()
                    .map(user -> new UserDTO(user.getId(), user.getEmail(), user.getUsername(), user.getIsVerified())).toList();
        } else return null;
    }

    @Override
    public ResponseEntity writeToMe(WriteMeRequest req) {
        emailService.sendConfirmationEmail("lery66lery@yandex.ru", "С основного сайта parzi.ru","Имя: " + req.name() + "\nEmail: " + req.email() + "\nMessage: " + req.message());
        return ResponseEntity.ok("ok");
    }
}
