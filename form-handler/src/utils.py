import logging
import os
import smtplib
from email.message import EmailMessage
from typing import TypedDict

import falcon
import requests


logger = logging.getLogger(__name__)

AKISMET_KEY = os.environ["AKISMET_KEY"]
SMTP_HOST = os.environ["SMTP_HOST"]
SMTP_USERNAME = os.environ["SMTP_USERNAME"]
SMTP_PASSWORD = os.environ["SMTP_PASSWORD"]
SMTP_PORT = os.environ["SMTP_PORT"]
SMTP_FROM_ADDR = os.environ["SMTP_FROM_ADDR"]
SMTP_TO_ADDR = os.environ["SMTP_TO_ADDR"]
SMTP_SUBJECT = os.environ["SMTP_SUBJECT"]

AKISMET_BASE_PATH = f"https://{AKISMET_KEY}.rest.akismet.com"
AKISMET_COMMENT_CHECK_PATH = f"{AKISMET_BASE_PATH}/1.1/comment-check"

AKISMET_DEFAULT_PARAMS = {
    "blog": "http://not911.me",
    "blog_lang": "en",
}


class RequestBody(TypedDict, total=False):
    """These are just the required params. Other params are fine too, they'll just get passed as kwargs."""

    form_name: str
    email: str
    message: str


def validate_body(body: RequestBody) -> None:
    for field in ["form_name", "email", "message"]:
        if field not in body:
            raise falcon.HTTPBadRequest()


def send_message(user_ip: str, email: str, message: str, **kwargs):
    is_spam = _check_akismet(user_ip, email, message)

    if is_spam:
        return

    _send_message(email, message, **kwargs)


def _check_akismet(user_ip: str, email: str, message: str) -> bool:
    response = requests.post(
        AKISMET_COMMENT_CHECK_PATH,
        data={
            "user_ip": user_ip,
            "comment_author_email": email,
            "comment_content": message,
            **AKISMET_DEFAULT_PARAMS,
        },
    )

    return response.text == "true"


SMTP_PARAMS = {"host": SMTP_HOST, "port": SMTP_PORT}


def _send_message(email: str, message: str, form_name: str, **kwargs) -> None:
    with smtplib.SMTP(host=SMTP_HOST, port=int(SMTP_PORT)) as smtp:
        smtp.login(user=SMTP_USERNAME, password=SMTP_PASSWORD)
        msg = EmailMessage()
        msg.add_header("From", SMTP_FROM_ADDR)
        msg.add_header("To", SMTP_TO_ADDR)
        msg.add_header("Subject", SMTP_SUBJECT.format(form_name=form_name))
        content = ""
        for key, value in kwargs.items():
            content += f"{key}: {value}\r\n"
        content += f"email: {email}\r\n"
        content += f"message: {message}\r\n"
        msg.set_content(content)
        smtp.send_message(msg, SMTP_FROM_ADDR, SMTP_TO_ADDR)
