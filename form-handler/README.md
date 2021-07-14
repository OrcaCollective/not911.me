# form_handler

This is a simple API meant to handle contact forms for each city.

## Development

### If you just want to run the app

```sh
docker compose up
```

### If you want to develop against the app

1. Install a python virtual environment: `python3 -m venv venv`
1. Activate the virtual environment: `source venv/bin/activate`
1. Install dependencies: `make install-dev`
1. Run `make .env` and fill in the properties in the `form-handler/.env` file.
    * Note: For local development delete the `REDIS_URL` key to use in-memory rate limiting
1. Run the app: `make run`
1. Make changes and contribute 🙌
