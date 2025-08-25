package my.itmo.services;

import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.Base64;

@Service
public class EmailConfirmationTokenGeneratorService {
    private final SecureRandom secureRandom = new SecureRandom();

    public String generateToken() {

        byte[] randomBytes = new byte[24];
        secureRandom.nextBytes(randomBytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(randomBytes);
    }

}
