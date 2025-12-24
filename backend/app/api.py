from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:5173",
    "localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

todos = [
    {
        "id": "1",
        "item": "Pakai PC."
    },
    {
        "id": "2",
        "item": "Keliling kota."
    }
]

@app.get("/")
async def read_root():
    return {"message": "Welcome to your todo list"}

@app.get('/todo')
async def get_todos():
    return {"data": todos}

@app.post("/todo", tags=["todos"])
async def add_todo(todo: dict) -> dict:
    # todo yang diterima adalah dict berisi {"id": "...", "item": "..."}
    todos.append(todo)
    return {
        "data": "Todo ditambahkan."
    }
    
@app.put("/todo/{id}", tags=["todos"])
async def update_todo(id: str, data: dict):
    for todo in todos:
        if todo["id"] == id:
            todo["item"] = data["item"]
            return {"data": f"Todo dengan id {id} berhasil diupdate."}
    return {"error": "Item tidak ditemukan."}

@app.delete("/todo/{id}", tags=["todos"])
async def delete_todo(id: str):
    for todo in todos:
        if todo["id"] == id:
            todos.remove(todo)
            return {"data": f"Todo dengan id {id} berhasil dihapus."}
    return {"error": "Item tidak ditemukan."}