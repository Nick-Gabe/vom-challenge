from sqlalchemy import Column, Integer, String, JSON, DateTime
from sqlalchemy.sql import func
from dataclasses import dataclass
from . import Base


@dataclass
class Policy(Base):
    __tablename__ = 'policies'
    id: int = Column(Integer, primary_key=True)
    title: str = Column(String)
    edges: str = Column(JSON)
    nodes: str = Column(JSON)
    viewport: str = Column(JSON)
    created_at: DateTime = Column(
        DateTime(timezone=True), server_default=func.now())
    updated_at: DateTime = Column(DateTime(timezone=True), onupdate=func.now())


class Edge:
    id: str
    source: str
    target: str
    animated: bool
    label: str
    sourceHandle: str
    targetHandle: str


class NodePosition():
    x: int
    y: int


class NodeData():
    maxConnections: int
    isConnectable: bool
    parameter: str
    operation: str
    value: str
    decision: str
    text: str


class Node:
    id: str
    data: NodeData
    height: int
    position: NodePosition
    positionAbsolute: NodePosition
    type: str
    width: int
    deletable: bool
    selected: bool
    dragging: bool


class Viewport:
    x: int
    y: int
    zoom: int
