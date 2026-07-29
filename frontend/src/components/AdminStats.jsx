import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import "../styles/AdminPanel.css";

export default function AdminStats({ stats }) {
  const chartData = [
    { name: "جدید", value: stats.newCount, color: "#58a6ff" },
    { name: "در حال بررسی", value: stats.reviewingCount, color: "#d29922" },
    { name: "بسته شده", value: stats.closedCount, color: "#3fb950" },
  ];

  const cards = [
    { title: "کل تیکت‌ها", value: stats.total, color: "#c9d1d9" },
    { title: "جدید", value: stats.newCount, color: "#58a6ff" },
    { title: "در حال بررسی", value: stats.reviewingCount, color: "#d29922" },
    { title: "بسته شده", value: stats.closedCount, color: "#3fb950" },
  ];

  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="admin-card admin-stats-panel">
      <div className="stats-topbar">
        <div>
          <h2 className="admin-card-title stats-title">پنل مدیریت</h2>
          <p className="stats-description">
            نمای کلی وضعیت تیکت‌ها و توزیع آن‌ها بر اساس وضعیت
          </p>
        </div>
      </div>

      <div className="admin-stats-layout">
        <div className="stats-metrics">
          <div className="stats-grid">
            {cards.map((card) => (
              <div key={card.title} className="stat-item">
                <div className="stat-label">{card.title}</div>
                <div className="stat-value" style={{ color: card.color }}>
                  {card.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="stats-chart-panel">
          <div className="stats-chart-header">
            <div className="stats-chart-title">توزیع وضعیت</div>
            <div className="stats-chart-subtitle">نمایش سریع بر اساس تعداد</div>
          </div>

          <div className="stats-chart-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={58}
                  outerRadius={78}
                  paddingAngle={3}
                  stroke="#0d1117"
                >
                  {chartData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0d1117",
                    border: "1px solid #21262d",
                    borderRadius: "10px",
                    color: "#c9d1d9",
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="stats-chart-center">
              <div className="stats-chart-total">{total}</div>
              <div className="stats-chart-total-label">کل تیکت‌ها</div>
            </div>
          </div>

          <div className="stats-legend">
            {chartData.map((item) => (
              <div key={item.name} className="stats-legend-item">
                <span className="stats-legend-left">
                  <span
                    className="stats-legend-dot"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="stats-legend-label">{item.name}</span>
                </span>
                <span className="stats-legend-value">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
