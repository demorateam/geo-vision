import "../styles/AdminPanel.css";

export default function TicketList({
  tickets,
  selectedId,
  onSelectTicket,
  statusLabels,
  priorityLabels,
}) {
  return (
    <div className="ticket-list-container">
      {tickets.map((ticket) => {
        const isActive = ticket.id === selectedId;

        return (
          <button
            key={ticket.id}
            onClick={() => onSelectTicket(ticket.id)}
            className={`ticket-list-item ${isActive ? "active" : ""}`}
          >
            <div className="ticket-item-header">
              <span className="ticket-item-title">{ticket.title}</span>
              <span className={`status-badge ${ticket.status}`}>
                {statusLabels[ticket.status] || ticket.status}
              </span>
            </div>

            <div className="ticket-item-meta">
              اولویت:{" "}
              {priorityLabels[ticket.priority] || ticket.priority || "-"}
            </div>
          </button>
        );
      })}
    </div>
  );
}
