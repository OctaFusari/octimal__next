'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import AnimateInView from '@/components/ui/AnimateInView'
import SplitText from '@/components/ui/SplitText'
import { fadeUp, fadeLeft, fadeRight, scaleIn, staggerContainer } from '@/lib/motionVariants'

const ThreeRings = dynamic(() => import('@/components/three/ThreeRings'), { ssr: false })

const TIPS_RINGS = [
  {
    position: [4.8, 1.2, -2] as [number, number, number],
    rotation: [0.3, 0.7, -0.2] as [number, number, number],
    scale: 1.3,
    speedX: 0.003, speedY: 0.004, speedZ: 0.005,
    tubeRadius: 0.08,
    color1: '#00C9A7', color2: '#7B4FD8',
    floatAmp: 0.18, floatFreq: 0.6, phase: 0.4,
  },
  {
    position: [-4, -1.8, -3] as [number, number, number],
    rotation: [-0.9, 0.5, 0.6] as [number, number, number],
    scale: 1.05,
    speedX: -0.004, speedY: 0.003, speedZ: 0.006,
    tubeRadius: 0.07,
    color1: '#7B4FD8', color2: '#00C9A7',
    floatAmp: 0.22, floatFreq: 0.45, phase: 2.8,
  },
]

const CATEGORIES = ['Tutti', 'Carico Cognitivo', 'Percezione', 'Sistemi Critici', 'Ricerca', 'Design Patterns']

