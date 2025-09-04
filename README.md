# Frontend Proyek LMS "DiBelajar.in"

Ini adalah bagian frontend dari aplikasi Learning Management System (LMS) "DiBelajar.in". Dibangun menggunakan React (dengan Vite), aplikasi ini menyediakan antarmuka pengguna yang dinamis dan responsif untuk semua peran: pengunjung, student, instruktur, dan admin.

---

### ✨ Fitur Utama

* ⚛️ **Modern UI**: Antarmuka modern dan bersih dibangun dengan React & Vite.
* 💅 **Styling**: Desain responsif menggunakan Tailwind CSS.
* 🚀 **State Management**: Manajemen state global yang efisien menggunakan Zustand untuk otentikasi dan state modal.
* 🔄 **Data Fetching**: Pengambilan dan *caching* data dari backend secara efisien menggunakan React Query (`@tanstack/react-query`).
* 🛣️ **Routing**: Navigasi sisi klien yang dinamis dengan React Router, termasuk rute terproteksi dan berbasis peran.
* 🎭 **Dasbor Berbasis Peran**: Tampilan dasbor yang berbeda dan fungsionalitas yang disesuaikan untuk Admin, Instruktur, dan Student.
* ✨ **Animasi Halus**: Peningkatan pengalaman pengguna dengan animasi yang halus menggunakan Framer Motion.
* 📝 **Fitur Interaktif**:
    * Modal dinamis untuk Login, Register, dan semua operasi CRUD.
    * Formulir interaktif dengan validasi *real-time* menggunakan React Hook Form.
    * Fitur untuk mendaftar kursus, mengunggah tugas, mengerjakan tes, dan forum diskusi dengan sistem balasan.

---

### 💻 Teknologi yang Digunakan

* **Library**: React.js
* **Build Tool**: Vite
* **Styling**: Tailwind CSS
* **State Management**: Zustand
* **Data Fetching**: React Query
* **Routing**: React Router DOM
* **Animasi**: Framer Motion
* **Lainnya**: Axios, React Hook Form

---

### 🚀 Instalasi dan Setup

1.  **Clone repository ini:**
    ```bash
    git clone [https://github.com/NAMA_USER_ANDA/proyek-lms-frontend.git](https://github.com/NAMA_USER_ANDA/proyek-lms-frontend.git)
    cd proyek-lms-frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Buat file `.env`** di dalam folder root `frontend`. File ini akan memberitahu aplikasi frontend di mana alamat server backend berada.

    ```env
    VITE_API_BASE_URL=http://localhost:3000/api
    ```

4.  **Jalankan server development:**
    ```bash
    npm run dev
    ```
    Aplikasi akan berjalan di `http://localhost:5173` (atau port lain yang tersedia).

---

### 📜 Skrip yang Tersedia

* `npm run dev`: Menjalankan aplikasi dalam mode development.
* `npm run build`: Mem-build aplikasi untuk production ke dalam folder `dist`.
* `npm run preview`: Menjalankan server lokal untuk melihat hasil production build.
