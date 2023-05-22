.PHONY: install lint test up down demo

install:
	@./scripts/install.sh

lint:
	pre-commit run --all-files

test:
	yarn run test

up:
	docker compose \
		--file deployments/docker-compose.yaml \
		up --build --force-recreate --remove-orphans --wait

down:
	docker compose \
		--file deployments/docker-compose.yaml \
		down --remove-orphans

demo:
	bash -c "trap 'make down' EXIT; \
			docker compose \
				--file deployments/docker-compose.yaml \
				up --build --force-recreate --remove-orphans --wait; \
			sleep 2; \
			./scripts/run_demo.sh"
