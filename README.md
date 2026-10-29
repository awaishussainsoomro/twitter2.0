# Twitter 2.0 🚀

A modern, fast, and fully responsive social media application inspired by Twitter/X. Built with **React 19**, **Redux Toolkit**, **Appwrite**, and **Tailwind CSS**.

---

## 🌟 Key Features

* **Real-time Tweet Feed:** View global tweets ordered chronologically (newest first).
* **Media Uploads:** Attach image files to tweets seamlessly using Appwrite Storage (`getFileView()` optimization).
* **User Profile Page:** Dedicated profile route displaying user metadata and filtering user-specific tweets.
* **Responsive Layout:** Adaptive sidebar navigation on desktop paired with a sticky mobile top bar and bottom tab navigation.
* **Authentication & Protected Routes:** Secure user signup, login, and session persistence powered by Appwrite Auth and custom `AuthLayout` guards.
* **State Management:** Centralized Redux store managing authentication state (`authSlice`) and in-memory tweet timeline sync (`tweetSlice`).

---

## 🛠️ Tech Stack

* **Frontend:** React 19, React Router v6, Tailwind CSS, Lucide React (Icons)
* **State Management:** Redux Toolkit
* **Backend as a Service (BaaS):** Appwrite (Authentication, Database, Storage)
* **Build Tool:** Vite

---

## 📁 Project Structure

```text
src/
├── appwrite/          # Appwrite client configuration & service classes
│   ├── auth.js        # Authentication service
│   ├── database.js    # Database CRUD operations & queries
│   └── storage.js     # File storage upload & preview services
├── components/        # Reusable UI components (Header, Footer, TweetCard, PostTweet)
├── pages/             # Page view routes (Home, Profile, Login, Signup)
├── store/             # Redux store & slices (authSlice, tweetSlice)
└── conf/              # Environment variable configurations
```

---

## 🚀 Getting Started

### Prerequisites

* Node.js (`v18+` recommended)
* An active **Appwrite** Cloud or self-hosted instance

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/twitter2.0.git
   cd twitter2.0
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory:
   ```env
   VITE_APPWRITE_URL="https://cloud.appwrite.io/v1"
   VITE_APPWRITE_PROJECT_ID="your_appwrite_project_id"
   VITE_APPWRITE_DATABASE_ID="your_appwrite_database_id"
   VITE_APPWRITE_COLLECTION_ID_TWEETS="your_tweets_collection_id"
   VITE_APPWRITE_BUCKET_ID="your_storage_bucket_id"
   ```

4. **Appwrite Storage Bucket Permissions:**
   Ensure your Appwrite Storage Bucket settings allow **Any** $\rightarrow$ **Read** access so image attachments display properly.

5. **Run the local development server:**
   ```bash
   npm run dev
   ```
