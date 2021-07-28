import { useState } from 'react'
import styles from './gift.module.scss'

interface GiftDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    product?: string;
}

export function GiftDialog({ open, setOpen, product }: GiftDialogProps) {
    const [step, setStep] = useState(0);

    return (
        <div className={styles.container}>
            {step === 0 && (
                <div>
                    <h2>Selecione o presente:</h2>
                    <select>
                        <option>Doação</option>
                        <option>Camiseta Baião Lascado</option>
                        <option>Adesivo Baião Lascado</option>
                        <option>Oficina de Rabeca</option>
                        <option>Oficina de Cavaquinho</option>
                        <option>Oficina Baixo</option>
                        <option>Oficina de Zabumba</option>
                        <option>Oficina de Pandeiro</option>
                        <option>Oficina de Dança</option>
                        <option>Apostila de Cavaquinho</option>
                        <option>Apostila de Pandeiro</option>
                        <option>1 ano de Forró na Gruta com acompanhante</option>
                    </select>

                    <button onClick={() => setStep(1)}>
                        Continuar
                    </button>
                </div>
            )}
            {step === 1 && (
                <div>
                    <h2>Método de Pagamento</h2>
                    <button>Cartão de Crédito</button>
                    <button>Pix</button>
                </div>
            )}
        </div>
    )
}