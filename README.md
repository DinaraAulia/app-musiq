# 🎧 OpenMusic API

## 🌟 Overview

Proyek **OpenMusic API** adalah implementasi *Back-End* yang dikembangkan sebagai kontribusi untuk **Technical Steering Committee (TSC)** platform pemutar musik terbuka, OpenMusic. API ini dirancang untuk mendukung aplikasi musik berlisensi gratis, dengan fokus pada *scalability*, keamanan, dan manajemen konten (Album, Lagu, Playlist, dan Kolaborasi).

Proyek ini berevolusi melalui tiga versi utama, masing-masing menambahkan kompleksitas dan fitur tingkat industri, mulai dari manajemen data dasar hingga implementasi *server-side caching* dan *message broker*.

## 🛠️ Teknologi Back-End

* **Bahasa Pemrograman:** JavaScript (Node.js)
* **Framework:** Hapi
* **Database:** PostgreSQL
* **ORMs/Libraries:** node-postgres, Joi
* **Autentikasi:** JSON Web Tokens (JWT)
* **Caching:** Redis
* **Message Broker:** RabbitMQ

## 🛣️ Evolusi API: Fitur Utama per Versi

### Versi 1: CRUD Dasar & Manajemen Konten

Fokus utama adalah menyediakan *endpoint* dasar untuk manajemen konten Album dan Lagu, memungkinkan aplikasi OpenMusic untuk menyimpan dan memanipulasi data inti.

| Fitur | Deskripsi Teknis |
| :--- | :--- |
| **Album Management** | *Endpoint* **CRUD** (Create, Read, Update, Delete) untuk Album. |
| **Song Management** | *Endpoint* **CRUD** untuk Lagu, dengan relasi yang terhubung ke Album. |
| **Data Validation** | Implementasi *payload validation* menggunakan **Joi** (atau sejenisnya) pada setiap permintaan untuk memastikan integritas data. |
| **Custom Error Handling** | Pengelolaan kesalahan khusus untuk *resource* tidak ditemukan (404), *bad request* (400), dll. |

### Versi 2: Autentikasi, Otorisasi, dan Playlist Pribadi

Pengembangan API ditingkatkan untuk mengatasi isu *management* lagu yang kompleks dengan memperkenalkan fitur Playlist pribadi, yang memerlukan lapisan keamanan yang kuat.

| Fitur | Deskripsi Teknis |
| :--- | :--- |
| **User Authentication** | Implementasi alur kerja **JWT (JSON Web Tokens)** untuk pendaftaran dan *login* pengguna. |
| **Private Playlists** | *Endpoint* **Playlist CRUD** dengan otorisasi, di mana *playlist* hanya dapat dikelola oleh pengguna yang membuatnya (**Ownership-Based Authorization**). |
| **Playlist Songs** | *Endpoint* untuk menambahkan, melihat, dan menghapus lagu dari *playlist* tertentu. |
| **Access Control** | Menerapkan *middleware* atau *pre-handler* untuk memverifikasi token dan hak akses pengguna pada setiap *resource* pribadi. |
| **Collaborations (Opsional)** | Implementasi fitur kolaborasi yang memungkinkan pemilik *playlist* menambahkan pengguna lain sebagai kolaborator. |

### Versi 3: Server-Side Caching, Message Broker, dan Upload File

Versi final yang berfokus pada *performance optimization* dan penambahan fitur *utility* untuk kenyamanan pengguna.

| Fitur | Deskripsi Teknis |
| :--- | :--- |
| **Server-Side Caching** | Implementasi **Redis** (atau solusi *caching* lainnya) untuk menyimpan *response* dari *query* yang sering diakses (terutama data *playlist*) untuk mengurangi beban *database* dan mempercepat waktu respons. |
| **Export Playlist** | Implementasi **Message Broker (RabbitMQ/AWS SQS)** untuk menjalankan proses **ekspor daftar lagu** secara asinkron. *Client* mengirim permintaan, dan *response* dikirimkan via *email*. |
| **Album Cover Upload** | Menerapkan *storage service* untuk menangani *file upload* gambar sampul album (menggunakan AWS S3 atau *local storage*). |
| **Transactions & Isolation** | Memastikan operasi *write* ke *database* dilakukan secara aman (misal: *database transactions* untuk operasi kompleks). |

## 💻 Instalasi dan Konfigurasi

Untuk menjalankan API ini secara lokal, ikuti langkah-langkah berikut:

### Persyaratan

* Node.js (v18 atau lebih baru)
* PostgreSQL (atau *database* yang Anda gunakan)
* Redis (untuk *caching*)
* Message Broker (misal: RabbitMQ)

### Langkah-langkah

1.  **Clone Repositori:**
    ```bash
    git clone [https://github.com/DinaraAulia/app-musiq.git](https://github.com/DinaraAulia/app-musiq.git)
    cd app-musiq
    ```
2.  **Instal Dependensi:**
    ```bash
    npm install
    ```
3.  **Konfigurasi Environment Variables:**
    Buat file `.env` di *root* proyek dan isi dengan konfigurasi *database*, JWT, dan Redis Anda.
4.  **Jalankan Migrasi Database:**
    ```bash
    # Sesuaikan dengan command migrasi yang Anda gunakan (misal: node-pg-migrate)
    npm run migrate
    ```
5.  **Jalankan Aplikasi:**
    ```bash
    npm run start # Atau command start yang Anda gunakan
    ```

API akan berjalan di `http://localhost:[Port API Anda]`.

## 🤝 Kontribusi

Ini adalah proyek studi kasus. Meskipun demikian, saran dan *bug reports* selalu diterima. Silakan ajukan *Issues* atau *Pull Requests*.
