# Weboldal – Frontend

Ez a repository a weboldal frontend részét tartalmazza. Az alábbi útmutató segítségével letöltheti és elindíthatja a projektet lokális környezetben.

---

## 📥 Frontend letöltése

1. Klónozza vagy töltse le a repository-t a GitHub-ról.
2. Nyisson meg egy terminált a projekt mappájában.
3. Navigáljon a **mozifront** mappába:

```bash
cd mozifront
```

---

## 📦 Függőségek telepítése

A frontend működéséhez szükséges csomagok telepítéséhez futtassa az alábbi parancsot:

```bash
npm install axios react jwt-decode react-dom react-router-dom
```

---

## ▶️ Frontend indítása

A fejlesztői szerver indításához futtassa:

```bash
npm run dev
```

Sikeres indítás esetén a terminálban az alábbi jelenik meg:

```
Local:   http://localhost:5173/
```

---

## 🌐 Alkalmazás megnyitása

1. Nyissa meg a böngészőt.
2. Lépjen a következő címre:

```
http://localhost:5173/
```

Innen már használható az alkalmazás.

---

## 🛠 Használt technológiák

- React
- React Router
- Axios
- JWT Decode
- Vite

---

## 📌 Megjegyzés

A frontend megfelelő működéséhez győződjön meg róla, hogy a **backend szerver is fut** (alapértelmezetten `http://localhost:3001`).
