import { Container, Button, Badge, Card } from "@le-fourgon/ui";

export default function HomePage() {
  return (
    <>
      {/* ── Hero Section ── */}
      <section className="section bg-gradient-fourgon">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="green" className="mb-6">
              🍾 Économie circulaire
            </Badge>

            <h1 className="mb-6">
              Vos boissons préférées,{" "}
              <span className="text-fourgon-vert-prairie">en consigne</span>
            </h1>

            <p className="text-body-lg text-fourgon-gris-fonce mb-8 max-w-2xl mx-auto">
              Le Fourgon vous livre bières, jus, eaux et sodas en bouteilles
              consignées. Vous buvez, on récupère, on lave, on re-remplit.
              Simple, écologique, local.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                Découvrir nos produits
              </Button>
              <Button variant="outline" size="lg">
                Comment ça marche ?
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Comment ça marche ── */}
      <section className="section">
        <Container>
          <h2 className="text-center mb-12">Comment ça marche ?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 stagger-children">
            {[
              {
                step: "1",
                title: "Commandez",
                description:
                  "Choisissez parmi notre sélection de boissons locales et artisanales en bouteilles consignées.",
                emoji: "🛒",
              },
              {
                step: "2",
                title: "Recevez",
                description:
                  "Nous vous livrons à domicile ou en point de collecte, selon votre créneau préféré.",
                emoji: "🚚",
              },
              {
                step: "3",
                title: "Retournez",
                description:
                  "Déposez vos bouteilles vides lors de la prochaine livraison. Votre consigne est remboursée.",
                emoji: "♻️",
              },
            ].map((item) => (
              <Card key={item.step} hover padding="lg" className="text-center">
                <div className="text-4xl mb-4">{item.emoji}</div>
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-fourgon-vert-foret text-white text-body-sm font-bold mb-3">
                  {item.step}
                </div>
                <h3 className="text-heading-md mb-2">{item.title}</h3>
                <p className="text-fourgon-gris-fonce">{item.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Engagement écologique ── */}
      <section className="section bg-fourgon-vert-clair">
        <Container size="md">
          <div className="text-center">
            <h2 className="mb-6">Notre impact</h2>
            <p className="text-body-lg text-fourgon-gris-fonce mb-10">
              Chaque bouteille consignée peut être réutilisée jusqu&apos;à 40
              fois. Ensemble, réduisons les déchets.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: "40×", label: "réutilisations par bouteille" },
                { value: "75%", label: "de CO₂ économisé" },
                { value: "100%", label: "recyclable" },
                { value: "0", label: "plastique" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-display-lg text-fourgon-vert-foret font-display">
                    {stat.value}
                  </div>
                  <div className="text-body-sm text-fourgon-gris-fonce mt-1">
                    {stat.label}
                  </div>
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
            <Badge variant="blue" className="mb-4">
              Professionnels
            </Badge>
            <h2 className="text-display-md mb-4">
              Vous êtes une entreprise ou une collectivité ?
            </h2>
            <p className="text-body-lg text-fourgon-gris-fonce mb-8 max-w-xl mx-auto">
              Offrez des boissons responsables à vos collaborateurs et
              événements. Tarifs dédiés et livraison adaptée.
            </p>
            <Button variant="primary" size="lg">
              Découvrir l&apos;offre BtoB
            </Button>
          </Card>
        </Container>
      </section>
    </>
  );
}
