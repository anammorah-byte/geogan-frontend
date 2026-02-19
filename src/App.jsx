import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [mensaje, setMensaje] = useState('Conectando...')
  const [estado, setEstado] = useState('loading') // loading | success | error

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/health`)
      .then(() => {
        setMensaje('¡Conexión con GeoGan exitosa! ✅')
        setEstado('success')
      })
      .catch(() => {
        setMensaje('Error al conectar con el servidor ❌')
        setEstado('error')
      })
  }, [])

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🐄 GeoGan</h1>
        <p style={styles.subtitle}>Sistema de Gestión Ganadera</p>
        <div
          style={{
            ...styles.statusBox,
            backgroundColor:
              estado === 'loading'
                ? '#fff3cd'
                : estado === 'success'
                ? '#d4edda'
                : '#f8d7da',
            color:
              estado === 'loading'
                ? '#856404'
                : estado === 'success'
                ? '#155724'
                : '#721c24',
            borderColor:
              estado === 'loading'
                ? '#ffc107'
                : estado === 'success'
                ? '#28a745'
                : '#dc3545',
          }}
        >
          {estado === 'loading' && (
            <span style={styles.spinner}>⏳</span>
          )}
          <span style={styles.mensaje}>{mensaje}</span>
        </div>
        <p style={styles.footer}>
          API: <code>{import.meta.env.VITE_API_URL || 'No configurada'}</code>
        </p>
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#1a1a2e',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    margin: 0,
  },
  card: {
    backgroundColor: '#16213e',
    borderRadius: '16px',
    padding: '40px 50px',
    textAlign: 'center',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
    border: '1px solid #0f3460',
    maxWidth: '450px',
    width: '90%',
  },
  title: {
    color: '#e94560',
    fontSize: '2.2rem',
    marginBottom: '4px',
  },
  subtitle: {
    color: '#a1a1c7',
    fontSize: '0.95rem',
    marginBottom: '30px',
  },
  statusBox: {
    padding: '16px 20px',
    borderRadius: '10px',
    border: '2px solid',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    fontSize: '1.05rem',
    fontWeight: '600',
  },
  spinner: {
    fontSize: '1.3rem',
    animation: 'spin 1s linear infinite',
  },
  mensaje: {
    fontSize: '1rem',
  },
  footer: {
    color: '#5a5a8a',
    fontSize: '0.8rem',
    marginTop: '24px',
  },
}

export default App
