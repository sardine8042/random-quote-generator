from typing import Optional

from sqlmodel import Field, SQLModel


class QuoteBase(SQLModel):
    quote: str
    character: str


class Quote(QuoteBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)


class QuoteCreate(QuoteBase):
    pass


class QuoteRead(QuoteBase):
    id: int