const TIPS = [
  {
    num: '01',
    category: 'Carico Cognitivo',
    title: '4 chunk, non 7: ripensare il limite della working memory',
    headline: 'Il cervello non è un database. Progetta di conseguenza.',
    readTime: '4 min',
    tags: ['Cognitive Load', 'Miller\'s Law', 'HF Engineering'],
    featured: true,
    body: `Miller's Law viene spesso citato come "il cervello umano può gestire 7 ± 2 elementi". Il problema è che questa interpretazione porta a interfacce con 9 opzioni in un menu, 8 colonne in una tabella, 7 step in un wizard.

La ricerca più recente (Cowan, 2001 e successivi) indica che la working memory ha una capacità di circa **4 chunk** — non 7. E un "chunk" è già un'unità semanticamente compressa: "codice fiscale" è un chunk, i 16 caratteri che lo compongono sono 16 chunk separati.

**In pratica questo significa:**

Ogni elemento aggiuntivo in un'interfaccia ha un costo cognitivo reale. Non percepito, reale. In sistemi complessi — cockpit, sale operative, interfacce mediche — questo costo si accumula fino al punto di rottura.

La soluzione non è nascondere le informazioni. È raggrupparle semanticamente, gerarchizzarle visivamente, eliminarle quando non servono. Un'interfaccia che mostra meno ma mostra quello che conta è sempre superiore.`,
    principle: '"Less, but better." — Dieter Rams',
  },
  {
    num: '02',
    category: 'Percezione',
    title: 'Gestalt nei sistemi complessi: la distanza come grammatica visiva',
    headline: 'Gli elementi vicini vengono percepiti come correlati. Sempre.',
    readTime: '3 min',
    tags: ['Gestalt', 'Visual Design', 'Information Architecture'],
    featured: false,
    body: `I principi della Gestalt non sono una curiosità psicologica degli anni '20. Sono il firmware della percezione umana — immutabile, universale, implacabile.

Nei sistemi complessi, il principio di **prossimità** è lo strumento più potente (e più abusato). Raggruppare visivamente riduce il tempo di lettura fino al 35% su dashboard operative. Ma la prossimità mal gestita crea relazioni false che l'operatore accetta come reali.

Caso reale: una control room in cui il tasto di arresto di emergenza era visivamente raggruppato con i controlli di supervisione routinari. Nessuno incidente, ma decine di near-miss rilevati durante l'audit. La distanza fisica non bastava — serviva una gerarchia visiva esplicita.

**Regola pratica:** se due elementi non devono essere usati insieme, non devono stare vicini. Se devono essere usati insieme, farli stare vicini non basta — serve un contenitore visivo esplicito.`,
    principle: '"La forma segue la funzione, ma la percezione precede entrambe."',
  },
  {
    num: '03',
    category: 'Sistemi Critici',
    title: 'Error prevention vs error recovery: dove investire',
    headline: 'Non correggere gli errori. Rendili impossibili da commettere.',
    readTime: '5 min',
    tags: ['Error Analysis', 'Safety', 'Human Factors'],
    featured: false,
    body: `La gerarchia di Nielsen pone la prevenzione degli errori al quarto posto degli euristica di usabilità. Ma nei sistemi critici, prevenzione e recovery non sono sullo stesso piano — sono in categorie diverse.

In un'interfaccia consumer, un errore di navigazione costa due tap. In un sistema medico, un errore di dosaggio può costare una vita. In aviazione, un errore di configurazione può costare tutto.

**La gerarchia di intervento in HF Engineering:**

1. **Eliminazione**: rimuovi la possibilità che l'errore esista (vincoli fisici o logici)
2. **Sostituzione**: sostituisci il processo rischioso con uno sicuro by design
3. **Riduzione**: riduci la probabilità attraverso affordance e feedback
4. **Rilevazione**: fai sì che l'errore venga rilevato prima delle conseguenze
5. **Mitigazione**: limita i danni quando l'errore accade

La maggior parte dei designer opera al livello 3-4. I Human Factors Engineer lavorano al livello 1-2. La differenza non è estetica — è sistemica.`,
    principle: '"Design per l\'operatore peggiore nella sua giornata peggiore."',
  },
  {
    num: '04',
    category: 'Sistemi Critici',
    title: 'Situational Awareness: progettare per la consapevolezza operativa',
    headline: 'Se l\'operatore non capisce cosa sta succedendo, l\'interfaccia ha fallito.',
    readTime: '6 min',
    tags: ['SA', 'Endsley', 'Cognitive Engineering'],
    featured: false,
    body: `Il modello di Situational Awareness di Mica Endsley (1995) è uno dei framework più citati nell'ingegneria umana. E anche uno dei più fraintesi.

SA non è "quanto l'utente conosce il sistema". È la capacità dell'operatore di percepire lo stato del sistema (livello 1), comprenderlo nel suo significato operativo (livello 2) e proiettarne l'evoluzione futura (livello 3).

**Le cause di SA degradata:**

- Overload informativo (troppo da percepire)
- Design ambiguo (percepisco ma non comprendo)
- Mancanza di trend data (capisco ora ma non domani)
- Automazione opaca (il sistema decide senza spiegare)

Quest'ultimo punto è critico nell'era dell'AI. Sistemi di supporto decisionale che forniscono output senza ragionamento degradano la SA dell'operatore fino al punto in cui diventa dipendente dalla macchina — e incapace di gestire il fallimento della macchina.

**Progettare per la SA significa:**

Mostrare stato E tendenza. Non solo "pressione: 4.2 bar" ma "pressione: 4.2 bar ↑ +0.3 in 10 min". La proiezione è l'elemento più difficile da progettare e il più prezioso.`,
    principle: '"L\'automazione deve aumentare la SA, non sostituirla."',
  },
  {
    num: '05',
    category: 'Ricerca',
    title: 'Contextual Inquiry: perché osservare vale più di chiedere',
    headline: 'Le persone non sanno cosa fanno davvero finché non le guardi farlo.',
    readTime: '4 min',
    tags: ['UX Research', 'Methods', 'Field Studies'],
    featured: false,
    body: `La contextual inquiry è uno dei metodi di ricerca più potenti e meno utilizzati nel design di prodotto. Non perché sia difficile — ma perché richiede di uscire dall'ufficio.

Il principio fondamentale: il comportamento reale diverge sempre dal comportamento dichiarato. Le persone razionalizzano ciò che fanno, spesso in modo inconscio. In un'intervista, descrivono il processo come vorrebbero che fosse. Nel loro contesto operativo, mostrano come è davvero.

**Esempio concreto:** durante un audit su un sistema di gestione farmaci in ospedale, le infermiere dichiaravano di seguire sempre il protocollo in tre passi. L'osservazione sul campo rivelava un workaround consolidato in due passi che violava il protocollo — ma era più veloce e, in quel contesto, più sicuro. Il sistema non era progettato per il flusso reale.

**Come fare contextual inquiry:**

Vai dove lavora l'utente. Guarda senza giudicare. Fai domande su ciò che vedi, non su ciò che pensi di sapere. Documenta le anomalie — sono dove vive il design reale.`,
    principle: '"Non chiedere cosa farebbero. Guarda cosa fanno."',
  },
  {
    num: '06',
    category: 'Design Patterns',
    title: 'Feedback loops: i tre tempi di risposta che ogni designer deve conoscere',
    headline: 'Ogni azione deve ricevere una risposta. Sempre. Entro tempi precisi.',
    readTime: '3 min',
    tags: ['Feedback', 'Response Time', 'Interaction Design'],
    featured: false,
    body: `La regola dei tre tempi di risposta di Nielsen è del 1993. Nel 2024 è più rilevante che mai — perché i sistemi sono diventati più lenti (cloud, AI, API remote) mentre le aspettative degli utenti sono aumentate.

**I tre limiti:**

- **0.1 secondi**: l'utente percepisce la risposta come immediata. La causa e l'effetto sembrano collegati.
- **1 secondo**: l'utente nota il ritardo ma mantiene il flusso mentale. Nessun feedback necessario, ma utile.
- **10 secondi**: il limite massimo di attenzione per un task senza perdere il filo. Oltre questo, l'utente fa altro.

Nei sistemi critici, questi limiti sono più stringenti. Un allarme che impiega 3 secondi a rispondere a un'interazione è percepito come rotto — e viene ignorato o aggirato.

**Pattern per sistemi lenti:**

Non aspettare che la risposta sia pronta per dare feedback. Conferma immediatamente l'azione (0.1s), mostra progresso reale, gestisci gli stati intermedi come parte dell'esperienza — non come eccezioni.`,
    principle: '"Un sistema che non risponde è un sistema rotto, anche se funziona."',
  },
  {
    num: '07',
    category: 'Ricerca',
    title: 'Eye-tracking nei sistemi complessi: oltre le heatmap',
    headline: 'Sapere dove guardano è solo il primo passo. Il vero dato è dove non guardano.',
    readTime: '5 min',
    tags: ['Eye-Tracking', 'Research Methods', 'Attention'],
    featured: false,
    body: `L'eye-tracking è diventato accessibile. Occhiali wireless, webcam-based tracking, integrazione nei prototipi. Questo ha democratizzato lo strumento — ma non la capacità di interpretarlo.

La heatmap è lo strumento più condiviso e meno utile. Mostra dove le persone guardano in media, aggregando comportamenti individuali in un blob colorato che oscura le differenze critiche.

**Cosa guardare invece:**

- **Percorsi di scansione**: l'ordine in cui gli elementi vengono fissati. Rivela il modello mentale più dell'ordine di lettura.
- **Aree ignorate**: le zone che nessun partecipante guarda. Spesso contengono informazioni che il designer ritiene critiche.
- **Regressioni**: quando l'occhio torna indietro su un elemento già visto. Segnala ambiguità o incoerenza.
- **Tempo al primo sguardo**: quanto impiega un elemento critico ad essere notato. In sistemi di allarme, questo è il dato più importante.

In un audit su una sala operatoria, abbiamo scoperto che il display dello SpO2 veniva fissato in media dopo 8 secondi dall'inizio di un'anomalia. Il display era presente, visibile, correttamente dimensionato. Ma non era nel percorso naturale di scansione dell'anestesista. Soluzione: non renderlo più grande, ma spostarlo nel percorso.`,
    principle: '"Il problema non è l\'elemento invisibile. È il percorso visivo che non lo incontra."',
  },
  {
    num: '08',
    category: 'Carico Cognitivo',
    title: 'Alarm fatigue: quando troppi allarmi significano nessun allarme',
    headline: 'Un sistema con 200 allarmi attivi non ha allarmi. Ha rumore.',
    readTime: '4 min',
    tags: ['Alarm Management', 'Healthcare', 'Safety'],
    featured: false,
    body: `L'alarm fatigue è uno dei problemi più documentati e meno risolti nei sistemi critici. In molte terapie intensive, il 90% degli allarmi è non-azionabile — falsi positivi, soglie mal calibrate, eventi clinicamente irrilevanti.

Il risultato è prevedibile e documentato: gli operatori sviluppano un'assuefazione sistematica. Disabilitano gli allarmi, abbassano i volumi, imparano a ignorare i segnali visivi. L'allarme critico che arriva nel mezzo di questa cascata viene perso.

**La gerarchia degli allarmi funziona solo se la piramide è rispettata:**

- Emergenza (richiede azione immediata): < 5% degli allarmi totali
- Priorità alta (richiede azione rapida): < 15%
- Attenzione (richiede monitoraggio): il resto

Nella realtà di molti sistemi, il 40-60% degli allarmi è classificato come "priorità alta". Il che significa che nessuno lo è davvero.

**Progettare contro l'alarm fatigue:**

Non è un problema di design visivo. È un problema di architettura del sistema. Le soglie devono essere validate con operatori reali nel loro contesto operativo — non impostate da ingegneri in laboratorio.`,
    principle: '"Ogni allarme che viene ignorato è un allarme che non esiste."',
  },
]

