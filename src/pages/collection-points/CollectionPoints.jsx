import { zodResolver } from '@hookform/resolvers/zod';
import * as Toast from '@radix-ui/react-toast';
import { Dialog, Text, TextField } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import z from 'zod';
import CustomDialog from '../../components/dialog/CustomDialog.jsx';
import { logout } from '../../utils/auth.js';
import styles from './CollectionPoints.module.css';

const PEVSchema = z.object({
  PEVId: z.string().nonempty("O campo é obrigatório!").min(4, "O código do PEV deve possuir 4 caracteres").max(4, "O código do PEV deve possuir 4 caracteres"),
  name: z.string().nonempty("O campo é obrigatório!").min(3, "O nome precisar ter ao menos 3 caracteres"),
  address: z.string().nonempty("O campo é obrigatório!"),
  PEVPassword: z.string().nonempty("O campo é obrigatório!").min(8, "A senha do PEV deve ter ao menos 8 caracteres"),
});

export default function CollectionPoints() {
  const [collectionPoints, setCollectionPoints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false); 
  const [toastOpen, setToastOpen] = useState(false); // controla toast
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(PEVSchema)
  });

  const onSubmit = (data) => {
    console.log(data);
    // Persistir os dados
    setIsDialogOpen(false);
    setToastOpen(true); // abre o toast
  }

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

  const handleAddPoint = () => {};
  const handleViewStatus = () => navigate('/collection-status');
  const handleProfile = () => navigate('/view-profile');
  const handleSmartCollectClick = () => navigate('/collection-points');

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Carregando pontos de coleta...</p>
      </div>
    );
  }

  return (
    <Toast.Provider swipeDirection="right" duration={3000}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.headerTitle} onClick={handleSmartCollectClick}>
            Smart Collect
          </h1>
          <div className={styles.headerActions}>
            <a className={styles.profileLink} onClick={handleProfile}>
              Perfil
            </a>
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
            </div>

            {collectionPoints.length === 0 ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>
                  <svg viewBox="0 0 64 64" fill="none">
                    <circle cx="32" cy="32" r="30" stroke="#43B02A" strokeWidth="4"/>
                    <path d="M20 32l8 8 16-16" stroke="#43B02A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>Nenhum ponto de coleta encontrado</h3>
                <p>Sua conta é recente, clique no botão abaixo para adicionar seu primeiro ponto de coleta.</p>
                <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <Dialog.Trigger>
                    <button onClick={handleAddPoint} className={styles.primaryAddButton}>
                      Adicionar Primeiro Ponto
                    </button>
                  </Dialog.Trigger>

                  <CustomDialog 
                    withForm={true}
                    title="Adicione um PEV (Ponto de Entrega Voluntária)"
                    description="Adicione um PEV para o monitoramento eficiente"
                    submitButtonText="Adicionar"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <label className={styles.inputStyle}>
                      <Text as="div" size="2" mb="1" weight="bold">
                        Código do PEV
                      </Text>
                      <TextField.Root
                        placeholder="Digite um código de identificação para o PEV"
                        {...register("PEVId")}
                      />
                      {errors.PEVId && <span className={styles.errorMessage}>{errors.PEVId.message}</span>}
                    </label>
                    <label className={styles.inputStyle}>
                      <Text as="div" size="2" mb="1" weight="bold">
                        Nome
                      </Text>
                      <TextField.Root
                        placeholder="Digite um apelido para esse PEV"
                        {...register("name")}
                      />
                      {errors.name && <span className={styles.errorMessage}>{errors.name.message}</span>}
                    </label>
                    <label className={styles.inputStyle}>
                      <Text as="div" size="2" mb="1" weight="bold">
                        Endereço
                      </Text>
                      <TextField.Root
                        placeholder="Digite o local aproximado onde o PEV ficará"
                        {...register("address")}
                      />
                      {errors.address && <span className={styles.errorMessage}>{errors.address.message}</span>}
                    </label>
                    <label className={styles.inputStyle}>
                      <Text as="div" size="2" mb="1" weight="bold">
                        Senha
                      </Text>
                      <TextField.Root
                        placeholder="Digite a senha de desbloqueio do dispositivo do PEV"
                        {...register("PEVPassword")}
                      />
                      {errors.PEVPassword && <span className={styles.errorMessage}>{errors.PEVPassword.message}</span>}
                    </label>
                  </CustomDialog>
                </Dialog.Root>
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

      {/* TOAST */}
      <Toast.Root 
        open={toastOpen} 
        onOpenChange={setToastOpen} 
        duration={3000} 
        className={styles.toast}
      >
        <Toast.Title className={styles.toastTitle}>PEV cadastrado!</Toast.Title>
        <Toast.Description className={styles.toastDescription}>
          Seu ponto de coleta foi adicionado com sucesso.
        </Toast.Description>
      </Toast.Root>

      {/* Viewport obrigatoriamente no fim */}
      <Toast.Viewport className={styles.toastViewport} />
    </Toast.Provider>
  );
}
