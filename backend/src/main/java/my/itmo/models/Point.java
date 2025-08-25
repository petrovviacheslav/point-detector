package my.itmo.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import my.itmo.network.CorrectPointRequest;

import java.text.SimpleDateFormat;
import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "points")
@Getter
@Setter
public class Point {
    @Id
    @Column(nullable = false, unique = true, name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, name = "x")
    private Double x;

    @Column(nullable = false, name = "y")
    private Double y;

    @Column(nullable = false, name = "r")
    private Double r;

    @Column(nullable = false, name = "result")
    private Boolean result;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_user", nullable = false)
    private User user;
//    @Column(nullable = false, name="user_id")
//    private Integer userId;

    @Column(nullable = false, name = "cur_time")
    private String currentTime;

    public Point(CorrectPointRequest dto, User user) {
        x = dto.x();
        y = dto.y();
        r = dto.r();
        result = checkPoint();
        currentTime = new SimpleDateFormat("HH:mm:ss dd.MM.yyyy").format(new Date(System.currentTimeMillis()));
        this.user = user;
    }

    private boolean checkPoint() {
        return (x > 0 && y >= 0 && (y <= r / 2 - 0.5 * x)) ||
                (x <= 0 && y <= 0 && (Math.sqrt(x * x + y * y) <= r)) ||
                (x <= 0 && y >= 0 && (x >= -r) && (y <= r));
    }
}
