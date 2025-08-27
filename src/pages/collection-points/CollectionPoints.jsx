import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { clearToken } from '../../utils/auth';
import styles from './CollectionPoints.module.css';

export default function CollectionPoints() {
  const [collectionPoints, setCollectionPoints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading data - new users have no collection points
    const timer = setTimeout(() => {
      setCollectionPoints([]); // Empty array for new users
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    clearToken();
    navigate('/login');
  };

  const handleAddPoint = () => {
    // TODO: Navigate to add collection point form
    alert('Funcionalidade de adicionar ponto de coleta será implementada em breve!');
  };

  const handleViewStatus = () => {
    navigate('/collection-status');
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Carregando pontos de coleta...</p>
        </div>
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
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              </svg>
              Adicionar Ponto
            </button>
          </div>

          {collectionPoints.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3>Nenhum ponto de coleta encontrado</h3>
              <p>
                Como sua conta é recente, você ainda não possui pontos de coleta configurados. 
                Clique no botão abaixo para adicionar seu primeiro ponto de coleta.
              </p>
              <button onClick={handleAddPoint} className={styles.primaryAddButton}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                </svg>
                Adicionar Primeiro Ponto de Coleta
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