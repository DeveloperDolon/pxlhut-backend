start:
	docker compose up -d
stop:
	docker compose down
build:
	docker compose build
logs:
	docker compose logs -f
shell:
	docker compose exec app sh