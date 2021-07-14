from typing import TypedDict

import dotenv
import falcon
import falcon.asgi


dotenv.load_dotenv()

import utils


class RequestBody(TypedDict, total=False):
    """These are just the required params. Other params are fine too, they'll just get passed as kwargs."""

    form_name: str
    email: str
    message: str


def validate_body(body: RequestBody) -> None:
    for field in ["form_name", "email", "message"]:
        if field not in body:
            raise falcon.HTTPBadRequest()


class FormResource:
    async def on_post(
        self, req: falcon.asgi.Request, resp: falcon.asgi.Response
    ) -> None:
        user_ip = req.headers.get("X-Forwarded-For", req.remote_addr)
        body: RequestBody = await req.get_media()
        validate_body(body)
        callback = utils.build_callback(user_ip, **body)
        resp.schedule(callback)
        resp.status = falcon.HTTP_FOUND
        resp.headers["Location"] = req.host


app = falcon.asgi.App()
app.add_route("/", FormResource())
