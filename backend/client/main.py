from client.schemas import ClientData
from fastapi import Depends, FastAPI, Depends, HTTPException, status, Response
from . import models
from .database import SessionLocal, engine
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware


origins = [
    "http://localhost",
    "http://localhost:3000",
]

app = FastAPI()
api_version = '/api/v1'

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(engine)

def get_db():
    """get the db session"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get('/')
def index():
    """Initial route for testing if app server is up"""
    return 'working'

@app.post(f'{api_version}/client', status_code=status.HTTP_201_CREATED)
def save(client_data: ClientData, db: Session = Depends(get_db)):
    """Persist a loan request to the database"""

    # raise a bad request exception if yearly revenue or funding amount requested is not within accepted range
    if client_data.yearly_revenue < 50000 or client_data.funding_amount_requested < 25000:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No offers found."
        )

    # create new loan request and save into the database
    new_loan_request = generate_LoanRequest_from_ClientData(client_data)
    db.add(new_loan_request)
    db.commit()
    db.refresh(new_loan_request)
    return new_loan_request

@app.put(f'{api_version}/client/{id}', status_code=status.HTTP_202_ACCEPTED)
def update(id:int, client_data: ClientData, db:Session = Depends(get_db)):
    """Function to update an existing loan request by id"""
    client_data.id = id
    loan_request = db.query(models.LoanRequest).filter(models.LoanRequest.id == id).update({
            models.LoanRequest.fullname:client_data.fullname,
            models.LoanRequest.email:client_data.email,
            models.LoanRequest.phone:client_data.phone,
            models.LoanRequest.yearly_revenue:client_data.yearly_revenue,
            models.LoanRequest.funding_amount:client_data.funding_amount_requested
            })
    if loan_request == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Loan request not found."
        )
    db.commit()
    return loan_request

@app.get(f'{api_version}/client')
def get_all_loan_requests(db: Session = Depends(get_db)):
    """Get all the loan requests in the database"""

    loan_requests = db.query(models.LoanRequest).all()
    response = []
    for request in loan_requests:
        response.append(generate_ClientData_from_LoanRequest(request=request))
    return response

@app.get(f'{api_version}/client/{id}')
def retrieve_by_id(id: int, db: Session = Depends(get_db)):
    """Retrieve a loan request by id"""
    loan_request = db.query(models.LoanRequest).filter(models.LoanRequest.id == id).first()
    
    if loan_request is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f'loan request with id:{id} does not exist'
        )
    response_data = generate_ClientData_from_LoanRequest(loan_request)
    return response_data

def generate_LoanRequest_from_ClientData(client_data: ClientData):
    return models.LoanRequest(
        id=client_data.id,
        fullname=client_data.fullname,
        email=client_data.email,
        phone=client_data.phone,
        yearly_revenue=client_data.yearly_revenue,
        funding_amount=client_data.funding_amount_requested
        )

def generate_ClientData_from_LoanRequest(request: models.LoanRequest):
    return ClientData(
            id=request.id,
            fullname=request.fullname,
            email=request.email,
            phone=request.phone,
            yearly_revenue=request.yearly_revenue,
            funding_amount_requested=request.funding_amount
        )
