.PHONY: install lint

install:
	@./scripts/install.sh

lint:
	pre-commit run --all-files
