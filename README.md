# FAST API X REACT
Aplikasi manajemen tugas (Todo List) sederhana yang dibangun menggunakan FastAPI sebagai Backend dan React (Chakra UI) sebagai Frontend.

🚀 Fitur
Create: Menambah tugas baru dengan ID unik.

Read: Menampilkan daftar tugas secara real-time dari server.

Update: Mengedit teks tugas yang sudah ada.

Delete: Menghapus tugas dari daftar.

Modern UI: Antarmuka responsif menggunakan Chakra UI v3.

🛠️ Teknologi yang Digunakan
Frontend: React.js, Vite, Chakra UI v3.

Backend: Python, FastAPI, Uvicorn.

Icons: React Icons (Lucide).

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/e49d76d4-180e-4603-870c-673e2c689daf" />

📦 Cara Instalasi
1. Persiapan Backend
Bash

# Masuk ke folder backend
cd backend

# Buat virtual environment (opsional)
python -m venv venv
source venv/bin/activate  # Untuk Windows: venv\Scripts\activate

# Jalankan server
uvicorn api:app --reload

Server akan berjalan di: http://localhost:8000

2. Persiapan Frontend
Bash

# Masuk ke folder frontend
cd frontend

# Install dependensi
npm install

# Jalankan aplikasi
npm run dev
Aplikasi akan berjalan di: http://localhost:5173
