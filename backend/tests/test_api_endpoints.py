import pytest
from starlette.testclient import TestClient
from app.main import app

@pytest.fixture(scope="module")
def client():
    with TestClient(app) as c:
        yield c

def test_health_check_endpoint(client):
    resp = client.get("/api/v1/health")
    assert resp.status_code == 200
    data = resp.json()
    assert data["status"] == "healthy"

def test_articles_list_and_detail(client):
    resp = client.get("/api/v1/articles")
    assert resp.status_code == 200
    articles = resp.json()
    assert len(articles) > 0
    first_slug = articles[0]["slug"]

    detail_resp = client.get(f"/api/v1/articles/{first_slug}")
    assert detail_resp.status_code == 200
    detail = detail_resp.json()
    assert detail["slug"] == first_slug
    assert "why_it_matters" in detail
    assert "claim_citations" in detail
    assert len(detail["claim_citations"]) > 0

def test_knowledge_graph_endpoint(client):
    resp = client.get("/api/v1/graph")
    assert resp.status_code == 200
    graph = resp.json()
    assert "nodes" in graph
    assert "links" in graph
    assert graph["total_nodes"] > 0
    assert graph["total_links"] > 0

def test_hybrid_search_and_qa(client):
    resp = client.get("/api/v1/search?q=confirmation%20bias")
    assert resp.status_code == 200
    data = resp.json()
    assert "articles" in data
    assert "qa_synthesis" in data
    assert data["qa_synthesis"] is not None
    assert "citations" in data["qa_synthesis"]

def test_study_plan_endpoint(client):
    resp = client.get("/api/v1/study/plans")
    assert resp.status_code == 200
    plans = resp.json()
    assert len(plans) > 0
    assert plans[0]["total_weeks"] == 12
    assert len(plans[0]["weeks"]) == 12

def test_admin_metrics_endpoint(client):
    resp = client.get("/api/v1/admin/metrics")
    assert resp.status_code == 200
    metrics = resp.json()
    assert metrics["total_articles"] >= 5
    assert metrics["total_verified_citations"] >= 5
    assert metrics["total_registered_sources"] >= 5
