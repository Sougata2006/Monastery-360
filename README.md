# Monastery360 – Digitizing & Showcasing Monasteries of Sikkim  

[![Website](https://img.shields.io/badge/Live-Demo-blue)](https://monastery360-rho.vercel.app/)  
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)  

## 📖 Problem Statement  

**ID:** 25061  
**Theme:** Travel & Tourism  
**Title:** *Digitize and Showcase Monasteries of Sikkim for Tourism and Cultural Preservation*  

Sikkim is home to over **200 monasteries**, many dating back to the 17th and 18th centuries. These monasteries are rich in history, art, and spiritual significance but face challenges such as:  

- Fragmented documentation (photos, tourism sites, archives).  
- Remote accessibility and poor connectivity.  
- Low global awareness compared to Ladakh, Bhutan, or Nepal.  
- Endangered cultural assets (murals, manuscripts, oral traditions).  

**Our Solution → Monastery360: A Digital Heritage Platform for Sikkim’s Monasteries**  

---

## 🌟 Key Features  

✅ **360° Virtual Tours** – Panoramic monastery interiors & surroundings.  
✅ **Narrated Walkthroughs** – Multilingual support (English, Hindi, Nepali, Tibetan).  
✅ **Interactive Map** – Geo-tagged monastery locations, travel routes, and nearby attractions.  
✅ **Digital Archives** – Manuscripts, murals, oral histories, AI-powered categorization.  
✅ **Smart Audio Guide App** – GPS/Bluetooth-based offline audio guide.  
✅ **Cultural Calendar** – Festivals, rituals, & events with booking options.  
✅ **Chatbot Assistant** – Multilingual tourist FAQ powered by AI.  
✅ **Offline Mode** – Cached tours, maps, and audio for remote use.  
✅ **Donation Support** – “Support Heritage” page for preservation funding.  

---

## 🖼️ Screenshots & Demo  

### 🌐 Landing Page  
![Landing Page Screenshot](./Gallery/Photos/LANDING.png)  

### 🏯 360° Virtual Tour  
![Virtual Tour Screenshot](./Gallery/Photos/360view.png)  

### 🗺️ Interactive Map  
![Map Screenshot](./Gallery/Photos/map.png)  

---

## 🧩 Tech Stack  

- **Frontend:** React.js, TailwindCSS  
- **3D/VR Rendering:** A-Frame / Three.js  
- **Maps & Geo Services:** Leaflet.js / Mapbox  
- **AI & Search:** Custom-trained models for categorization & chatbot  
- **PWA & Offline Support:** Service Workers  
- **Deployment:** Vercel  

---

## 📂 Project Structure  

```plaintext
Monastery360
│ 
├── Gallery/
│   ├── Photos/
│   │   ├── LANDING.png
│   │   ├── 360view.png
│   │   ├── culture1.jpg
│   │   ├── culture2.jpg
│   │   ├── Dubdi Monastery.jpg
│   │   ├── Enchey Monastery.jpg
│   │   ├── Hotel1.webp … Hotel10.webp
│   │   ├── manuscript1.png
│   │   ├── landscape1.jpg … landscape10.avif
│   │   └── more images...
│   │
│   ├── Videos/
│   │   ├── allround experience.mp4
│   │   ├── ManiMantraChanting.mp4
│   │   ├── VajraGuruMantra.mp4
│   │   └── video1.mp4
│   │
│   └── Audio/
│       ├── eveningprayer.mp3
│       ├── HeartSutraprayer.mp3
│       └── prayer1.mp3
│
├── scripts/
│   ├── donation.js
│   └── galary.js
│
├── src/
│   └── logo.png
│
├── index.html
├── galary.html
├── monasteries.html
├── donation.html
├── login.html
├── sign up.html
├── term.html
├── tourbooking.html
├── theme.css
├── theme.js
├── main.js
├── LICENSE
└── README.md
```

---

## 🚀 Getting Started: Run Locally  

Follow these steps to set up and run the project on your local machine for development and testing.  

### ✅ Prerequisites  

Make sure you have the following installed:  
- **Node.js** (LTS recommended) + npm  
  ```bash
  node -v
  npm -v
  ```
- **Git** (for cloning the repository)  
- **VS Code** or any modern code editor  
- **MongoDB Atlas** (for cloud database setup)  

---

### 🛠️ Installation & Setup  

#### 1️⃣ Clone the Repository  
```bash
git clone https://github.com/Sougata2006/Monastery360.git
cd monastery360
```

#### 2️⃣ Backend Setup  
```bash
cd backend
npm install
```
- Create a `.env` file in the backend folder:  
```env
MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/monasteryDB
```
- Replace `YOUR_USERNAME` and `YOUR_PASSWORD` with your MongoDB Atlas credentials.  

Run backend:  
```bash
node server.js
```

Expected output:  
```
Server running on http://localhost:5000
MongoDB connection established
```

#### 3️⃣ Frontend Setup  
```bash
cd ../frontend
npm install
npm start
```
This opens the app at **http://localhost:3000**  

---

## 🎮 Usage  

### 🌍 Public Website  
- Explore monasteries on the **interactive map**  
- Filter/search monasteries by tags  
- Click to view **detail pages** with history, images & 360° virtual tours  

### 🔑 Admin Panel (Prototype)  
- Accessible at **http://localhost:3000/admin**  
- Password protected (currently basic security)  
- Supports full **CRUD** (Create, Read, Update, Delete) for monastery data  

---

## 🛠️ Project Roadmap  

- [x] Core Website with Virtual Tour UI  
- [x] Initial Monastery Showcases  
- [x] AI-powered Archive Search  
- [ ] Multilingual Narration & Chatbot  
- [ ] Offline Smart Audio Guide  
- [x] Donation Page Integration  
- [ ] Partnerships with Sikkim Tourism  

---

## 👥 Team Members  

- **Sougata Paul** – [GitHub](https://github.com/Sougata2006)  
- **Tanmoy Nandi** – [GitHub](https://github.com/Tanmoy0575)  
- **Toufik Hasan** – [GitHub](https://github.com/Toufik-git)  
- **Rikh Samanta** – [GitHub](https://github.com/TheRikhSamanta)  
- **Srinil Layak** – [GitHub](https://github.com/Srinil0521)  
- **Suraiya Khatun** – [GitHub](https://github.com/Suraiya250)  

---

## 🎯 Impact  

- **Tourism Boost:** Easier access & promotion of Sikkim’s monasteries.  
- **Cultural Preservation:** Digital safeguarding of endangered assets.  
- **Community Empowerment:** Local participation in archives & events.  
- **Global Accessibility:** Students, researchers, and spiritual seekers worldwide.  

---

## 📜 License  
This project is licensed under the **MIT License**.  

<details>
<summary>📜 Click here to view full license</summary>

<br>

```text
MIT License

Copyright (c) 2025 Sougata Paul

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

</details>

---

## 🤝 How to Contribute  

We welcome contributions! To get started:  

1. Fork the repo.  
2. Create a new branch (`feature/xyz`).  
3. Commit changes with clear messages.  
4. Open a Pull Request.  

> Made with ❤️ by **Team CODE CATALYST**
