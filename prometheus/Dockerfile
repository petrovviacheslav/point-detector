FROM prom/prometheus:v3.5.0

USER root

# Копируем конфиг
COPY ./prometheus.yaml /etc/prometheus/prometheus.yaml

CMD ["--web.enable-lifecycle", "--config.file=/etc/prometheus/prometheus.yaml"]
