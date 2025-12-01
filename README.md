# 🍜 Hôm Nay Ăn Gì? (Today's Eats)

> Ứng dụng web thông minh giúp bạn quyết định món ăn hàng ngày với sự hỗ trợ của AI

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)

---

## 📖 Giới thiệu

**Hôm Nay Ăn Gì?** là một ứng dụng web fullstack giúp giải quyết bài toán "hôm nay ăn gì?" một cách thông minh và vui vẻ. Ứng dụng tích hợp Google Gemini AI để:
- 🎲 Chọn món ăn ngẫu nhiên từ thực đơn cá nhân
- 📝 Tạo công thức nấu ăn chi tiết với ước tính calories
- 🤖 Gợi ý món mới dựa trên sở thích
- 🧊 Tìm món phù hợp từ nguyên liệu có sẵn trong tủ lạnh

---

## ✨ Tính năng chính

### 🎯 Quay món thông minh
- Lọc theo bữa ăn (Sáng/Trưa/Tối/Ăn vặt)
- Hiệu ứng quay số mượt mà
- Xem ngay công thức từ AI

### 📋 Quản lý thực đơn
- Thêm/xóa món ăn tùy ý
- AI gợi ý 5 món mới cho từng bữa
- Lưu trữ tự động với LocalStorage
- Khôi phục danh sách mặc định

### 🧊 Tủ lạnh thông minh
- Nhập nguyên liệu đang có
- AI gợi ý 3 món ăn phù hợp
- Hiển thị độ khó và cách nấu nhanh

### 🎨 Giao diện
- Thiết kế Mobile-first
- Theme màu cam ấm áp (Vietnamese cuisine inspired)
- Animation mượt mà
- Dark mode ready

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 18
- **Styling**: Tailwind CSS + Shadcn/ui
- **Icons**: Lucide React
- **Language**: TypeScript

### Backend
- **AI Engine**: Google Genkit + Gemini 2.5 Flash
- **Server Actions**: Next.js Server Components
- **Runtime**: Node.js

### DevOps
- **Deployment**: Firebase App Hosting
- **Package Manager**: npm
- **Build Tool**: Turbopack

---

## 🚀 Cài đặt & Chạy dự án

### Yêu cầu hệ thống
- Node.js >= 20.x
- npm >= 10.x

### Bước 1: Clone repository
```bash
git clone https://github.com/nhoton2004/Today-s-Eats.git
cd Today-s-Eats
```

### Bước 2: Cài đặt dependencies
```bash
npm install
```

### Bước 3: Cấu hình API Key
Tạo file `.env.local` trong thư mục gốc và thêm:
```env
GOOGLE_GENAI_API_KEY=your_gemini_api_key_here
```

> Lấy API key tại: https://aistudio.google.com/app/apikey

### Bước 4: Chạy development server
```bash
npm run dev
```

Mở trình duyệt tại: http://localhost:9002

### Bước 5 (Optional): Chạy Genkit Dev UI
```bash
npm run genkit:dev
```

---

## 📂 Cấu trúc dự án

```
src/
├── app/                    # Next.js App Router (Pages & Layouts)
├── frontend/               # Frontend Code
│   ├── components/         # React Components
│   │   ├── ui/            # Shadcn UI Primitives
│   │   ├── home-tab.tsx   # Tab quay món
│   │   ├── manager-tab.tsx # Tab quản lý
│   │   └── fridge-tab.tsx # Tab tủ lạnh
│   └── hooks/             # Custom React Hooks
├── backend/               # Backend Code
│   └── ai/               # AI Integration
│       ├── genkit.ts     # Genkit Config
│       └── flows/        # AI Flows (Server Actions)
└── shared/               # Shared Utilities
    ├── data.ts           # Initial Data
    ├── types.ts          # TypeScript Types
    └── utils.ts          # Helper Functions
```

---

## 🎮 Cách sử dụng

1. **Tab "Quay Món"**: 
   - Chọn loại bữa ăn → Bấm "CHỐT MÓN NGAY!" 
   - Xem công thức AI với nút "Xem Công Thức"

2. **Tab "Menu"**: 
   - Thêm món thủ công hoặc dùng "AI Gợi ý"
   - Xóa món không thích
   - Khôi phục danh sách gốc

3. **Tab "Tủ Lạnh"**: 
   - Nhập nguyên liệu (VD: "4 quả trứng, hành, cà chua")
   - Nhận gợi ý món ăn từ AI

---

## 📸 Screenshots

_Coming soon..._

---

## 🗺️ Roadmap

### Version 1.0 (Current)
- [x] Quay món ngẫu nhiên theo bữa
- [x] AI tạo công thức nấu ăn
- [x] Quản lý thực đơn cá nhân
- [x] Tủ lạnh thông minh
- [x] LocalStorage persistence

### Version 1.1 (Planned)
- [ ] Lưu trữ đám mây (Firebase Firestore)
- [ ] Xác thực người dùng (Google Auth)
- [ ] Chia sẻ món ăn với bạn bè
- [ ] Lịch sử món đã chọn

### Version 2.0 (Future)
- [ ] Tính năng lập kế hoạch thực đơn tuần
- [ ] Danh sách mua sắm tự động
- [ ] Tích hợp với API công thức nấu ăn
- [ ] Progressive Web App (PWA)
- [ ] Đa ngôn ngữ (English support)

---

## 📦 Scripts

```bash
# Development
npm run dev              # Chạy Next.js dev server (port 9002)
npm run genkit:dev       # Chạy Genkit Dev UI

# Production
npm run build            # Build production
npm start               # Chạy production server

# Code Quality
npm run lint            # Chạy ESLint
npm run typecheck       # Kiểm tra TypeScript
```

---

## 🤝 Đóng góp

Mọi đóng góp đều được chào đón! Vui lòng:
1. Fork repository
2. Tạo branch mới (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

---

## 📄 License

Dự án này được phát hành dưới giấy phép MIT. Xem file [LICENSE](LICENSE) để biết thêm chi tiết.

---

## 👨‍💻 Tác giả

**Nho Ton**
- GitHub: [@nhoton2004](https://github.com/nhoton2004)
- Email: nhoth9518@ut.edu.vn

---

## 🙏 Lời cảm ơn

- [Next.js](https://nextjs.org/) - Framework tuyệt vời
- [Google Gemini](https://deepmind.google/technologies/gemini/) - AI Engine
- [Shadcn/ui](https://ui.shadcn.com/) - UI Components
- [Lucide](https://lucide.dev/) - Icon Library

---

⭐ Nếu thấy dự án hữu ích, hãy cho một star nhé!
