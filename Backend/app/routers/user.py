from fastapi import status,HTTPException,Depends,APIRouter
from sqlalchemy.orm import Session
from .. import models,schemas,utils
from ..database import get_db




router = APIRouter(
    prefix="/users",
    tags=['User']
)




@router.post("/",status_code=status.HTTP_201_CREATED,response_model=schemas.UserOut)
def create_user(user:schemas.UserCreate, db: Session= Depends(get_db)):
    
    hashed_password = utils.hashpass(user.password)
    new_user=models.User(email=user.email, password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


@router.get("/{id}",response_model=schemas.UserOut)
def get_user(id: int,db: Session=Depends(get_db)):

    # cursor.execute(""" SELECT * FROM posts  WHERE id = %s """,(str(id)))
    # post=cursor.fetchone()
    user=db.query(models.User).filter(models.User.id==id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="User with id: {id} was not found")
        # response.status_code=status.HTTP_404_NOT_FOUND
        # return {'message': f"Post with id: {id} is not found"}
    return user
