import json

from fastapi import Depends, HTTPException, UploadFile
from fastapi.responses import RedirectResponse
from sqlalchemy import func
from sqlmodel import Session, select

from python.models.quote import Quote, QuoteRead
from python.server import get_session


def bind(app):
    @app.post("/quotes/upload")
    async def upload_file(
        *,
        file: UploadFile,
        session: Session = Depends(get_session),
    ):
        quotes_obj = json.load(file.file)
        uploaded_quotes = []
        for quote in quotes_obj:
            quote_orm = Quote(
                id=quote["quote_id"],
                quote=quote["quote"],
                character=quote["character"],
            )
            session.add(quote_orm)
            session.commit()
            session.refresh(quote_orm)
            uploaded_quotes.append(quote_orm.copy())
        return uploaded_quotes

    @app.get("/quotes/random")
    def read_random_quote(
        *,
        session: Session = Depends(get_session),
    ):
        random_quote = session.exec(select(Quote).order_by(func.random())).first()
        if not random_quote:
            raise HTTPException(status_code=404, detail="no quotes found")
        return RedirectResponse(f"/quotes/{random_quote.id}")

    @app.get("/quotes/{quote_id}", response_model=QuoteRead)
    def read_quote(
        *,
        quote_id: int,
        session: Session = Depends(get_session),
    ):
        quote = session.get(Quote, quote_id)
        if not quote:
            raise HTTPException(status_code=404, detail="quote not found")
        return quote
