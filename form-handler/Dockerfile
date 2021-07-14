FROM python:3.9-slim

ENV PYTHONUNBUFFERED=1
ENV PIP_NO_CACHE_DIR=1

COPY requirements.txt /app/requirements.txt

WORKDIR /app

RUN pip install -r requirements.txt

COPY src/ /app

CMD ["gunicorn", "--bind=0.0.0.0:5000", "--workers=4", "app:app"]