export default function TipsPage() {
  const [activeCategory, setActiveCategory] = useState('Tutti')
  const [openTip, setOpenTip] = useState<string | null>(null)

  const filtered =
    activeCategory === 'Tutti'
      ? TIPS
      : TIPS.filter((t) => t.category === activeCategory)

  return (
    <div style={{ background: 'var(--dark)' }}>

      {/* ─── HERO ─── */}
      <section
        className="relative overflow-hidden"
        style={{ paddingTop: '10rem', paddingBottom: '6rem', paddingLeft: '10vw', paddingRight: '10vw', background: 'var(--dark)' }}
      >
        <div className="absolute inset-0">
          <ThreeRings configs={TIPS_RINGS} />
        </div>
        <div
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse 70% 80% at 12% 55%, rgba(10,10,10,0.93) 0%, transparent 65%)',
          }}
        />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px' }}>
          <AnimateInView variants={fadeUp}>
            <p className="section-label" style={{ marginBottom: '2rem' }}>UX/UI Tips</p>
          </AnimateInView>
          <SplitText
            text="Principi che fanno la differenza nei sistemi complessi."
            tag="h1"
            once={false}
            style={{
              fontFamily: 'var(--font-montserrat)',
              fontWeight: 300,
              fontSize: 'clamp(2.8rem, 6vw, 5rem)',
              letterSpacing: '-0.025em',
              lineHeight: 1.08,
              color: 'var(--light)',
            } as React.CSSProperties}
          />
          <AnimateInView variants={fadeUp} delay={0.35} className="mt-6">
            <p
              style={{
                fontFamily: 'var(--font-outfit)',
                fontSize: '1rem',
                color: 'var(--muted)',
                lineHeight: 1.85,
                maxWidth: '520px',
                fontWeight: 300,
              }}
            >
              Insights distillati da anni di ricerca sul campo. Human Factors, UX Research,
              Cognitive Engineering. Applicabili ovunque, critici nei sistemi ad alto rischio.
            </p>
          </AnimateInView>

          {/* Stats row */}
          <AnimateInView variants={fadeUp} delay={0.5} className="mt-12 flex gap-10">
            {[['8', 'Articoli'], ['6', 'Categorie'], ['~35 min', 'Lettura totale']].map(([n, l]) => (
              <div key={l}>
                <div
                  style={{
                    fontFamily: 'var(--font-montserrat)',
                    fontWeight: 700,
                    fontSize: '1.8rem',
                    background: 'linear-gradient(135deg, var(--teal), var(--purple))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: 1,
                    marginBottom: '4px',
                  }}
                >
                  {n}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-outfit)',
                    fontSize: '0.7rem',
                    color: 'var(--muted)',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                  }}
                >
                  {l}
                </div>
              </div>
            ))}
          </AnimateInView>
        </div>
      </section>

      {/* ─── FILTER TABS ─── */}
      <section style={{ background: 'var(--dark2)', padding: '0 10vw' }}>
        <AnimateInView variants={fadeUp}>
          <div
            style={{
              display: 'flex',
              gap: '0',
              overflowX: 'auto',
              borderBottom: '1px solid rgba(255,255,255,0.07)',
              paddingTop: '3rem',
            }}
          >
            {CATEGORIES.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                whileHover={{ color: '#F0EDE8' }}
                style={{
                  fontFamily: 'var(--font-outfit)',
                  fontSize: '0.8rem',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  background: 'none',
                  border: 'none',
                  color: cat === activeCategory ? '#F0EDE8' : '#6B6B65',
                  padding: '1rem 1.5rem',
                  cursor: 'none',
                  whiteSpace: 'nowrap',
                  position: 'relative',
                  transition: 'color 0.3s',
                }}
                data-cursor
              >
                {cat}
                {cat === activeCategory && (
                  <motion.div
                    layoutId="tips-tab"
                    style={{
                      position: 'absolute',
                      bottom: '-1px',
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: 'linear-gradient(90deg, var(--teal), var(--purple))',
                    }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </AnimateInView>

        {/* ─── TIPS GRID ─── */}
        <div style={{ padding: '5rem 0 8rem' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                  gap: '1.5rem',
                }}
              >
                {filtered.map((tip, i) => (
                  <motion.article
                    key={tip.num}
                    variants={fadeUp}
                    whileHover={{ borderColor: 'rgba(0,201,167,0.22)', y: -4 }}
                    onClick={() =>
                      setOpenTip(openTip === tip.num ? null : tip.num)
                    }
                    style={{
                      background: 'var(--dark3)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: '1.25rem',
                      padding: '2.5rem',
                      cursor: 'none',
                      transition: 'border-color 0.35s, transform 0.35s',
                      gridColumn:
                        tip.featured && activeCategory === 'Tutti'
                          ? 'span 2'
                          : 'span 1',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                    data-cursor
                  >
                    {/* Gradient top bar */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.7, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0,
                        height: '2px',
                        background: 'linear-gradient(90deg, var(--teal), var(--purple))',
                        transformOrigin: 'left',
                      }}
                    />

                    {/* Card header */}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '1.5rem',
                      }}
                    >
                      <div>
                        <span
                          style={{
                            fontFamily: 'var(--font-outfit)',
                            fontSize: '0.65rem',
                            letterSpacing: '0.2em',
                            color: 'var(--purple)',
                            textTransform: 'uppercase',
                          }}
                        >
                          {tip.num} — {tip.category}
                        </span>
                      </div>
                      <span
                        style={{
                          fontFamily: 'var(--font-outfit)',
                          fontSize: '0.7rem',
                          color: 'var(--muted)',
                          letterSpacing: '0.06em',
                        }}
                      >
                        {tip.readTime}
                      </span>
                    </div>

                    {/* Featured: 2-col layout */}
                    {tip.featured && activeCategory === 'Tutti' ? (
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
                        <div>
                          <h3
                            style={{
                              fontFamily: 'var(--font-montserrat)',
                              fontWeight: 600,
                              fontSize: '1.25rem',
                              color: 'var(--light)',
                              lineHeight: 1.35,
                              marginBottom: '1rem',
                            }}
                          >
                            {tip.title}
                          </h3>
                          <p
                            style={{
                              fontFamily: 'var(--font-outfit)',
                              fontSize: '0.88rem',
                              color: 'var(--muted)',
                              lineHeight: 1.82,
                            }}
                          >
                            {tip.headline}
                          </p>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '1.5rem' }}>
                            {tip.tags.map((tag) => (
                              <span
                                key={tag}
                                style={{
                                  fontFamily: 'var(--font-outfit)',
                                  fontSize: '0.68rem',
                                  padding: '0.22rem 0.7rem',
                                  border: '1px solid rgba(0,201,167,0.25)',
                                  borderRadius: '2rem',
                                  color: 'var(--teal)',
                                  letterSpacing: '0.06em',
                                }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div
                            style={{
                              fontFamily: 'var(--font-montserrat)',
                              fontStyle: 'italic',
                              fontWeight: 300,
                              fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
                              background: 'linear-gradient(135deg, var(--teal), var(--purple))',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              lineHeight: 1.2,
                            }}
                          >
                            "{tip.principle.replace(/^"|"$/g, '')}"
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <h3
                          style={{
                            fontFamily: 'var(--font-montserrat)',
                            fontWeight: 600,
                            fontSize: '1.05rem',
                            color: 'var(--light)',
                            lineHeight: 1.4,
                            marginBottom: '0.75rem',
                          }}
                        >
                          {tip.title}
                        </h3>
                        <p
                          style={{
                            fontFamily: 'var(--font-outfit)',
                            fontSize: '0.85rem',
                            color: 'var(--muted)',
                            lineHeight: 1.8,
                            marginBottom: '1.25rem',
                          }}
                        >
                          {tip.headline}
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                          {tip.tags.map((tag) => (
                            <span
                              key={tag}
                              style={{
                                fontFamily: 'var(--font-outfit)',
                                fontSize: '0.65rem',
                                padding: '0.2rem 0.6rem',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '2rem',
                                color: 'var(--muted)',
                                letterSpacing: '0.05em',
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </>
                    )}

                    {/* Expand indicator */}
                    <motion.div
                      animate={{ rotate: openTip === tip.num ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        position: 'absolute',
                        bottom: '1.5rem',
                        right: '1.5rem',
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        border: '1px solid rgba(255,255,255,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--muted)',
                        fontSize: '0.9rem',
                      }}
                    >
                      +
                    </motion.div>

                    {/* Expanded content */}
                    <AnimatePresence>
                      {openTip === tip.num && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div
                            style={{
                              paddingTop: '2rem',
                              marginTop: '2rem',
                              borderTop: '1px solid rgba(255,255,255,0.07)',
                            }}
                          >
                            {tip.body.split('\n\n').map((para, pi) => (
                              <p
                                key={pi}
                                style={{
                                  fontFamily: 'var(--font-outfit)',
                                  fontSize: '0.9rem',
                                  color: para.startsWith('**')
                                    ? 'var(--light)'
                                    : 'var(--muted)',
                                  lineHeight: 1.9,
                                  marginBottom: '1.2rem',
                                }}
                                dangerouslySetInnerHTML={{
                                  __html: para
                                    .replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--light)">$1</strong>')
                                    .replace(/- (.*?)(?=\n|$)/g, '• $1'),
                                }}
                              />
                            ))}
                            {/* Principle callout */}
                            <div
                              style={{
                                marginTop: '2rem',
                                padding: '1.25rem 1.5rem',
                                borderLeft: '2px solid var(--teal)',
                                background: 'rgba(0,201,167,0.04)',
                                borderRadius: '0 0.5rem 0.5rem 0',
                              }}
                            >
                              <p
                                style={{
                                  fontFamily: 'var(--font-montserrat)',
                                  fontStyle: 'italic',
                                  fontWeight: 300,
                                  fontSize: '0.95rem',
                                  color: 'var(--light)',
                                  lineHeight: 1.6,
                                }}
                              >
                                {tip.principle}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.article>
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ─── NEWSLETTER / CTA ─── */}
      <section
        style={{
          background: 'var(--dark)',
          padding: '10rem 10vw',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse at 50% 50%, rgba(123,79,216,0.05) 0%, transparent 60%)',
            pointerEvents: 'none',
          }}
        />
        <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <AnimateInView variants={fadeUp}>
            <p className="section-label" style={{ justifyContent: 'center', marginBottom: '2rem' }}>
              Rimani aggiornato
            </p>
          </AnimateInView>
          <SplitText
            text="Nuovi tip ogni due settimane."
            tag="h2"
            once={false}
            style={{
              fontFamily: 'var(--font-montserrat)',
              fontWeight: 300,
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              letterSpacing: '-0.025em',
              lineHeight: 1.1,
              color: 'var(--light)',
              textAlign: 'center',
            } as React.CSSProperties}
          />
          <AnimateInView variants={fadeUp} delay={0.3} className="mt-6">
            <p
              style={{
                fontFamily: 'var(--font-outfit)',
                fontSize: '0.95rem',
                color: 'var(--muted)',
                lineHeight: 1.88,
              }}
            >
              UX Tips, case study e insight su Human Factors e sistemi complessi.
              Niente spam. Solo contenuto che vale il tuo tempo.
            </p>
          </AnimateInView>
          <AnimateInView variants={fadeUp} delay={0.45} className="mt-10">
            <div
              style={{
                display: 'flex',
                maxWidth: '460px',
                margin: '0 auto',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '3rem',
                overflow: 'hidden',
                background: 'rgba(255,255,255,0.03)',
              }}
            >
              <input
                type="email"
                placeholder="La tua email"
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  padding: '1rem 1.5rem',
                  fontFamily: 'var(--font-outfit)',
                  fontSize: '0.88rem',
                  color: '#F0EDE8',
                }}
              />
              <motion.button
                whileHover={{ paddingRight: '2rem', background: '#00b896' }}
                transition={{ duration: 0.3 }}
                style={{
                  background: 'var(--teal)',
                  border: 'none',
                  padding: '1rem 1.5rem',
                  color: '#0A0A0A',
                  fontFamily: 'var(--font-outfit)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  cursor: 'none',
                  transition: 'background 0.3s, padding 0.3s',
                  whiteSpace: 'nowrap',
                }}
                data-cursor
              >
                Iscriviti →
              </motion.button>
            </div>
          </AnimateInView>
        </div>
      </section>
    </div>
  )
}
