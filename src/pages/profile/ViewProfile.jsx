import styles from "./profile.module.css";
import Header from "../../components/Header/Header";
import { useOng } from "../../context/OngContext";
import { Button, Dialog, Flex, TextField, Text } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const OngSchema = z.object({
  phone: z.string().min(8, "Telefone inválido"),
  address: z.string().min(3, "Endereço muito curto"),
  website: z.url("URL inválida"),
  facebook: z
    .string()
    .regex(/^@[A-Za-z0-9._]{2,}$/, "Informe um username válido, começando com @")
    .optional(),
  instagram: z
    .string()
    .regex(/^@[A-Za-z0-9._]{2,}$/, "Informe um username válido, começando com @")
    .optional(),
  mission: z.string().min(3, "Missão muito curta").optional(),
});

export default function ViewProfile() {
  const { ong } = useOng();
  const { register, handleSubmit, formState: { errors } } = useForm({
      resolver: zodResolver(OngSchema)
    });

  const onSubmit = async (data) => {
    try {
      const ref = doc(db, "ongs", ong.id);

      await updateDoc(ref, data);

      alert("Perfil atualizado com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar perfil");
    }
  }

  return (
    <div className={styles.container}>
      <Header>
        <li><a href="/collection-points">Voltar</a></li>
        <li><a href="/pev">Editar</a></li>
      </Header>

      {/* Banner */}
      <div
        className={styles.banner}
        style={{
          backgroundImage: `url(${ong?.bannerImage})`,
        }}
      ></div>

      {/* Conteúdo */}
      <div className={styles.content}>
        {/* Perfil */}
        <div className={styles.profileHeader}>
          <h1>{ong?.name}</h1>
        </div>

        {/* Dados */}
        <div className={styles.infoSection}>
          <p><strong>Email:</strong> {ong?.email || "-"}</p>
          <p><strong>Telefone:</strong> {ong?.phone || "-"}</p>
          <p><strong>Endereço:</strong> {ong?.address || "-"}</p>
          <p><strong>Website:</strong> <a href={ong?.website || "#"} target={ong?.website ? "_blank" : "_self"}>{ong?.website || "-"}</a></p>
          <p>
            <strong>Facebook:</strong>{" "}
            <a
              href={ong?.facebook ? `https://www.facebook.com/${ong.facebook.split("@")[1]}` : "#"}
              target={ong?.facebook ? "_blank" : "_self"}
              rel="noopener noreferrer"
            >
              {ong?.facebook || "-"}
            </a>
          </p>
          <p>
            <strong>Instagram:</strong>{" "}
            <a
              href={ong?.instagram ? `https://www.instagram.com/${ong.instagram.split("@")[1]}` : "#"}
              target={ong?.instagram ? "_blank" : "_self"}
              rel="noopener noreferrer"
            >
              {ong?.instagram || "-"}
            </a>
          </p>
          <p><strong>CNPJ:</strong> {ong?.cnpj || "-"}</p>
          <p><strong>Missão:</strong> {ong?.mission || "-"}</p>
        </div>

        <Dialog.Root>
          <Dialog.Trigger>
            <Button>Editar perfil</Button>
          </Dialog.Trigger>

          <Dialog.Content maxWidth="650px">
            <Dialog.Title>Editar Perfil</Dialog.Title>
            <Dialog.Description size="2" mb="4">
              Faça mudanças no perfil da ONG.
            </Dialog.Description>

            <Flex direction="row" justify="between" width="600px" gap="4" className={styles.formRow}>
              {/* Lado esquerdo */}
              <Flex direction="column" gap="3" className={styles.col}>
                <label className={styles.label}>
                  <Text as="div" size="2" mb="1" weight="bold">Email</Text>
                  <TextField.Root defaultValue={ong?.email} disabled width="100%" />
                </label>

                <label className={styles.label}>
                  <Text as="div" size="2" mb="1" weight="bold">Telefone</Text>
                  <TextField.Root maxLength={15} defaultValue={ong?.phone} placeholder="Digite o telefone da ONG" width="100%" {...register("phone")} />
                  {errors.phone && <span className={styles.errorMessage}>{errors.phone.message}</span>}
                </label>

                <label className={styles.label}>
                  <Text as="div" size="2" mb="1" weight="bold">Endereço</Text>
                  <TextField.Root defaultValue={ong?.address} placeholder="Digite o endereço da ONG" width="100%" {...register("address")} />
                  {errors.address && <span className={styles.errorMessage}>{errors.address.message}</span>}
                </label>

                <label className={styles.label}>
                  <Text as="div" size="2" mb="1" weight="bold">Website</Text>
                  <TextField.Root defaultValue={ong?.website} placeholder="Digite o website da ONG" width="100%" {...register("website")} />
                  {errors.website && <span className={styles.errorMessage}>{errors.website.message}</span>}
                </label>
              </Flex>

              {/* Lado direito */}
              <Flex direction="column" gap="3" flex="1" className={styles.col}>
                <label className={styles.label}>
                  <Text as="div" size="2" mb="1" weight="bold">Facebook</Text>
                  <TextField.Root defaultValue={ong?.facebook} placeholder="@example" width="100%" {...register("facebook")} />
                  {errors.facebook && <span className={styles.errorMessage}>{errors.facebook.message}</span>}
                </label>

                <label className={styles.label}>
                  <Text as="div" size="2" mb="1" weight="bold">Instagram</Text>
                  <TextField.Root defaultValue={ong?.instagram} placeholder="@example" width="100%" {...register("instagram")} />
                  {errors.instagram && <span className={styles.errorMessage}>{errors.instagram.message}</span>}
                </label>

                <label className={styles.label}>
                  <Text as="div" size="2" mb="1" weight="bold">CNPJ</Text>
                  <TextField.Root defaultValue={ong?.cnpj} disabled width="100%" />
                </label>

                <label className={styles.label}>
                  <Text as="div" size="2" mb="1" weight="bold">Missão</Text>
                  <TextField.Root defaultValue={ong?.mission} placeholder="Digite a Missão da ONG" width="100%" {...register("mission")} />
                  {errors.mission && <span className={styles.errorMessage}>{errors.mission.message}</span>}
                </label>
              </Flex>
            </Flex>


            <Flex gap="3" mt="4" justify="end">
              <Dialog.Close>
                <Button variant="soft" color="gray">
                  Cancelar
                </Button>
              </Dialog.Close>
              <Dialog.Close>
                <Button onClick={handleSubmit(onSubmit)}>Salvar</Button>
              </Dialog.Close>
            </Flex>
          </Dialog.Content>
        </Dialog.Root>
      </div>
    </div>
  );
}
