# Proiect-Tehnologii-Web-Echipa-3D-

# SPECIFICATII DETALIATE ȘI PLAN DE PROIECT

## SPECIFICATII DETALIATE

### Workflow:

1. Ai o pagina unde alegi daca esti profesor sau student.
2. Daca esti profesor generezi automat un cod de activitate, daca esti student ai optiunea sa introduci codul unei activitati.

### Profesor:

- Partea superioara a aplicatiei unde se desfasoara activitatea.
- Dedesubt un log anonim unde poti vedea data unei reactii si tipul de reactie/feedback (o reactie din 4).

### Student:

- Partea de sus a ecranului e activitatea.
- Partea de jos un UI cu cele 4 reactii, care este mereu prezent si nu se schimba pe durata activitatii.

### Sfarsit activitate:

#### Pentru studenti:

1. Pot da un feedback final (overall rating)
   sau
2. Activitatea se incheie fara feedback final.

#### Pentru profesor:

- Profesorul se intoarce la home screen.
- Log-ul cu feedback continuu este salvat într-un fisier.

---

## DESCRIERI DETALIATE INTERFETE

### LOGIN SCREEN:

- Nume + parola + radio profesor/student.
- Validare și redirect la Home.

### HOME SCREEN PROFESOR:

- Textbox pentru numele activitatii.
- Buton „Start activitate”.
- Cod generat automat + data crearii.
- Redirect spre interfata activitate.
- Istoric activitati trecute + rating-urile lor.

### HOME SCREEN STUDENT:

- Input pentru codul activitatii.
- Validare daca exista si este activa.

### ACTIVITATE PROFESOR:

- Partea superioara: activitatea propriu-zisa.
- Partea inferioara (1/4): feedback continuu tip chat (data + tip).
- Buton „Incheie activitate”.

### ACTIVITATE STUDENT:

- Partea superioara: activitatea profesorului.
- Partea inferioara: cele 4 butoane de feedback.

### SFARSIT ACTIVITATE PROFESOR:

- Buton pentru download log.
- Statistici bazate pe feedback-ul continuu (optional descarcabile).
- Buton de revenire la Home.

### SFARSIT ACTIVITATE STUDENT:

- Rating final 0–5.
- Buton de revenire la Home.

---

## PLAN DE PROIECT

### Obiectiv general:

Implementarea unei aplicatii profesor–student cu feedback in timp real, backend REST, baza de date relationala si frontend SPA.

### Tehnologii:

- Frontend: React.js
- Backend: Node.js + Express
- ORM: ??
- Baza de date: PostgreSQL / MySQL
- Git: repository cu commit-uri incrementale
- Deploy: Azure / AWS / Render

### Functionalitati principale:

- Login + roluri
- Creare / join activitate
- Trimitere feedback continuu
- Salvare log
- Statistici finale
- Feedback final student
- Istoric activitati profesor
# Proiect-Tehnologii-Web-Echipa-3D-


