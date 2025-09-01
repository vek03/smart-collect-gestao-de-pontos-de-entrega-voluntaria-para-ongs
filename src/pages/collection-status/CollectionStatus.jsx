import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../utils/auth.js';
import styles from './CollectionStatus.module.css';

export default function CollectionStatus() {
  const [fillPercentage, setFillPercentage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setFillPercentage(75); // Simulação de dado do Firebase
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleViewAllPoints = () => navigate('/collection-points');

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Carregando status...</p>
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
          <div className={styles.percentageContainer}>
            <div className={styles.percentageCircle}>
              <svg className={styles.percentageFill} viewBox="0 0 36 36">
                <path
                  className={styles.circleBackground}
                  d="M18 2.0845
                     a 15.9155 15.9155 0 0 1 0 31.831
                     a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#e6e6e6"
                  strokeWidth="3.8"
                />
                <path
                  className={styles.circleProgress}
                  strokeDasharray={`${fillPercentage}, 100`}
                  d="M18 2.0845
                     a 15.9155 15.9155 0 0 1 0 31.831
                     a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#4e54c8"
                  strokeWidth="3.8"
                  strokeLinecap="round"
                />
              </svg>
              <div className={styles.percentageText}>
                <span className={styles.percentageNumber}>{fillPercentage}%</span>
                <span className={styles.percentageLabel}>preenchido</span>
              </div>
            </div>
          </div>

          <div className={styles.statusInfo}>
            <p className={styles.statusText}>
              Este é o ponto de coleta principal. Acompanhe a taxa de preenchimento em tempo real!
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
