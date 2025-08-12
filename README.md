# 🚗 RoadRemote – Roadside Rescue Platform

## 📖 Introduction
RoadRemote is a **community-powered roadside emergency assistance platform** that connects stranded drivers with nearby garages and volunteers.  
It makes roadside emergencies **safer, smarter, and simpler** through location-based help, AI guidance, and community collaboration.

---

## 🎯 Objective
To provide **quick, reliable, and accessible** roadside help for everyone — not just those with premium insurance.  
RoadRemote bridges the gap between **drivers in distress** and **helpers nearby**, ensuring help arrives as fast as possible.

---

## ✨ Features
- 📍 **Assistance Requests** – Drivers can request immediate roadside help.
- 🛠 **Role Selection** – Choose to sign in as a Driver, Garage, or Volunteer.
- 🔍 **Find Nearby Help** – View available volunteers and garages based on your location.
- 🗓 **Volunteer Availability** – Volunteers can set their available hours, skills, and tools.
- 📊 **Real-Time Request Tracking** – Step-by-step status updates from request initiation to completion.
- 🤖 **AI Assistant** – Guided support for drivers during emergencies.

---

## 🛠 Tech Stack
- **Frontend:** Next.js, React  
- **Styling:** Tailwind CSS  
- **Backend:** Firebase Cloud Functions  
- **Database:** Firebase Realtime Database  
- **Authentication:** Firebase Authentication (Role-based)  
- **AI Integration:** Gemini API  
- **Location Services:** Google Maps API  

---

## 🏗 How We Built It
- Designed a **clean and responsive UI** with Next.js + Tailwind CSS.
- Implemented **role-based authentication** using Firebase Auth.
- Managed user availability, service requests, and request status with Firebase Realtime Database.
- Integrated **AI chatbot** to guide users during emergencies.
- Used Google Maps API for **location-based volunteer/garage discovery**.



📸 Screenshots

<img width="1861" height="820" alt="remote1" src="https://github.com/user-attachments/assets/bd10a0f1-8507-460d-863f-10bea0f521b5" />


<img width="1855" height="802" alt="road2" src="https://github.com/user-attachments/assets/8d5c66fc-a11b-4186-9831-b0fcd59be005" />


<img width="1031" height="898" alt="road3" src="https://github.com/user-attachments/assets/b4bbe4b5-0f74-4c4f-8184-2f77eb61ed67" />


🚀 Installation
bash
Copy
Edit
# Clone the repository
git clone https://github.com/ThrupthiBhandary/RoadRemote.git
cd RoadRemote

# Install dependencies
npm install

# Add Firebase config in `.env.local` file

# Run development server
npm run dev
