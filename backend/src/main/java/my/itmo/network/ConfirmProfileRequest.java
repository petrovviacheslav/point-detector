package my.itmo.network;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ConfirmProfileRequest(
        @NotBlank
        @Size(min = 32, max = 32)
        String cache
) {
}
