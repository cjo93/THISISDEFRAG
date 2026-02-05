from typing import Optional, List, Dict, Any
from uuid import UUID, uuid4
from datetime import datetime
from sqlmodel import Field, SQLModel, Relationship
from sqlalchemy import Column, JSON

class User(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    email: str = Field(index=True, unique=True)
    stripe_customer_id: Optional[str] = Field(default=None, index=True)
    subscription_tier: str = Field(default="Free")  # Free, Pro, Lineage
    created_at: datetime = Field(default_factory=datetime.utcnow)

    blueprints: List["Blueprint"] = Relationship(back_populates="user")
    lineages: List["Lineage"] = Relationship(back_populates="creator")

class Lineage(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    name: str
    created_by: UUID = Field(foreign_key="user.id")
    members: List[Dict[str, Any]] = Field(default=[], sa_column=Column(JSON))
    created_at: datetime = Field(default_factory=datetime.utcnow)

    creator: Optional[User] = Relationship(back_populates="lineages")
    vector_states: List["VectorState"] = Relationship(back_populates="lineage")

class Blueprint(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    user_id: UUID = Field(foreign_key="user.id")
    data: Dict[str, Any] = Field(default={}, sa_column=Column(JSON))
    created_at: datetime = Field(default_factory=datetime.utcnow)

    user: Optional[User] = Relationship(back_populates="blueprints")

class VectorState(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    lineage_id: UUID = Field(foreign_key="lineage.id")
    vectors: List[Dict[str, Any]] = Field(default=[], sa_column=Column(JSON))
    voltage: int
    timestamp: datetime = Field(default_factory=datetime.utcnow)

    lineage: Optional[Lineage] = Relationship(back_populates="vector_states")

class EntropyEvent(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    user_id: UUID = Field(foreign_key="user.id")
    event_type: str
    payload: Dict[str, Any] = Field(default={}, sa_column=Column(JSON))
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class InversionOutcome(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    user_id: UUID = Field(foreign_key="user.id")
    input_text: str
    shadow_identified: str
    protocol_generated: Dict[str, Any] = Field(default={}, sa_column=Column(JSON))
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class Experiment(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    user_id: UUID = Field(foreign_key="user.id")
    name: str
    status: str
    results: Dict[str, Any] = Field(default={}, sa_column=Column(JSON))
    created_at: datetime = Field(default_factory=datetime.utcnow)

class SEDAEvent(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    user_id: UUID = Field(foreign_key="user.id")
    score: int
    tier: str
    action: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class SubscriptionEvent(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    user_id: Optional[UUID] = Field(default=None, foreign_key="user.id")
    stripe_event_id: str = Field(unique=True)
    event_type: str
    status: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
