all:
	docker compose -f docker-compose.yml up --build

re: clean
	docker compose -f docker-compose.yml up --build

down:
	docker compose -f docker-compose.yml down

clean:
	docker container stop ´docker container ls -aq´;\
	docker container rm ´docker container ls -aq´;\
	docker rmi -f ´docker images -aq´;\
	docker network rm ´docker network ls -q´;\
	docker system prune -a --volumes;\

.phony: all re down clean