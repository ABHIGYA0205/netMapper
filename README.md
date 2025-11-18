# **NetMapper – Internal Network Mapping & Vulnerability Dashboard**

NetMapper is a full-stack web platform designed to give IT administrators and cybersecurity teams real-time visibility into internal network assets. It integrates automated Nmap scanning with a modern web interface, allowing users to view, analyze, and track devices, ports, and services found within their environments.

---

## ## 📌 **1. Project Title**
**NetMapper – Internal Network Mapping & Vulnerability Dashboard**

---

## ## 🧩 **2. Problem Statement**

Many organizations lack real-time visibility into devices and services running in their internal networks. This causes security blind spots like:

- Unknown/rogue hosts  
- Open or misconfigured ports  
- Unmonitored network changes  

**NetMapper solves this by providing an interactive dashboard that:**

- Runs automated Nmap scans  
- Stores and organizes results  
- Allows CRUD operations for scans/devices  
- Enables searching, sorting, filtering, and pagination  
- Tracks changes over time and generates alerts  

---

## ## 🏗️ **3. System Architecture**
Frontend (Next.js + TailwindCSS)
↓
Backend (Node.js + Express.js)
↓
Nmap
↓
Database (MongoDB)


### **Example Stack**
- **Frontend:** React + Next.js  
- **Backend:** Node.js + Express.js  
- **Database:** MySQL  
- **Authentication:** JWT-based login/signup  

### **Hosting**
- **Frontend →** Vercel / Netlify  
- **Backend →** Render / Railway  
- **Database →** Atlas

---

## ## ⭐ **4. Key Features**

| Category | Features |
|---------|----------|
| **Authentication & Authorization** | Secure JWT login/signup, role-based access (admin/operator) |
| **Scan Management** | Start, schedule, or delete Nmap scans |
| **CRUD Operations** | Create, read, update, delete scans and device entries |
| **Dynamic Data Handling** | Real-time fetching & updates via Axios |
| **Search/Sort/Filter** | Search by IP, sort by ports, filter by OS/services |
| **Pagination** | Smooth browsing of large scan datasets |
| **Visualization** | Charts, graphs, and interactive tables |
| **Alerts & Reporting** | Detect new devices, export CSV/PDF reports |

---

## ## 🛠️ **5. Tech Stack**

| Layer | Technologies Used |
|-------|-------------------|
| **Frontend** | Next.js (React), TailwindCSS, Axios |
| **Backend** | Node.js, Express.js |
| **Database** | MySQL |
| **Authentication** | JWT |
| **Tool Integration** | Nmap (Node.js `child_process`) |
| **Hosting** | Vercel (Frontend), Render/Railway (Backend), PlanetScale (MySQL) |

---

## ## 🔌 **6. API Overview**

| Endpoint | Method | Description | Access |
|----------|--------|-------------|--------|
| `/api/auth/signup` | POST | Register a new user | Public |
| `/api/auth/login` | POST | Authenticate user & issue JWT | Public |
| `/api/scans` | GET | Fetch all scans (supports search/sort/filter/pagination) | Authenticated |
| `/api/scans` | POST | Start a new Nmap scan | Admin |
| `/api/scans/:id` | GET | Fetch details of a specific scan | Authenticated |
| `/api/scans/:id` | PUT | Update scan info (tags, notes, etc.) | Admin |
| `/api/scans/:id` | DELETE | Delete a scan record | Admin |
| `/api/hosts` | GET | Fetch all discovered hosts with filters | Authenticated |
| `/api/alerts` | GET | View alerts generated between scans | Authenticated |

---

## ## 🖥️ **7. Example Pages**

1. **Login / Signup**
2. **Dashboard – Scan Summary**
3. **All Scans – searchable & sortable table**
4. **Scan Details – hosts, open ports, OS info**
5. **Alerts Page – differences between scans**
6. **User Profile / Admin Panel**

---

## ## 🎯 **8. Expected Outcomes**

- A fully functional full-stack web application for internal network visibility  
- Dynamic viewing, searching, sorting, and filtering of scan data  
- Secure data persistence using MySQL  
- Admin capabilities for managing users and scans  
- Demonstrates successful integration of **Nmap** with a modern JS-based stack  

---


