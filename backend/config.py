from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql+asyncpg://user:password@localhost/dbname"
    STRIPE_SECRET_KEY: str = "sk_test_..."
    STRIPE_WEBHOOK_SECRET: str = "whsec_..."

    class Config:
        env_file = ".env"

settings = Settings()
