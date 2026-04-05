# 🚀 FutureYou.live

> **See who you become before it happens.**

FutureYou.live is an AI-powered web application that simulates multiple versions of your future based on your current habits, goals, career interests, and lifestyle choices. It transforms abstract decision-making into a visual, data-driven experience, helping users make smarter choices today.

---

## ✨ Features

* 🔮 **AI-Powered Future Simulation**
  Generate personalized 10-year life predictions using Google Gemini AI.

* 🧠 **Multiple Life Paths**
  Explore different versions of yourself:

  * Disciplined You
  * Distracted You
  * Balanced You

* ⏳ **Timeline Visualization**
  View key milestones across years (2025 → 2035).

* 📊 **Life Metrics Dashboard**
  Track:

  * Career Success
  * Financial Stability
  * Health & Vitality
  * Personal Fulfillment

* 🎨 **Modern UI/UX**
  Built with a futuristic design using Tailwind CSS and Framer Motion.

---

## 🛠️ Tech Stack

* **Frontend:** React + TypeScript + Vite
* **Styling:** Tailwind CSS
* **Animations:** Framer Motion
* **AI Integration:** Google Gemini API (@google/genai)

---

## 📂 Project Structure

```
src/
 ├── components/
 │   ├── Hero.tsx
 │   ├── Navbar.tsx
 │   ├── SimulationForm.tsx
 │   ├── PathVisualization.tsx
 │
 ├── services/
 │   └── geminiService.ts
 │
 ├── lib/
 │   └── utils.ts
 │
 ├── App.tsx
 ├── main.tsx
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
 git clone https://github.com/your-username/futureyou-live.git
 cd futureyou-live
```

### 2. Install dependencies

```bash
 npm install
```

### 3. Create `.env` file

```env
VITE_GEMINI_API_KEY=your_api_key_here
```

> ⚠️ Do NOT expose your API key publicly.

### 4. Run the development server

```bash
npm run dev
```

---

## 🧪 How It Works

1. User inputs:

   * Daily habits
   * Long-term goals
   * Career interests
   * Lifestyle choices

2. The app sends this data to Gemini AI.

3. AI generates:

   * Future timeline
   * Key milestones
   * Life metrics

4. Results are visualized in an interactive UI.

---

## 🌍 Use Cases

* Students planning their careers
* Developers exploring growth paths
* Individuals seeking clarity in life decisions
* Personal productivity & self-improvement

---

## 🚀 Future Enhancements

* 🔐 Backend integration for secure API handling
* 📈 Advanced analytics & charts
* 🧑‍🤝‍🧑 Compare futures with friends
* 🧠 Personalized AI mentor

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repo and submit a PR.

---

## 📜 License

This project is licensed under the MIT License.

---

## 💡 Inspiration

Inspired by the idea of turning "what if" into "what will happen if..." using AI.

---

## ⭐ Show Your Support

If you like this project, give it a ⭐ on GitHub!



1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
