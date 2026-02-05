from sqlmodel import SQLModel, create_engine
from backend.models import User, Lineage, Blueprint, VectorState, EntropyEvent, InversionOutcome, Experiment, SEDAEvent, SubscriptionEvent

# Hack to print DDL
import io
from sqlalchemy.schema import CreateTable
from sqlalchemy.dialects import postgresql

def generate_ddl():
    engine = create_engine("postgresql://")
    metadata = SQLModel.metadata

    # Sort tables by dependency (naive approach or just use metadata.sorted_tables)
    for table in metadata.sorted_tables:
        print(CreateTable(table).compile(engine, dialect=postgresql.dialect()))
        print(";")

if __name__ == "__main__":
    generate_ddl()
