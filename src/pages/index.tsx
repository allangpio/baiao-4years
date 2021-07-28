import { useState } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import baiao01 from '../../public/images/baiao01.jpg'
import baiao02 from '../../public/images/baiao02.jpg'
import { GiftDialog } from '../components/GiftDialog'


export default function Home() {
  const [open, setOpen] = useState(false)
  return (
    <div className={styles.container} >
      <Head>
        <link
          rel="preload"
          href="/fonts/Milho_Cozido_38.ttf"
          as="font"
          crossOrigin=""
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;600&display=swap" rel="stylesheet" />
        <title>Forró na Gruta 4 Anos </title>
        < meta name="description" content="Festa de 4 anos do Forró na Gruta - Baião Lascado convida Ana Maria Carvalho" />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.container}>
        <header className={styles.header}>
          <h1>Baião Lascado 4 anos</h1>
        </header>
      </main>

      <section className={styles.section}>

        <p>
          Viva!!! Há 4 anos nós realizávamos a primeira edição do Forró na Gruta, evento que, desde então, veio a se repetir toda segunda sexta-feira do mês. Por lá, passaram diversos convidados e são muitas histórias para contar sobre todas aquelas madrugadas de bailes de Forró de Rabeca.
        </p>
        <iframe width="100%" height="auto" src="https://www.youtube.com/embed/9wBxF7a4yD0" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        <p>Todo anos um evento muito especial acontece, que é a comemoração do nosso aniversário. Sempre com convidados, casa cheia, era tão bom que até o chão suava.</p>
        <p>Que saudades de descer aquela escadinha encrustada no meio do centro da cidade de São Paulo, do lado do Estadão, para obrigatória para tomar aquele café da manhã pós-forró.</p>
        <p>
          Assim como no nosso aniversário de 3 anos, essa edição será online, para todo mundo poder curtir com segurança e de onde estiver.
        </p>
        <p>Vamos receber uma convidada muito especial, que já esteve algumas vezes com o Baião e que tem músicas lindas, <span style={{ fontWeight: 600 }}>Ana Maria Carvalho</span>.</p>

        <Image src={baiao01} alt="Baião Lascado" />

      </section>

      <section className={styles.section} style={{ marginTop: '2rem' }}>
        <h2>Bora construir esse baile com a gente?</h2>

        <p>
          Queremos que a qualidade desse evento seja impecável, então nós vamos estar em um estúdio com captação de áudio e vídeo profissionais! Isso requer uma equipe de técnicos que garantam que tudo vai sair lindo, então a gente quer te convidar para nos ajudar a tornar essa festa possível.
        </p>

        <p>Como todo aniversário, sempre rola aquele presentinho e o melhor de tudo é que vai ser presente pra todo mundo!!!</p>
        <p>O primeiro presente, é claro, vai ser todo mundo dançando na live!</p>
        <p>Mas tem muito mais presentes:</p>

        <ul>
          <li><p>Oficina de Dança</p></li>
          <li><p>Oficina de Rabeca, Zabumba, Cavaquinho, Baixo ou Pandeiro.</p></li>
          <li><p>Camiseta do Baião Lascado</p></li>
          <li><p>Dicionário de Acordes de Cavaquinho</p></li>
          <li><p>Apostila de Frevo, Forró e Maracatu no pandeiro</p></li>
          <li><p>Passe livre de 1 ano no Forró na Gruta com acompanhante (quando os eventos presenciais puderem voltar a acontecer)</p></li>

        </ul>

        <Image src={baiao02} alt="Baião Lascado" />

      </section>

      <section className={styles.section} style={{ marginTop: '2rem' }}>
        <h2>Presentes</h2>

        <div className={styles.gifts}>
          <h3>Oficina de Pandeiro</h3>
          <p>Nosso percussionista Allan Gaia Pio, ministrará uma oficina sobre os ritmos do Forró no pandeiro, com foco na adaptação dos toques de zabumba no instrumento. Todo mundo pode participar, quem estiver começando, quem estiver num nível intermediário ou até avançado.</p>
          <p>Serão apresentados alguns conceitos de como é possível adaptar um ritmo ao pandeiro, assim como propostas de exercícios para melhorar a técnica e velocidade no instrumento.</p>
        </div>

        <div className={styles.gifts}>
          <h3>Apostila de Frevo, Forró e Maracatu no pandeiro</h3>
          <p>Apostila escrita pelo nosso percussionista Allan Gaia Pio. São mais de 200 levadas de Frevo, Forró e Maracatu para aplicar no pandeiro. Diversas técnicas são abordadas e possuí exercícios para todos os níveis de dificuldade.</p>
        </div>

      </section>

      <GiftDialog open={open} setOpen={setOpen} />
    </div>
  )
}
