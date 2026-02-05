from fastapi import Header, HTTPException
from typing import Optional
from uuid import UUID

async def get_current_user(x_user_id: Optional[str] = Header(None)) -> UUID:
    if not x_user_id:
        # Mock user for dev/testing if not provided
        # In production, verify Firebase token or similar
        return UUID("00000000-0000-0000-0000-000000000000")
    try:
        return UUID(x_user_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid User ID format")
