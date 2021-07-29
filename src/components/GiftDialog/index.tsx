import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './gift.module.scss';

import registerUserinFauna from '../../pages/api/users';


interface GiftDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    product?: string;
}

const createUserSchema = yup.object().shape({
    name: yup
        .string()
        .required('Nome do grupo obrigatório')
        .min(3, 'Nome do grupo com no mínimo 3 caracteres'),
    email: yup.string().required("Email obrigatório").email('Email inválido'),
    mobile: yup.string().optional(),
    paymentMethod: yup.string().required("Método de pagamento obrigatório"),
    product: yup.string().required().min(3, 'Método de pagamento obrigatório'),
});

const PRODCUTS = [
    {
        name: 'Doação',
        key: 'donation',
        price: 0,
    },
    {
        name: 'Apostila de Pandeiro',
        key: 'apostilaPandeiro',
        price: 50,
    },
    {
        name: 'Apostila de Cavaquinho',
        key: 'apostilaCavaquinho',
        price: 50,
    },
    {
        name: 'Oficina de Dança',
        key: 'oficinaDanca',
        price: 50,
    },
    {
        name: 'Oficina de Rabeca',
        key: 'oficinaRabeca',
        price: 50,
    },
    {
        name: 'Oficina de Zabumba',
        key: 'oficinaZabumba',
        price: 50,
    },
    {
        name: 'Oficina de Baixo',
        key: 'oficinaBaixo',
        price: 50,
    },
    {
        name: 'Oficina de Pandeiro',
        key: 'oficinaPandeiro',
        price: 50,
    },
    {
        name: 'Oficina Ana Maria',
        key: 'oficinaAnaMaria',
        price: 80,
    },
    {
        name: 'Camiseta Baião Lascado',
        key: 'camiseta',
        price: 80,
    },
    {
        name: 'Adesivo Baião Lascado',
        key: 'adesivoBaiao',
        price: 20,
    },
    {
        name: '1 ano de Forró na Gruta com acompanhante',
        key: '1ano',
        price: 600,
    }
]

export function GiftDialog({ open, setOpen, product }: GiftDialogProps) {
    const [step, setStep] = useState(0);

    const { register, handleSubmit, formState, control, watch } = useForm({
        resolver: yupResolver(createUserSchema),
        mode: 'onBlur',
        defaultValues: {
            name: null,
            email: null,
            mobile: null,
            paymentMethod: null,
            product,
        },
    });

    async function createUser(values) {
        try {
            console.log('try')
            await registerUserinFauna(values);

            console.log(values);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit(createUser)} className="mx-auto">
                {step === 0 && (
                    <div>
                        <h2>Selecione o presente:</h2>
                        <select {...register('product')}>
                            {PRODCUTS.map(product => (
                                <option key={product.key} value={product.key}>{product.name}</option>
                            ))}
                        </select>

                        <button onClick={() => setStep(1)}>
                            Continuar
                        </button>

                    </div>
                )}
                {step === 1 && (
                    <div>
                        <h2>Insira seus dados</h2>
                        <input name="name" id="name" {...register('name')} type="text" placeholder="Nome *" />
                        {formState?.errors?.name && (<span style={{ color: 'red' }}>{formState?.errors?.name?.message}</span>)}
                        <input name="email" id="email" {...register('email')} type="email" placeholder="Email *" />
                        {formState?.errors?.email && (<span style={{ color: 'red' }}>{formState?.errors?.email?.message}</span>)}
                        <input name="mobile" id="mobile" {...register('mobile')} type="tel" placeholder="Celular (opcional)" />



                        <button onClick={() => setStep(2)}>
                            Continuar
                        </button>
                        <button onClick={() => setStep(0)}>
                            Voltar
                        </button>

                    </div>
                )}
                {step === 2 && (
                    <div>
                        <h2>Método de Pagamento</h2>

                        <select {...register('paymentMethod')}>

                            <option key={'pix'} value={'pix'}>Pix</option>
                            <option key={'creditCard'} value={'creditCard'}>Cartão de Crédito</option>

                        </select>
                        {formState?.errors?.paymentMethod && (<span style={{ color: 'red' }}>{formState?.errors?.paymentMethod?.message}</span>)}
                        {/* <button>Cartão de Crédito</button>
                        <button>Pix</button> */}

                        <button type="submit">Teste</button>
                    </div>
                )}
            </form>
        </div>
    )
}