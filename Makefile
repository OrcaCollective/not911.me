.PHONY: .env
.env:
	cp form-handler/.env.example form-handler/.env


.PHONY: run
run:
	cd form-handler/src && gunicorn --bind=0.0.0.0:5000 --reload app:app


.PHONY: install-dev
install-dev:
	pip install -r form-handler/requirements-dev.txt
	pre-commit install
