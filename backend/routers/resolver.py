from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from backend.services.resolver import resolver_service
from backend.deps import get_current_user
from uuid import UUID
from backend.database import get_session
from sqlalchemy.ext.asyncio import AsyncSession
from backend.models import Blueprint

router = APIRouter()

class ResolverRequest(BaseModel):
    date: str
    time: str
    lat: float
    lon: float

@router.post("/")
async def resolve_blueprint(
    request: ResolverRequest,
    user_id: UUID = Depends(get_current_user),
    session: AsyncSession = Depends(get_session)
):
    result = resolver_service.resolve_blueprint(
        request.date, request.time, request.lat, request.lon
    )

    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])

    # Save Blueprint?
    # prompt says "Build ... backend that exposes resolver"
    # Usually we save it.

    blueprint = Blueprint(user_id=user_id, data=result)
    session.add(blueprint)
    await session.commit()
    await session.refresh(blueprint)

    return {"id": str(blueprint.id), "data": result}
