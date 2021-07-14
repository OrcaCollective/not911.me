import os
from typing import Awaitable, Callable
import httpx
import logging
import smtplib
from email.message import EmailMessage


logger = logging.getLogger(__name__)

AKISMET_KEY = os.environ.get("AKISMET_KEY")
SMTP_HOST = os.environ.get("SMTP_HOST")
SMTP_USERNAME = os.environ.get("SMTP_USERNAME")
SMTP_PASSWORD = os.environ.get("SMTP_PASSWORD")
SMTP_PORT = os.environ.get("SMTP_PORT")
SMTP_FROM_ADDR = os.environ.get("SMTP_FROM_ADDR")
SMTP_TO_ADDR = os.environ.get("SMTP_TO_ADDR")
SMTP_SUBJECT = os.environ.get("SMTP_SUBJECT")

AKISMET_BASE_PATH = f"https://{AKISMET_KEY}.rest.akismet.com"
AKISMET_COMMENT_CHECK_PATH = f"{AKISMET_BASE_PATH}/1.1/comment-check"

AKISMET_DEFAULT_PARAMS = {
    "blog": "http://not911.me",
    "blog_lang": "en",
}


def build_callback(user_ip: str, email: str, message: str, **kwargs) -> Callable[[], Awaitable[None]]:
    async def callback():
        is_spam = await check_akismet(user_ip, email, message)

        if is_spam:
            return

        send_message(email, message, **kwargs)

    return callback


async def check_akismet(user_ip: str, email: str, message: str) -> bool:
    async with httpx.AsyncClient() as client:
        response = await client.post(
            AKISMET_COMMENT_CHECK_PATH,
            data={
                "user_ip": user_ip,
                "comment_author_email": email,
                "comment_content": message,
                **AKISMET_DEFAULT_PARAMS
            },
        )

        return response.text == 'true'


SMTP_PARAMS = {
    "host": SMTP_HOST,
    "port": SMTP_PORT
}


def send_message(email: str, message: str, form_name: str, **kwargs) -> None:
    with smtplib.SMTP(**SMTP_PARAMS) as smtp:
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
