export default function EmptyState({ icon: Icon, title, description }) {
  return (
    <div className="empty-state">
      <div className="ic">
        <Icon />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}
