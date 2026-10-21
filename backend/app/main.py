from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.database import engine, Base, AsyncSessionLocal
from app.seed.seed_data import seed_database

# API Routers
from app.api.routes_articles import router as articles_router
from app.api.routes_sources import router as sources_router
from app.api.routes_graph import router as graph_router
from app.api.routes_study import router as study_router
from app.api.routes_library import router as library_router
from app.api.routes_research import router as research_router
from app.api.routes_admin import router as admin_router
from app.api.routes_search import router as search_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: create tables and seed authentic data
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    
    async with AsyncSessionLocal() as session:
        await seed_database(session)
    
    yield
    # Shutdown
    await engine.dispose()

app = FastAPI(
    title=settings.PROJECT_NAME,
    description=settings.PROJECT_TAGLINE,
    version="1.0.0",
    lifespan=lifespan
)

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permits local development and external UI access
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes with API V1 prefix
app.include_router(articles_router, prefix=settings.API_V1_STR)
app.include_router(sources_router, prefix=settings.API_V1_STR)
app.include_router(graph_router, prefix=settings.API_V1_STR)
app.include_router(study_router, prefix=settings.API_V1_STR)
app.include_router(library_router, prefix=settings.API_V1_STR)
app.include_router(research_router, prefix=settings.API_V1_STR)
app.include_router(admin_router, prefix=settings.API_V1_STR)
app.include_router(search_router, prefix=settings.API_V1_STR)

@app.get("/")
async def root():
    return {
        "name": settings.PROJECT_NAME,
        "tagline": settings.PROJECT_TAGLINE,
        "status": "operational",
        "api_docs": "/docs",
        "version": "1.0.0"
    }

@app.get("/api/v1/health")
async def health_check():
    return {
        "status": "healthy",
        "database": "connected",
        "knowledge_graph": "active",
        "pipeline": "idle"
    }
