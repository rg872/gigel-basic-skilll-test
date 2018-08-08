# gigel-basic-skilll-test
### Simple REST api with dashboard

Sistem ini saya buat untuk melewati tes basic skill developer Gigel.id

## Cara menggunkan (kontak saya untuk env-nya)
1. Clone repository ini di komputer kamu
1. Di dalam folder server, buka terminal dan jalankan command "npm start" untuk menjalankan server
1. Di dalam folder client, buka terminal dan jalankan command "npm start" untuk menjalankan client
1. Daftarkan akun baru dengan memasukan nama, email, password, nomor handphone dan gambar profil kamu
1. Email tidak bisa sama dengan akun lain dan password harus terdiri dari setidaknya 1 huruf, 1 angka dan panjang 8 karakter
1. Jika berhasil mendaftar, kamu akan mendapat email selamat datang dari saya
1. Setelah masuk ke halaman utama, terdapat 2 menu yaitu dashboard dan ganti password
1. Di menu dashboard kamu dapat mengganti data kamu dengan menekan tombol ganti
1. Ganti data yang kamu ingin ganti lalu tekan ganti, tekan batal jika kamu berubah pikiran
1. Di menu ganti password kamu dapat mengganti password kamu
1. Masukan password lama kamu dan password yang baru

## Stack yang saya gunakan adalah:

### Frontend
1. Vue.js
1. Vuex (state management)
1. Vue-router (client side routing)
1. Axios (http request)
1. Bulma (css framework)

### Backend
1. Express.js
1. @google-cloud/storage + multer (upload image)
1. Jsonwebtoken
1. Bcryptjs (encrypt password)
1. Nodemailer (send email after register)
1. Cors (whitelist)
1. Mongoose (mongoDB odm)

## API Endpoint

Endpoint | Method | Description
---------|--------|------------
/ | GET | Untuk melihat apakah api berjalan
/users/register | POST | Registrasi user
/users/login | POST | Login user
/users | PUT | Update data user
/users/pass | PUT | Update password user
/users/token | GET | Untuk verify token user



