from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routers import resolver, inversion, ops, billing

app = FastAPI(title="DEFRAG API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ops.router, prefix="/ops", tags=["ops"])
app.include_router(resolver.router, prefix="/resolver", tags=["resolver"])
app.include_router(inversion.router, prefix="/inversion", tags=["inversion"])
app.include_router(billing.router, prefix="/billing", tags=["billing"])

@app.get("/")
async def root():
    return {"message": "Welcome to DEFRAG API"}
