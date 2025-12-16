---
description: Manual Testing Workflow for User-Bartender Integration
---

# Manual Testing Workflow: Platform Integration

This workflow guides you through testing the complete interaction between the User Platform and the Bartender Platform, ensuring they share the same database and communicate correctly.

## Prerequisites

- **Database:** Ensure `platform_db` exists and both `.env` files point to it.
- **Servers:** Run both `user/backend` (Port 3000) and `bartender/backend` (Port 4000).

---

## Phase 1: Bartender Setup (The "Provider")

### 1. Register a Bartender

- **Action:** Open Postman or API Client.
- **Endpoint:** `POST http://localhost:4000/api/auth/register`
- **Body (JSON):**
  ```json
  {
    "name": "Alex Mixologist",
    "email": "alex@bar.com",
    "password": "password123",
    "phoneNo": "9876543210"
  }
  ```
- **Verify:** Returns `201 Created` and a token.
- **Note:** Keep the ID (e.g., `1`) handy.

### 2. Login as Bartender (To get Token)

- **Endpoint:** `POST http://localhost:4000/api/auth/login`
- **Body (JSON):**
  ```json
  {
    "email": "alex@bar.com",
    "password": "password123"
  }
  ```
- **Verify:** Save the `token` from the response as `BARTENDER_TOKEN`.

### 3. Create Bartender Profile (Questionnaire)

- **Endpoint:** `POST http://localhost:4000/api/questionnaire`
- **Headers:** `Authorization: Bearer <BARTENDER_TOKEN>`
- **Body (JSON):**
  ```json
  {
    "fullName": "Alex Mixologist",
    "email": "alex@bar.com",
    "phoneNo": "9876543210",
    "yearsExperience": 5,
    "specialtyDrinks": ["Mojito", "Old Fashioned"],
    "certifications": ["Certified Mixologist"],
    "bio": "Expert in craft cocktails and flair bartending.",
    "location": "New York",
    "hourlyRate": 100,
    "workPreferences": ["Weddings", "Private Parties"],
    "equipmentProvided": true
  }
  ```
- **Verify:** Returns success. This makes the bartender visible to users.

---

## Phase 2: User Setup (The "Client")

### 4. Register a User

- **Endpoint:** `POST http://localhost:3000/user/auth/register`
- **Body (JSON):**
  ```json
  {
    "name": "Vinay Client",
    "email": "vinay@client.com",
    "password": "password123",
    "phoneNo": "1234567890"
  }
  ```
- **Verify:** Returns `201 Created`.

### 5. Login as User

- **Endpoint:** `POST http://localhost:3000/user/auth/login`
- **Body (JSON):**
  ```json
  {
    "email": "vinay@client.com",
    "password": "password123"
  }
  ```
- **Verify:** Save the `token` from the response as `USER_TOKEN`.

### 6. Verify Bartender Visibility

- **Action:** Check if the user can see Alex.
- **Endpoint:** `GET http://localhost:3000/user/bartenders`
- **Headers:** `Authorization: Bearer <USER_TOKEN>`
- **Verify:** Response should include "Alex Mixologist". Note their `id` (e.g., `1`).

---

## Phase 3: The Interaction (Booking Flow)

### 7. Create an Event (Booking Draft)

- **Endpoint:** `POST http://localhost:3000/user/bookings`
- **Headers:** `Authorization: Bearer <USER_TOKEN>`
- **Body (JSON):**
  ```json
  {
    "name": "Vinay Client",
    "email": "vinay@client.com",
    "phone": "1234567890",
    "eventType": "Birthday Party",
    "eventDate": "2025-05-20",
    "eventStartTime": "19:00",
    "eventEndTime": "23:00",
    "barServiceDuration": 4,
    "totalGuests": 50,
    "adultGuests": 45,
    "minorGuests": 5,
    "fullAddress": "123 Party Lane, NY",
    "city": "New York",
    "state": "NY",
    "pinCode": "10001",
    "preferredAtmosphere": ["Casual/Relaxed"],
    "venueType": "Private Residence (Home)",
    "parkingAvailable": true,
    "parkingType": "4 wheeler",
    "elevatorAccess": true,
    "barTableAvailable": true,
    "powerOutletAvailable": true,
    "waterSourceAvailable": true
  }
  ```
- **Verify:** Returns a Booking object. Save the `id` as `BOOKING_ID` (e.g., `1`).

### 8. Send Request to Bartender

- **Endpoint:** `POST http://localhost:3000/user/bookings/request`
- **Headers:** `Authorization: Bearer <USER_TOKEN>`
- **Body (JSON):**
  ```json
  {
    "bookingId": 1,
    "bartenderId": 1,
    "offeredAmount": 150
  }
  ```
  _(Replace IDs with actual values from previous steps)_
- **Verify:** Returns "Request sent successfully".

---

## Phase 4: Closing the Loop (Bartender Response)

### 9. Bartender Checks Requests

- **Endpoint:** `GET http://localhost:4000/bartender/bookings/requests`
- **Headers:** `Authorization: Bearer <BARTENDER_TOKEN>`
- **Verify:** Response should contain the request with `status: "PENDING"`.

### 10. Bartender Accepts Request

- **Endpoint:** `POST http://localhost:4000/bartender/bookings/requests/:id/accept`
  - _Note:_ Replace `:id` with the Request ID found in Step 9.
- **Headers:** `Authorization: Bearer <BARTENDER_TOKEN>`
- **Body (JSON):** `{"status": "ACCEPTED"}` (or empty, logic usually defaults to accept)
- **Verify:** Returns success message and updates status.

---

**Done!** If all steps pass, your Shared Database architecture is fully functional.
