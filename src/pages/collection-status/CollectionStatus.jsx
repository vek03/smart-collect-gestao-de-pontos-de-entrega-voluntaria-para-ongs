import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../../utils/auth.js';
import styles from './CollectionStatus.module.css';
import { database, db } from '../../firebase/firebase.js';
import {onValue, ref } from 'firebase/database';
import Header from '../../components/Header/Header.jsx';
import { collection, deleteDoc, query, doc, where, getDocs, updateDoc, arrayRemove } from 'firebase/firestore';
import { useOng } from '../../context/OngContext.jsx';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';

export default function CollectionStatus() {
  const [isLoading, setIsLoading] = useState(true);
  const [pevFillPercentage, setPevFillPercentage] = useState(0);
  const navigate = useNavigate();
  const { ong } = useOng();

  const location = useLocation();
  const point = location.state?.point; // Aqui está o objeto completo

  useEffect(() => {
    setIsLoading(true);
    const dbRef = ref(database);

    const unsubscribe = onValue(
      dbRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const pevStatusId = Object.keys(data).find((k) => k === point.PEVId);

          if (pevStatusId) {
            setPevFillPercentage(data[pevStatusId].fillPercentage.toFixed(2) || 0);
          } else {
            setPevFillPercentage(0);
          }
        } else {
          console.log("Nenhum dado encontrado.");
          setPevFillPercentage(0);
        }
        setIsLoading(false);
      },
      (error) => {
        console.error(error);
        setIsLoading(false);
      }
    );

    return () => unsubscribe(); // remove o listener quando o componente desmonta
  }, [point.PEVId, database]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleViewAllPoints = () => navigate('/collection-points');
  const handleProfile = () => navigate('/view-profile'); // Novo link para perfil
  const handleRemovePev = async () => {
    try {
      const q = query(
        collection(db, "ongs"),
        where("owner", "==", ong.owner)
      );

      const snapshot = await getDocs(q);
      if (snapshot.empty) return console.log("ONG não encontrada");

      const ongDoc = snapshot.docs[0];
      const ongRef = doc(db, "ongs", ongDoc.id);

      const pevRef = doc(db, "collectionPoints", point.id);

      await updateDoc(ongRef, {
        pevs: arrayRemove(pevRef)
      });

      await deleteDoc(pevRef);

      navigate('/collection-points');
    } catch(e) {
      console.log(e);
    }
  }

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
      <Header>
        <li><a onClick={handleProfile}>Perfil</a></li>
        <li><a onClick={handleLogout}>Sair</a></li>
      </Header>

      <main className={styles.main}>
        <div className={styles.statusCard}>
          <div className={styles.pointCard}>
            {/* Modal de confirmacao de exclusao de PEV */}
            <AlertDialog.Root>
              <AlertDialog.Trigger>
                <button className={styles.deleteButton}>
                  &#128465;
                </button>
              </AlertDialog.Trigger>
              <AlertDialog.Content maxWidth="450px">
                <AlertDialog.Title>Remover PEV</AlertDialog.Title>
                <AlertDialog.Description size="2">
                  Tem certeza? Ao remover um PEV, ele não estará mais acessível através do SmartCollect.
                </AlertDialog.Description>

                <Flex gap="3" mt="4" justify="end">
                  <AlertDialog.Cancel>
                    <Button variant="soft" color="gray">
                      Não, vou manter
                    </Button>
                  </AlertDialog.Cancel>
                  <AlertDialog.Action>
                    <Button onClick={handleRemovePev} variant="solid" color="red">
                      Tenho
                    </Button>
                  </AlertDialog.Action>
                </Flex>
              </AlertDialog.Content>
            </AlertDialog.Root>
            {/* ...restante do card... */}
          </div>
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
                  strokeDasharray={`${pevFillPercentage}, 100`}
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
                <span className={styles.percentageNumber}>{pevFillPercentage}%</span>
                <span className={styles.percentageLabel}>preenchido</span>
              </div>
            </div>
          </div>
          <div className={styles.statusInfo}>
            <p className={styles.statusText}>
              Este é o status de preenchimento do ponto de coleta. Acompanhe em tempo real!
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
