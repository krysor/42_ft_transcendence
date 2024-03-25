all:
	mkdir -p ./services/postgreSQL
	docker-compose -f docker-compose.yml up --build

re: clean all

down:
	docker-compose -f docker-compose.yml down

clean: down
	docker container stop `docker container ls -aq`;\
	docker container rm `docker container ls -aq`;\
	docker rmi -f `docker images -aq`;\
	docker network rm `docker network ls -q`;\
	docker system prune -a --volumes;\
	rm -rf ./services/postgreSQL

.phony: all re down clean