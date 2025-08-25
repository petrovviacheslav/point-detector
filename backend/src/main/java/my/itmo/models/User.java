package my.itmo.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User {
    @Id
    @Column(nullable = false, unique = true, name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "username")
    private String username;

    @Column(nullable = false, name = "email")
    private String email;

    @Column(nullable = false, name = "password")
    private String password;

    @Column(name = "second_factor_code")
    private String secondFactorCode;

    @Column(name = "time_code")
    private Long timeCode;

    @Column(nullable = false, name = "verified")
    private Boolean isVerified;

    @Column(name = "verified_cache")
    private String verifiedCache;

    @OneToMany(mappedBy = "user",  fetch = FetchType.LAZY)
    private Set<Point> points;
}