const STORAGE_KEY = "geovision_tickets";

function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeAll(tickets) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
}

const seedTickets = [
  {
    id: 1,
    title: "مشکل در اتصال اینترنت",
    description: "کاربر اعلام کرده اینترنت روی سیستم قطع و وصل می‌شود.",
    status: "new",
    priority: "high",
    createdAt: "1405/05/06",
    aiAnalysis: "اختلال احتمالی در شبکه داخلی یا تنظیمات مودم/روتر.",
    department: "-",
    image: "",
  },
  {
    id: 2,
    title: "خطای ورود به پنل",
    description: "ورود به حساب کاربری با خطای اعتبارسنجی انجام نمی‌شود.",
    status: "reviewing",
    priority: "medium",
    createdAt: "1405/05/05",
    aiAnalysis: "احتمال مشکل در رمز عبور، توکن ورود یا محدودیت دسترسی.",
    department: "-",
    image: "",
  },
  {
    id: 3,
    title: "درخواست بازیابی اطلاعات",
    description: "کاربر درخواست بازیابی یک فایل حذف‌شده را ثبت کرده است.",
    status: "closed",
    priority: "low",
    createdAt: "1405/05/04",
    aiAnalysis: "نیاز به بررسی نسخه پشتیبان یا مسیر بازیابی داده‌ها.",
    department: "-",
    image: "",
  },
];

export function getTickets() {
  const stored = readAll();
  if (stored) return stored;
  writeAll(seedTickets);
  return seedTickets;
}

export function addTicket(ticket) {
  const tickets = getTickets();
  const newTicket = {
    id: Date.now(),
    status: "new",
    createdAt: new Date().toLocaleString("fa-IR"),
    ...ticket,
  };
  const updated = [newTicket, ...tickets];
  writeAll(updated);
  return newTicket;
}

export function updateTicketStatus(id, status) {
  const tickets = getTickets();
  const updated = tickets.map((t) => (t.id === id ? { ...t, status } : t));
  writeAll(updated);
  return updated;
}