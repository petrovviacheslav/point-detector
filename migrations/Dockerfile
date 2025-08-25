FROM liquibase/liquibase:latest

WORKDIR /liquibase
COPY ./java/changelog-master.xml /liquibase/changelog/
COPY ./java/ /liquibase/changelog/
#COPY ./java/init_data/ /liquibase/changelog/init_data/
