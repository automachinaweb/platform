# Chat System Testing Plan

This guide will help you verify the real-time chat functionality between the User and Bartender applications.

## 1. Start Support Services

Ensure your database is running and all 4 applications are started in separate terminals:

**Terminal 1 (User Backend - Port 3000)**

```bash
cd platform/user/backend
npm start
```

_Note: This hosts the Socket.io Server._

**Terminal 2 (Bartender Backend - Port 3001)**

```bash
cd platform/bartender/backend
npm start
```

**Terminal 3 (User Frontend - Port 8082)**

```bash
cd platform/user/frontend
npm run dev
```

**Terminal 4 (Bartender Frontend - Port 8080)**

```bash
cd platform/bartender/frontend
npm run dev
```

---

## 2. Seed Test Data (Required)

The chat system requires a valid **Booking Request (ID: 1)** and **Bartender (ID: 1)** to exist in the database. I created a helper endpoint to generate this for you.

Run this command in a new terminal:

```bash
curl -X POST http://localhost:3000/user/bookings/seed-test
```

_Expected Output:_ `{"message":"Seeded successfully","bookingId":1,"bartenderId":1}`

---

## 3. Verify Real-time Chat

### Step A: Open User Chat

1. Open your browser to: **[http://localhost:8082/chat/1](http://localhost:8082/chat/1)**
   - _Note: The `1` in the URL represents the Bartender ID._
2. You should see the chat interface with "Chat with Test Bartender" (or similar).

### Step B: Open Bartender Chat

1. Open a **new window/tab** (or Incognito) to: **[http://localhost:8080/chat/1](http://localhost:8080/chat/1)**
   - _Note: The `1` in the URL represents the Booking ID._
2. You should see "Chat with User".

### Step C: Test Messaging

1. **User -> Bartender:**
   - In User window, type `Hello Bartender!` and send.
   - It should appear instantly on the User screen (Right side).
   - Check the **Bartender window**. It should appear instantly on the Left side.

2. **Bartender -> User:**
   - In Bartender window, type `Hi User, how are you?` and send.
   - It should appear instantly on the Bartender screen (Right side).
   - Check the **User window**. It should appear instantly on the Left side.

---

## 4. Verify Persistence (History)

1. Close both browser tabs.
2. Re-open **[http://localhost:8082/chat/1](http://localhost:8082/chat/1)**.
3. You should see the previous conversation loaded from the database.

---

## 5. Troubleshooting

If messages are not appearing:

1. **Check Consoles:**
   - Open Developer Tools (`F12`) in both browsers.
   - Look for `"Socket received:"` or `"Bartender received:"` logs.
   - If you see `Connection Refused` or CORS errors, restart the **User Backend**.
2. **Check Database:**
   - If history doesn't load, ensure both `.env` files point to the same database (`platform_db`).
