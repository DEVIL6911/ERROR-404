export default function ScrollProgress({ progress }) {
  return (
    <div className="progress-bar-track" aria-hidden="true">
      <div className="progress-bar-fill" style={{ width: `${progress * 100}%` }} />
    </div>
  );
}
