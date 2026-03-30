export default function Loading() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'hsl(0 0% 3.9%)',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        {/* Animated Spinner */}
        <div
          style={{
            width: '40px',
            height: '40px',
            border: '3px solid hsl(0 0% 14.9%)',
            borderTop: '3px solid hsl(262 83% 58%)',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }}
        />
        <p style={{ color: 'hsl(0 0% 50%)', fontSize: '0.875rem' }}>
          Loading...
        </p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  )
}
