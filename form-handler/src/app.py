import logging
import os

import dotenv
import falcon
from falcon_limiter import Limiter


dotenv.load_dotenv()

import utils


logger = logging.getLogger(__name__)

REDIS_URL = os.environ.get("REDIS_URL")


def get_ip(req, resp, resource, params) -> str:
    return req.headers.get("X-Forwarded-For", req.remote_addr)


if REDIS_URL is None:
    limiter_config = {"RATELIMIT_STORAGE_URL": "memory://"}
else:
    limiter_config = {"RATELIMIT_STORAGE_URL": REDIS_URL}


limiter = Limiter(key_func=get_ip, config=limiter_config)


class FormResource:
    @limiter.limit("1/hour", key_func=get_ip)
    def on_post(self, req: falcon.Request, resp: falcon.Response) -> None:
        user_ip = req.headers.get("X-Forwarded-For", req.remote_addr)
        body: utils.RequestBody = req.get_media()
        utils.validate_body(body)
        try:
            utils.send_message(user_ip, **body)
        except Exception:
            logger.exception("An error occured while sending a message")
        resp.status = falcon.HTTP_FOUND
        resp.headers["Location"] = req.host


app = falcon.App(middleware=limiter.middleware)
app.add_route("/", FormResource())
