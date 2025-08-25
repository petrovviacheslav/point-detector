package my.itmo.network;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

public record WriteMeRequest(
        @NotEmpty
        String name,
        @NotEmpty
        String email,
        @NotBlank
        @Size(min = 4)
        String message
) {
}
