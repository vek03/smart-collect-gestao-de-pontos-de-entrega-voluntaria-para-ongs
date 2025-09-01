import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../utils/auth.js';
import styles from './CollectionPoints.module.css';

export default function CollectionPoints() {
  const [collectionPoints, setCollectionPoints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setCollectionPoints([]); // mock vazio
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleAddPoint = () => alert('Funcionalidade de adicionar ponto de coleta em breve!');
  const handleViewStatus = () => navigate('/collection-status');

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Carregando pontos de coleta...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Smart Collect</h1>
        <div className={styles.headerActions}>
          <button onClick={handleViewStatus} className={styles.statusButton}>
            Ver Status
          </button>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Sair
          </button>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.pageHeader}>
            <h2>Meus Pontos de Coleta</h2>
            <button onClick={handleAddPoint} className={styles.addButton}>
              + Adicionar Ponto
            </button>
          </div>

          {collectionPoints.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>
                <svg viewBox="0 0 64 64" fill="none">
                  <circle cx="32" cy="32" r="30" stroke="#4e54c8" strokeWidth="4"/>
                  <path d="M20 32l8 8 16-16" stroke="#4e54c8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Nenhum ponto de coleta encontrado</h3>
              <p>Sua conta é recente, clique no botão abaixo para adicionar seu primeiro ponto de coleta.</p>
              <button onClick={handleAddPoint} className={styles.primaryAddButton}>
                Adicionar Primeiro Ponto
              </button>
            </div>
          ) : (
            <div className={styles.pointsList}>
              {collectionPoints.map((point, index) => (
                <div key={index} className={styles.pointCard}>
                  <div className={styles.pointInfo}>
                    <h3>{point.name}</h3>
                    <p>{point.location}</p>
                    <div className={styles.fillStatus}>
                      <span className={styles.fillPercentage}>{point.fillPercentage}%</span>
                      <span className={styles.fillLabel}>preenchido</span>
                    </div>
                  </div>
                  <div className={styles.pointActions}>
                    <button className={styles.viewButton}>Ver Detalhes</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
