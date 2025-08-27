import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { clearToken } from '../../utils/auth';
import styles from './CollectionStatus.module.css';

export default function CollectionStatus() {
  const [fillPercentage, setFillPercentage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setFillPercentage(75); // Mock data - 75% filled
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    clearToken();
    navigate('/login');
  };

  const handleViewAllPoints = () => {
    navigate('/collection-points');
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Carregando dados do ponto de coleta...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Smart Collect</h1>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Sair
        </button>
      </header>

      <main className={styles.main}>
        <div className={styles.statusCard}>
          <div className={styles.iconContainer}>
            <div className={styles.collectionIcon}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
          </div>
          
          <h2 className={styles.title}>Ponto de Coleta Principal</h2>
          
          <div className={styles.percentageContainer}>
            <div className={styles.percentageCircle}>
              <div 
                className={styles.percentageFill}
                style={{ 
                  background: `conic-gradient(#4e54c8 0deg ${fillPercentage * 3.6}deg, #e0e0e0 ${fillPercentage * 3.6}deg 360deg)` 
                }}
              ></div>
              <div className={styles.percentageText}>
                <span className={styles.percentageNumber}>{fillPercentage}%</span>
                <span className={styles.percentageLabel}>Preenchido</span>
              </div>
            </div>
          </div>

          <div className={styles.statusInfo}>
            <p className={styles.statusText}>
              {fillPercentage >= 80 ? 'Ponto quase cheio!' : 
               fillPercentage >= 50 ? 'Ponto com boa ocupação' : 
               'Ponto com espaço disponível'}
            </p>
          </div>

          <button onClick={handleViewAllPoints} className={styles.viewAllButton}>
            Ver Todos os Pontos
          </button>
        </div>
      </main>
    </div>
  );
} 