import functools
import os

import uvicorn as uvicorn
from fastapi import FastAPI
from sqlmodel import Session, SQLModel, create_engine

from python.controllers.quote import bind

app = FastAPI()
bind(app)


@functools.cache
def get_engine():
    return create_engine(
        os.environ.get("SQLALCHEMY_DATABASE_URI", "sqlite:///quotes.db"),
        echo=True,
        connect_args={"check_same_thread": False},
    )


def get_session():
    with Session(get_engine()) as session:
        yield session


@app.on_event("startup")
def on_startup():
    SQLModel.metadata.create_all(get_engine())


if __name__ == "__main__":
    uvicorn.run(
        "server:app",
        host="0.0.0.0",
        port=int(os.environ.get("UVICORN_PORT", "3000")),
    )
