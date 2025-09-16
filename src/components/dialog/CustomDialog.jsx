import { Button, Dialog, Flex } from "@radix-ui/themes";
import styles from './CustomDialog.module.css';

export default function CustomDialog({ children, title, description, submitButtonText, onSubmit, withForm }) {
    return (
        <Dialog.Content maxWidth="500px" >
            <Flex gap="3" mt="4" justify="end">
                <Dialog.Title>
                    {title}
                </Dialog.Title>
                <Dialog.Close>
                    <Button variant="soft" color="red">
                        X
                    </Button>
                </Dialog.Close>
            </Flex>

            <Dialog.Description>
                {description}
            </Dialog.Description>

            <Flex direction="column" gap="3" className={styles.dialogContent}>
                {withForm ? (
                    <form onSubmit={onSubmit}>
                    {children}

                    <Flex justify="end" className={styles.dialogContent}>
                        <Button variant="soft" color="mint" type="submit">
                        {submitButtonText}
                        </Button>
                    </Flex>
                    </form>
                ) : (
                    <>
                        children
                        <Flex justify="end" className={styles.dialogContent}>
                            <Button variant="soft" color="mint" type={withForm ? "submit" : "button"}>
                                {submitButtonText}
                            </Button>
                        </Flex>
                    </>
                )}
            </Flex>
            
        </Dialog.Content>
    )
}