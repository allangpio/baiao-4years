import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './gift.module.scss';
import { api } from '../../services/api';

import QRCode from 'qrcode.react'


interface GiftDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    selectedProduct?: string;
}

interface User {
    name: string;
    email: string;
    mobile?: string;
    paymentMethod?: string;
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
        qrcode: '00020126580014BR.GOV.BCB.PIX01367562c356-5408-4e37-91cd-a09bb9aa9a545204000053039865802BR5923Lincoln Tarcisio Pontes6009SAO PAULO61080540900062070503***630437D1'
    },
    {
        name: 'Apostila de Pandeiro',
        key: 'apostilaPandeiro',
        price: 50,
        qrcode: '00020126580014BR.GOV.BCB.PIX01367562c356-5408-4e37-91cd-a09bb9aa9a54520400005303986540550.005802BR5923Lincoln Tarcisio Pontes6009SAO PAULO61080540900062070503***6304FDB5'
    },
    {
        name: 'Apostila de Cavaquinho',
        key: 'apostilaCavaquinho',
        price: 50,
        qrcode: '00020126580014BR.GOV.BCB.PIX01367562c356-5408-4e37-91cd-a09bb9aa9a54520400005303986540550.005802BR5923Lincoln Tarcisio Pontes6009SAO PAULO61080540900062070503***6304FDB5'
    },
    {
        name: 'Oficina de Dança',
        key: 'oficinaDanca',
        price: 50,
        qrcode: '00020126580014BR.GOV.BCB.PIX01367562c356-5408-4e37-91cd-a09bb9aa9a54520400005303986540550.005802BR5923Lincoln Tarcisio Pontes6009SAO PAULO61080540900062070503***6304FDB5'
    },
    {
        name: 'Oficina de Rabeca',
        key: 'oficinaRabeca',
        price: 50,
        qrcode: '00020126580014BR.GOV.BCB.PIX01367562c356-5408-4e37-91cd-a09bb9aa9a54520400005303986540550.005802BR5923Lincoln Tarcisio Pontes6009SAO PAULO61080540900062070503***6304FDB5'
    },
    {
        name: 'Oficina de Zabumba',
        key: 'oficinaZabumba',
        price: 50,
        qrcode: '00020126580014BR.GOV.BCB.PIX01367562c356-5408-4e37-91cd-a09bb9aa9a54520400005303986540550.005802BR5923Lincoln Tarcisio Pontes6009SAO PAULO61080540900062070503***6304FDB5'
    },
    {
        name: 'Oficina de Baixo',
        key: 'oficinaBaixo',
        price: 50,
        qrcode: '00020126580014BR.GOV.BCB.PIX01367562c356-5408-4e37-91cd-a09bb9aa9a54520400005303986540550.005802BR5923Lincoln Tarcisio Pontes6009SAO PAULO61080540900062070503***6304FDB5'
    },
    {
        name: 'Oficina de Pandeiro',
        key: 'oficinaPandeiro',
        price: 50,
        qrcode: '00020126580014BR.GOV.BCB.PIX01367562c356-5408-4e37-91cd-a09bb9aa9a54520400005303986540550.005802BR5923Lincoln Tarcisio Pontes6009SAO PAULO61080540900062070503***6304FDB5'
    },
    {
        name: 'Oficina Ana Maria',
        key: 'oficinaAnaMaria',
        price: 80,
        qrcode: '00020126580014BR.GOV.BCB.PIX01367562c356-5408-4e37-91cd-a09bb9aa9a54520400005303986540580.005802BR5923Lincoln Tarcisio Pontes6009SAO PAULO61080540900062070503***6304974B'
    },
    {
        name: 'Camiseta Baião Lascado',
        key: 'camiseta',
        price: 80,
        qrcode: '00020126580014BR.GOV.BCB.PIX01367562c356-5408-4e37-91cd-a09bb9aa9a54520400005303986540580.005802BR5923Lincoln Tarcisio Pontes6009SAO PAULO61080540900062070503***6304974B'
    },
    {
        name: 'Adesivo Baião Lascado',
        key: 'adesivoBaiao',
        price: 30,
        qrcode: '00020126580014BR.GOV.BCB.PIX01367562c356-5408-4e37-91cd-a09bb9aa9a54520400005303986540530.005802BR5923Lincoln Tarcisio Pontes6009SAO PAULO61080540900062070503***63048686'
    },
    {
        name: '1 ano de Forró na Gruta com acompanhante',
        key: '1ano',
        price: 600,
        qrcode: '00020126580014BR.GOV.BCB.PIX01367562c356-5408-4e37-91cd-a09bb9aa9a545204000053039865406600.005802BR5923Lincoln Tarcisio Pontes6009SAO PAULO61080540900062070503***63049900'
    }
]

export function GiftDialog({ open, setOpen, selectedProduct }: GiftDialogProps) {
    const [step, setStep] = useState(0);

    const { register, handleSubmit, formState, control, watch } = useForm({
        resolver: yupResolver(createUserSchema),
        mode: 'onBlur',
        defaultValues: {
            name: null,
            email: null,
            mobile: null,
            paymentMethod: 'pix',
            selectedProduct: selectedProduct ? selectedProduct : 'donation',
        },
    });

    const paymentMethod = watch("paymentMethod")
    const productKey = watch("selectedProduct")

    async function createUser(values: User) {
        try {
            console.log('try')
            const res = await api.post(`/users`, values);

            if (res.data) {
                setStep(3);
            }
        } catch (error) {
            console.log(error);
        }
    }

    function handleClose() {
        setOpen(false);
        setStep(0);
    }

    function copyToClipboard() {
        const textToCopy = PRODCUTS.filter(item => item.key === productKey)[0].qrcode;
        navigator.clipboard.writeText(textToCopy);
    }

    return (
        <div className={styles.container} style={{ display: open ? 'grid' : 'none' }}>
            <form onSubmit={handleSubmit(createUser)} className="mx-auto">

                <div className={styles.close}>
                    <p onClick={() => handleClose()}>X</p>
                </div>

                {step === 0 && (
                    <div>
                        <h2>Selecione o presente:</h2>
                        <select {...register('selectedProduct')}>
                            {PRODCUTS.map(product => (
                                <option key={product.key} value={product.key} selected={product.key === selectedProduct} >{product.name}</option>
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
                        {!formState?.errors?.name && (<br />)}
                        <input name="email" id="email" {...register('email')} type="email" placeholder="Email *" />
                        {formState?.errors?.email && (<span style={{ color: 'red' }}>{formState?.errors?.email?.message}</span>)}
                        {!formState?.errors?.email && (<br />)}
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

                        <button onClick={() => paymentMethod === 'pix' ? setStep(3) : setStep(4)}>Teste</button>
                    </div>
                )}

                {step === 3 && (
                    <div>
                        <QRCode value={PRODCUTS.filter(item => item.key === productKey)[0].qrcode} />
                        <button onClick={copyToClipboard}>Copiar código Pix</button>
                    </div>
                )}


            </form>
        </div>
    )
}