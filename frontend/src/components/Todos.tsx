import React, { useEffect, useState, createContext, useContext } from "react";
import { Container, Input, Stack, Box, Flex, Text, Button } from "@chakra-ui/react";

interface Todo {
    id: string;
    item: string;
}

const TodosContext = createContext({
    todos: [] as Todo[],
    fetchTodos: () => {}
});

export default function Todos() {
    const [todos, setTodos] = useState<Todo[]>([]);

    const fetchTodos = async () => {
        try {
            const response = await fetch("http://localhost:8000/todo");
            const data = await response.json();
            setTodos(data.data || []); // Pastikan fallback ke array kosong
        } catch (e) {
            console.error("Koneksi ke backend gagal. Pastikan server port 8000 nyala.");
        }
    };

    useEffect(() => { fetchTodos(); }, []);

    // FUNGSI DELETE
    const deleteTodo = async (id: string) => {
        await fetch(`http://localhost:8000/todo/${id}`, { method: "DELETE" });
        fetchTodos();
    };

    // FUNGSI UPDATE
    const updateTodo = async (id: string, currentItem: string) => {
        const val = prompt("Edit tugas:", currentItem);
        if (val && val !== currentItem) {
            await fetch(`http://localhost:8000/todo/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ item: val })
            });
            fetchTodos();
        }
    };

    return (
        <TodosContext.Provider value={{ todos, fetchTodos }}>
            <Container maxW="md" pt="50px">
                <Text fontSize="2xl" fontWeight="bold" mb="5">Daftar Tugas</Text>
                
                <AddTodo />

                <Stack gap={3} mt="5">
                    {todos.map((todo) => (
                        <Flex key={todo.id} p="3" shadow="sm" borderWidth="1px" borderRadius="md" justify="space-between" align="center">
                            <Text>{todo.item}</Text>
                            <Flex gap="2">
                                <Button size="xs" colorScheme="green" onClick={() => updateTodo(todo.id, todo.item)}>Edit</Button>
                                <Button size="xs" colorScheme="red" onClick={() => deleteTodo(todo.id)}>Hapus</Button>
                            </Flex>
                        </Flex>
                    ))}
                </Stack>
            </Container>
        </TodosContext.Provider>
    );
}

function AddTodo() {
    const [item, setItem] = useState("");
    const { fetchTodos } = useContext(TodosContext);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!item) return;

    const newTodo = {
      // Gunakan string untuk ID agar konsisten dengan data awal di api.py
      "id": String(Date.now()), 
      "item": item
    };

    try {
        const response = await fetch("http://localhost:8000/todo", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTodo)
        });

        if (response.ok) {
            setItem(""); // Kosongkan input
            fetchTodos(); // PANGGIL ULANG DATA DARI SERVER
        }
    } catch (error) {
        console.error("Gagal menambah todo:", error);
    }
};

    return (
        <form onSubmit={handleSubmit}>
            <Flex gap="2">
                <Input value={item} onChange={(e) => setItem(e.target.value)} placeholder="Tambah tugas baru..." />
                <Button type="submit" colorScheme="teal">Tambah</Button>
            </Flex>
        </form>
    );
}