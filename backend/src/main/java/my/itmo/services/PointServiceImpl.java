package my.itmo.services;

import io.jsonwebtoken.Claims;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import my.itmo.dto.PointDTO;
import my.itmo.models.Point;
import my.itmo.network.CorrectPointRequest;
import my.itmo.services.interfaces.PointRepository;
import my.itmo.services.interfaces.PointService;
import my.itmo.services.interfaces.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class PointServiceImpl implements PointService {
    private final PointRepository pointRepository;
    private final UserRepository userRepository;

    @Override
    public List<PointDTO> getUserPoints() {
        return pointRepository.findPointsByUserId(getUserIdFromToken())
                .stream()
                .map(point -> new PointDTO(point.getId(), point.getX(), point.getY(), point.getR(), point.getResult(), point.getCurrentTime()))
                .toList();
    }


    @Override
    public PointDTO addPoint(CorrectPointRequest dto) {
        Point point = new Point(dto, userRepository.findById(getUserIdFromToken()).orElseThrow());
        pointRepository.save(point);
        return pointRepository.findPointsByUserId(getUserIdFromToken())
                .stream()
                .max(Comparator.comparingInt(Point::getId))
                .map(p -> new PointDTO(p.getId(), p.getX(), p.getY(), p.getR(), p.getResult(), p.getCurrentTime())).get();

    }

    @Override
    public void deleteUserPoints() {
        pointRepository.deletePointsByUserId(getUserIdFromToken());
    }

    public Integer getUserIdFromToken() {
        Claims credentials = (Claims) SecurityContextHolder.getContext().getAuthentication().getCredentials();
        log.info("user id {}", credentials.get("id"));
        return Integer.parseInt(credentials.get("id").toString());
    }

}
