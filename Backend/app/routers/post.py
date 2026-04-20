from typing import List, Optional
from fastapi import Response,status,HTTPException,Depends,APIRouter
from sqlalchemy.orm import Session
from sqlalchemy import func
from .. import models,schemas,oauth2
from ..database import get_db





router = APIRouter(
    prefix="/posts",
    tags=['Post']
)


@router.get("/",response_model=List[schemas.PostOut])
def get_posts(db: Session=Depends(get_db),current_user: int = Depends(oauth2.get_current_user),Limit: int = 10,skip : int=0):
    # cursor.execute(""" SELECT * FROM posts """)
    # posts=cursor.fetchall()
    # print(posts)

    results= db.query(models.Post,func.count(models.Vote.post_id).label("votes")).outerjoin(models.Vote,models.Post.id==models.Vote.post_id).group_by(models.Post.id).limit(Limit).offset(skip).all()
    print(results)

    return [{"Post": post, "votes": votes} for post, votes in results]

@router.post("/",status_code=status.HTTP_201_CREATED,response_model=schemas.Post)
def create_post(new_post : schemas.PostCreate,db: Session=Depends(get_db),current_user: int = Depends(oauth2.get_current_user)):
    post=models.Post(owner_id=current_user.id, **new_post.dict())
    db.add(post)
    db.commit()
    db.refresh(post)
    return post

@router.get("/{id}",response_model=schemas.Post)
def get_post(id: int,db: Session=Depends(get_db),current_user: int = Depends(oauth2.get_current_user)):

    # cursor.execute(""" SELECT * FROM posts  WHERE id = %s """,(str(id)))
    # post=cursor.fetchone()
    post=db.query(models.Post).filter(models.Post.id==id).first()
    if not post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Post with id: {id} was not found")
        # response.status_code=status.HTTP_404_NOT_FOUND
        # return {'message': f"Post with id: {id} is not found"}
    return post


@router.delete("/{id}",status_code=status.HTTP_204_NO_CONTENT)
def delete_post(id: int,db: Session=Depends(get_db),current_user: int = Depends(oauth2.get_current_user)):

    # cursor.execute(""" DELETE FROM posts WHERE id = %s RETURNING * """,(str(id),))
    # del_post=cursor.fetchone()
    # conn.commit()

    post_que=db.query(models.Post).filter(models.Post.id==id)
    post=post_que.first()

    if  post is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Post was not found")
    

    if post.owner_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,detail="Not authorized to perform action")
    
    post_que.delete(synchronize_session=False)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.put("/{id}",response_model=schemas.Post)
def update_post(id: int,upd_post : schemas.PostBase,db: Session=Depends(get_db),current_user: int = Depends(oauth2.get_current_user)):

    # cursor.execute("""Update posts set title=%s ,content=%s ,published=%s where id=%s returning *""",(post.title,post.content,post.published,str(id)))
    # upd_post=cursor.fetchone()
    # conn.commit()
    post_que=db.query(models.Post).filter(models.Post.id==id)
    post=post_que.first()



    if post is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Post was not found")
    
    if post.owner_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,detail="Not authorized to perform action")
    
    post_que.update(upd_post.dict(),synchronize_session=False)
    db.commit()
   

    return post_que.first()
