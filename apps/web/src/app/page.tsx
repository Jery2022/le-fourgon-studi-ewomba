import { HeroSection } from "@/components/home";
import { Container, Badge, Card } from "@le-fourgon/ui";

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* ── Comment ça marche ── */}
      <section className="section">
        <Container>
          <div className="text-center mb-10 lg:mb-14">
            <span className="text-[11px] font-bold text-fourgon-gris-moyen uppercase tracking-widest">
              Processus
            </span>
            <h2 className="mt-2">Comment ça marche ?</h2>
            <p className="text-body-md text-fourgon-gris-fonce mt-3 max-w-lg mx-auto">
              Trois étapes simples pour consommer vos boissons préférées sans générer de déchets plastique.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 stagger-children">
            {[
              { step: "1", title: "Commandez", description: "Choisissez parmi +3 000 références de boissons locales et artisanales en bouteilles consignées.", emoji: "🛒", color: "bg-amber-50" },
              { step: "2", title: "Recevez", description: "Nous vous livrons à domicile ou en point de collecte, selon le créneau de votre choix.", emoji: "🚚", color: "bg-emerald-50" },
              { step: "3", title: "Retournez", description: "Déposez vos bouteilles vides lors de la prochaine livraison. Votre consigne est remboursée.", emoji: "♻️", color: "bg-blue-50" },
            ].map((item) => (
              <Card key={item.step} hover padding="lg" className="text-center">
                <div className={`w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-2xl text-2xl ${item.color}`}>{item.emoji}</div>
                <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-fourgon-vert-foret text-white text-xs font-bold mb-3">{item.step}</div>
                <h3 className="text-heading-md mb-2">{item.title}</h3>
                <p className="text-fourgon-gris-fonce text-body-sm leading-relaxed">{item.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Impact / Stats ── */}
      <section className="section bg-fourgon-vert-clair">
        <Container size="md">
          <div className="text-center">
            <span className="text-[11px] font-bold text-fourgon-gris-moyen uppercase tracking-widest">Impact</span>
            <h2 className="mt-2 mb-4">Notre empreinte compte</h2>
            <p className="text-body-lg text-fourgon-gris-fonce mb-10 max-w-xl mx-auto">
              Chaque bouteille consignée peut être réutilisée jusqu&apos;à 40 fois. Ensemble, réduisons les déchets.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: "40×", label: "réutilisations par bouteille" },
                { value: "75%", label: "de CO₂ économisé" },
                { value: "100%", label: "recyclable" },
                { value: "0", label: "plastique" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-display-lg text-fourgon-vert-foret font-display">{stat.value}</div>
                  <div className="text-body-sm text-fourgon-gris-fonce mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── CTA BtoB ── */}
      <section className="section">
        <Container size="md">
          <Card padding="lg" className="bg-fourgon-bleu-glace text-center">
            <Badge variant="blue" className="mb-4">Professionnels</Badge>
            <h2 className="text-display-md mb-4">Vous êtes une entreprise ou une collectivité ?</h2>
            <p className="text-body-lg text-fourgon-gris-fonce mb-8 max-w-xl mx-auto">
              Offrez des boissons responsables à vos collaborateurs et événements. Tarifs dédiés, livraison adaptée, reporting RSE.
            </p>
            <a href="/btob" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-fourgon-bleu-ocean text-white text-[15px] font-bold hover:bg-blue-800 transition-colors duration-250">
              🏢 Découvrir l&apos;offre BtoB →
            </a>
          </Card>
        </Container>
      </section>
    </>
  );
}
