all: ssl
	mkdir -p ./services/postgreSQL
	docker-compose -f docker-compose.yml up --build

re: clean all

down:
	docker-compose -f docker-compose.yml down

# linux
cleanux: down
	-docker container stop `docker container ls -aq`;
	-docker container rm `docker container ls -aq`;
	-docker rmi -f `docker images -aq`;
	-docker network rm $(docker network ls -q);
	-docker system prune -a --volumes;
	-docker volume prune -f;
	sudo rm -rf ./services/postgreSQL

# Mac at school
clean: down
	docker container stop `docker container ls -aq`;\
	docker container rm `docker container ls -aq`;\
	docker rmi -f `docker images -aq`;\
	docker network rm `docker network ls -q`;\
	docker system prune -a --volumes;\
	 rm -rf ./services/postgreSQL

ssl:
	@if [ ! -d "ssl" ]; then \
		mkdir -p ssl; \
    	openssl req -x509 -nodes -newkey rsa:2048 -keyout ssl/key.key -out ssl/cert.crt -days 365 -subj "/C=BE"; \
	fi

.phony: all re down clean