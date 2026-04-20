from passlib.context import CryptContext


pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")

def hashpass(password:str):
    return pwd_context.hash(password)


def verify_pass(plainpass,hashpass):
    return pwd_context.verify(plainpass,hashpass)