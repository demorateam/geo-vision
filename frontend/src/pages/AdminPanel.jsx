import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminStats from "../components/AdminStats";
import TicketList from "../components/TicketList";
import TicketDetails from "../components/TicketDetails";
import { getTickets, updateTicketStatus } from "../services/ticketStore";
import "../styles/AdminPanel.css";

const statusLabels = {
  new: "جدید",
  reviewing: "در حال بررسی",
  closed: "بسته شده",
};

const priorityLabels = {
  high: "بالا",
  medium: "متوسط",
  low: "کم",
  critical: "بحرانی",
};

export default function AdminPanel() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState(() => getTickets());
  const [selectedId, setSelectedId] = useState(
    () => getTickets()[0]?.id ?? null,
  );

  const selectedTicket = useMemo(
    () => tickets.find((ticket) => ticket.id === selectedId) ?? null,
    [tickets, selectedId],
  );

  const stats = useMemo(() => {
    return {
      total: tickets.length,
      newCount: tickets.filter((t) => t.status === "new").length,
      reviewingCount: tickets.filter((t) => t.status === "reviewing").length,
      closedCount: tickets.filter((t) => t.status === "closed").length,
    };
  }, [tickets]);

  const updateStatus = (ticketId, nextStatus) => {
    const updated = updateTicketStatus(ticketId, nextStatus);
    setTickets(updated);
  };

  return (
    <div className="admin-container">
      <button onClick={() => navigate("/")} className="btn-back">
        ← بازگشت به صفحه اصلی
      </button>

      <AdminStats stats={stats} />

      <div className="panel-layout">
        <div className="admin-card">
          <h3 className="admin-card-title">لیست تیکت‌ها</h3>
          <TicketList
            tickets={tickets}
            selectedId={selectedId}
            onSelectTicket={setSelectedId}
            statusLabels={statusLabels}
            priorityLabels={priorityLabels}
          />
        </div>

        <TicketDetails
          ticket={selectedTicket}
          onChangeStatus={updateStatus}
          statusLabels={statusLabels}
          priorityLabels={priorityLabels}
        />
      </div>
    </div>
  );
}