from fastapi import APIRouter, FastAPI,Depends,status,HTTPException,Response
from sqlalchemy.orm import Session
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from .. import database,schemas,models,utils,oauth2

router=APIRouter(
    tags=['Authentication']

)

@router.post('/login')
def login(user_credentials: OAuth2PasswordRequestForm=Depends(),db: Session = Depends(database.get_db)):
    user=db.query(models.User).filter(models.User.email==user_credentials.username).first()

    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Invalid Credentials")
    
    if not utils.verify_pass(user_credentials.password,user.password):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Invalid Credentials")
    
    acess_token = oauth2.create_access_token(data={"user_id": user.id})
    
    return {"token": acess_token,"type":"bearer"}
    
    

    


    