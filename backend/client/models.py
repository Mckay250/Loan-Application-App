import email
from unicodedata import decimal
from sqlalchemy import Column, Integer, String, Numeric
from .database import Base


class LoanRequest(Base):
    __tablename__ = 'loan_requests'

    id = Column(Integer, primary_key=True, index=True)
    fullname = Column(String)
    email = Column(String)
    phone = Column(String)
    yearly_revenue = Column(Numeric)
    funding_amount = Column(Numeric)
    