# Aplicație de Feedback Continuu

🚀 **[Demo Live](https://proiect-tehnologii-web-echipa-3d-1.onrender.com)**

Aplicație web care permite studenților să ofere feedback continuu în timpul cursurilor, iar profesorilor să vizualizeze acest feedback în timp real și să deseneze pe un whiteboard colaborativ.

## Descriere

Proiectul este o aplicație de tip Single Page Application (SPA) care facilitează interacțiunea dintre profesor și studenți prin intermediul unui sistem de emoticoane și un whiteboard colaborativ.

## Funcționalități

### Autentificare
- **Înregistrare și Login** cu username și parolă
- **Roluri**: Profesor sau Student
- **Sesiuni persistente** - utilizatorii rămân logați și păstrează istoricul
- **Protecție rute** - studenții nu pot accesa pagini de profesor și invers
- **Header utilizator** - afișează userul logat și buton de logout

### Pentru Profesor
- **Creare activitate** cu nume, descriere (opțional) și durată în minute
- **Cod unic** generat pentru fiecare activitate
- **Încheiere automată** după expirarea timpului setat
- **Dashboard live** cu feedback în timp real
- **Istoric activități** - vizualizare activități anterioare
- **Whiteboard colaborativ** - desenare cu:
  - Brush (creion) pentru desenat
  - Eraser (gumă) pentru șters
  - Slider pentru mărimea pensulei
  - Buton Clear pentru ștergere totală

### Pentru Student
- **Participare** prin introducerea codului activității
- **Vizualizare whiteboard** în timp real (ce desenează profesorul)
- **Feedback instant** cu 4 emoticoane:
  - 😊 Happy (fericit)
  - 😟 Unhappy (nefericit)
  - 😮 Surprised (surprins)
  - 😕 Confused (confuz)
- **Timer** cu timpul rămas până la încheierea activității

### Comunicare Real-Time
- **Socket.IO** pentru sincronizare instant între profesor și studenți
- **Desenul se sincronizează** în timp real - toți studenții văd ce desenează profesorul
- **Noii participanți** primesc instant starea curentă a whiteboard-ului
- **Feedback live** - profesorul vede reacțiile imediat

## Tehnologii Utilizate

### Front-end (Client)
- **Vite + React** - Framework pentru interfața utilizator
- **Vanilla CSS** - Stilizare semantic cu CSS variables
- **Socket.IO Client** - Comunicare în timp real
- **Lucide React** - Set de iconițe moderne
- **Canvas API** - Pentru whiteboard

### Back-end (Server)
- **Node.js + Express** - Server web și API REST
- **SQLite** - Bază de date relațională
- **Sequelize ORM** - Interacțiune cu baza de date
- **Socket.IO** - Funcționalități real-time

## Structura Bazei de Date

- **User**: `id`, `username`, `password`, `role`
- **Activity**: `id`, `code`, `name`, `description`, `durationMinutes`, `professorId`, `isActive`, `createdAt`
- **Feedback**: `id`, `activityCode`, `type`, `timestamp`

## Instalare și Rulare

### 1. Pornire Server (Back-end)

```bash
cd server
npm install
npm start
```

Mesaje așteptate:
- `Database synced`
- `Server is running on port 5000`

### 2. Pornire Client (Front-end)

```bash
cd client
npm install
npm run dev
```

Accesați link-ul afișat (ex: `http://localhost:5173`) în browser.

## Deployment

Aplicația este pregătită pentru deployment pe **Render.com**:

### Backend (Web Service)
- **Root Directory**: `server`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

### Frontend (Static Site)
- **Root Directory**: `client`
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `dist`
- **Environment Variable**: `VITE_API_URL` = URL-ul backend-ului deployat

## Utilizare

### Pentru Profesor
1. **Înregistrare/Login** cu username, parolă și rol "Professor"
2. **Creare Activitate**: Introduceți Numele, Descriere (opțional), Durata în minute
3. **Distribuiți Codul** studenților
4. **Desenați pe Whiteboard** - studenții văd în timp real
5. **Urmăriți Feedback-ul** în panoul din dreapta
6. Activitatea se închide automat sau manual cu "End Activity"

### Pentru Student
1. **Înregistrare/Login** cu username, parolă și rol "Student"
2. **Introduceți Codul** activității primite de la profesor
3. **Vizualizați Whiteboard-ul** - vedeți ce desenează profesorul
4. **Trimiteți Feedback** apăsând pe emoticoane
5. După expirarea activității, nu mai puteți trimite feedback
