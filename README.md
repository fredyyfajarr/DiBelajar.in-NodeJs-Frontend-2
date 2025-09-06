# Frontend Proyek LMS "DiBelajar.in"

Ini adalah bagian frontend dari aplikasi Learning Management System (LMS) "DiBelajar.in". Dibangun menggunakan React (dengan Vite), aplikasi ini menyediakan antarmuka pengguna yang dinamis, responsif, dan kaya fitur untuk semua peran: pengunjung, siswa, instruktur, dan admin.

---

### ✨ Fitur Utama

* ⚛️ **Modern UI & Tooling**: Antarmuka modern dan bersih dibangun dengan React & Vite.
* 💅 **Desain Responsif**: Styling konsisten dan responsif di semua perangkat menggunakan Tailwind CSS.
* 🚀 **State Management Terpusat**: Manajemen state global yang efisien menggunakan Zustand untuk otentikasi, modal, dan data pengguna.
* 🔄 **Data Fetching Cerdas**: Pengambilan, *caching*, dan sinkronisasi data dari backend secara efisien menggunakan React Query (`@tanstack/react-query`).
* 🛣️ **Routing Dinamis**: Navigasi sisi klien yang canggih dengan React Router, termasuk rute terproteksi dan rute berbasis peran (*role-based*).
* 🎭 **Dasbor Berbasis Peran**: Tampilan dasbor dan fungsionalitas yang berbeda dan disesuaikan untuk Admin, Instruktur, dan Siswa.
* ✨ **Animasi Halus**: Peningkatan pengalaman pengguna dengan animasi yang mulus di seluruh aplikasi menggunakan Framer Motion.
* 📝 **Fitur Interaktif Lengkap**:
    * Modal dinamis untuk Login, Register, dan semua operasi CRUD (Kursus, Materi, Pengguna, Kategori).
    * Formulir interaktif dengan validasi *real-time* menggunakan React Hook Form.
    * Fitur untuk mendaftar kursus, mengunggah tugas, mengerjakan tes, dan forum diskusi berantai.
    * Sistem ulasan dan rating kursus.
    * Halaman profil pengguna yang dapat diedit.
    * Filter kursus berdasarkan kategori dinamis.
    * Sistem notifikasi real-time di navbar.

---

### 💻 Teknologi yang Digunakan

* **Library/Framework**: React.js
* **Build Tool**: Vite
* **Styling**: Tailwind CSS
* **State Management**: Zustand
* **Data Fetching**: React Query (`@tanstack/react-query`)
* **Routing**: React Router DOM
* **Animasi**: Framer Motion
* **Formulir**: React Hook Form
* **Lainnya**: Axios, Froala Editor (WYSIWYG)

---

### 🚀 Instalasi dan Setup

1.  **Clone repository ini:**
    ```bash
    git clone [URL_REPOSITORY_ANDA]
    cd dibelajar.in-nodejs-frontend
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

---

### ©️ Lisensi & Copyright

Copyright (c) 2025 Fredy Fajar Adi Putra. Seluruh hak cipta dilindungi.
