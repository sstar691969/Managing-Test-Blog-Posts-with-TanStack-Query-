# Managing-Test-Blog-Posts-with-TanStack-Query-
AD312-Managing Test Blog Posts with TanStack Query 


William Anderson
AD312

# 📱 CRUD Query App (Expo + TanStack Query)

A React Native (Expo) application that demonstrates full CRUD operations using **TanStack Query** and the JSONPlaceholder API.  
The project focuses on server-state management, API integration, filtering, and edge case handling.

---

# 🚀 Features

## ✅ CRUD Operations
- Create posts (POST)
- Read posts (GET)
- Update posts (PUT)
- Patch posts (PATCH)
- Delete posts (DELETE)

## 🔍 Filtering
- Filter posts by User ID
- Dynamic API requests using TanStack Query

## ⚡ State Management
- @tanstack/react-query for server state
- Automatic caching and refetching
- Query invalidation after mutations

---

# 🛠️ Tech Stack

- React Native (Expo)
- TanStack Query
- JavaScript (ES6+)
- Fetch API
- JSONPlaceholder API

# 🧪 Test Cases & Edge Cases

This section demonstrates that the application was tested with both normal and edge scenarios to ensure correct functionality and stability.

---

# 🟢 Normal Test Cases

## Test Case 1 — Fetch Posts (READ)
**Description:** Load all posts from API when app opens.

**Steps:**
- Open the application

**Expected Result:**
- A list of posts is displayed in a FlatList
- No errors in console

---

## Test Case 2 — Create Post (POST)
**Description:** Add a new post using input fields.

**Steps:**
- Enter a title
- Enter a body
- Press "Create Post" button

**Expected Result:**
- New post appears in the list
- Input fields are cleared
- UI updates automatically via query invalidation

---

## Test Case 3 — Update Post (PUT)
**Description:** Fully update an existing post.

**Steps:**
- Click "Edit" on a post

**Expected Result:**
- Post title and body are updated
- List refreshes automatically

---

# ⚠️ Edge Case Test Cases

## Edge Case 1 — Empty Input Submission
**Description:** Prevent invalid post creation.

**Steps:**
- Leave title and body empty
- Press "Create Post"

**Expected Result:**
- No API request is sent
- App does not crash
- No empty post is created

---

## Edge Case 2 — Invalid User ID Filter
**Description:** Test filtering with a non-existing user.

**Steps:**
- Enter `9999` in User ID filter

**Expected Result:**
- Empty array is returned (`[]`)
- FlatList shows no data
- App remains stable

---

## Edge Case 3 — Delete Already Removed Post
**Description:** Ensure app does not crash on repeated deletion.

**Steps:**
- Click "Delete" on a post twice

**Expected Result:**
- First click removes post
- Second click has no effect
- No crash occurs

---

# 🧪 Testing Method

Testing was performed manually using:
- Console logs
- Expo Go application
- Browser/terminal output

Example debug logs used:

```javascript id="dbg1"
console.log('User ID:', userId);
console.log('FILTER URL:', url);



```bash
git clone https://github.com/your-username/crud-query-app.git
cd crud-query-app
