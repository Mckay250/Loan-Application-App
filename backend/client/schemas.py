from multiprocessing.connection import Client
from typing import Optional
from pydantic import BaseModel


class ClientData(BaseModel):
    """Client data model expected from the frontend"""

    id: Optional[int]
    fullname: str
    email: str
    phone: str
    yearly_revenue: float
    funding_amount_requested: float
