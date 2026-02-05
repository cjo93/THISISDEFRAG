from fastapi import APIRouter, Depends
from pydantic import BaseModel
from backend.services.inversion import inversion_service
from backend.deps import get_current_user
from uuid import UUID
from backend.database import get_session
from sqlalchemy.ext.asyncio import AsyncSession
from backend.models import InversionOutcome

router = APIRouter()

class InversionRequest(BaseModel):
    text: str

@router.post("/")
async def perform_inversion(
    request: InversionRequest,
    user_id: UUID = Depends(get_current_user),
    session: AsyncSession = Depends(get_session)
):
    result = inversion_service.perform_shadow_inversion(request.text)

    outcome = InversionOutcome(
        user_id=user_id,
        input_text=request.text,
        shadow_identified=result["identified_pattern"],
        protocol_generated=result
    )
    session.add(outcome)
    await session.commit()
    await session.refresh(outcome)

    return result
