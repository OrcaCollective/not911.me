.PHONY: .env
.env:
	cp form-handler/.env.example form-handler/.env


.PHONY: run
run:
	hypercorn --bind=0.0.0.0:5000 --reload form-handler/src/app:app
