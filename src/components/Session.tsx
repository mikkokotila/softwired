import { useEffect } from "react";
import { Check, Clock3, Coffee, RotateCcw } from "lucide-react";
import { lessonById } from "../content";
import { useStudy } from "../lib/store";
import { makeFocusPlan } from "../lib/focus";
import { localDay } from "../lib/storage";
import { ButtonLink, PageHeading } from "./ui";
export function Session() {
  const { state, setState } = useStudy();
  const plan =
    state.focusPlan?.day === localDay()
      ? state.focusPlan
      : makeFocusPlan(state);
  useEffect(() => {
    setState((s) =>
      s.focusPlan?.day === localDay()
        ? s
        : { ...s, focusPlan: makeFocusPlan(s) },
    );
  }, [setState]);
  const complete = plan.items.filter((i) => i.done).length;
  return (
    <>
      <PageHeading
        eyebrow="PÄIVÄN OMA HETKI"
        title="20 minuuttia, yksi asia kerrallaan."
      />
      <p className="page-intro">
        Noin neljä viiden minuutin jaksoa. Jatka keskeneräisestä, vahvista
        muistia ja pidä lopuksi pieni tauko.
      </p>
      <div className="session-layout">
        <div className="session-list">
          {complete === plan.items.length && (
            <article className="card session-step">
              <Check />
              <div>
                <h2>Päivän neljä hetkeä ovat valmiit.</h2>
                <p>
                  Anna tiedon asettua. Voit palata huomenna uuteen polkuun tai
                  jatkaa omaan tahtiin.
                </p>
                <ButtonLink href="#/progress">Katso edistyminen</ButtonLink>
              </div>
            </article>
          )}
          {plan.items.map((item, i) => {
            const l = lessonById[item.lessonId];
            return (
              <article
                className="session-step card"
                key={`${item.kind}-${l.id}`}
              >
                <span
                  className={`section-number ${item.done ? "lime" : item.kind === "review" ? "peach" : "lilac"}`}
                >
                  {item.done ? (
                    <Check />
                  ) : item.kind === "review" ? (
                    <RotateCcw />
                  ) : (
                    String(i + 1).padStart(2, "0")
                  )}
                </span>
                <div>
                  <span className="eyebrow">
                    {item.done
                      ? "VALMIS TÄNÄÄN"
                      : item.kind === "review"
                        ? "PALAUTA MUISTISTA · NOIN 5 MIN"
                        : "OPI JA SOVELLA · NOIN 5 MIN"}
                  </span>
                  <h2>{l.title}</h2>
                  <p>{l.hook}</p>
                  {!item.done && (
                    <ButtonLink
                      href={
                        item.kind === "review"
                          ? `#/practice?lesson=${l.id}`
                          : `#/lesson/${l.id}?session=1`
                      }
                    >
                      {item.kind === "review"
                        ? "Aloita kertaus"
                        : state.drafts[l.id]
                          ? "Jatka oppituntia"
                          : "Aloita oppitunti"}
                    </ButtonLink>
                  )}
                </div>
              </article>
            );
          })}
        </div>
        <aside className="card session-aside">
          <Clock3 size={29} />
          <h2>
            {complete} / {plan.items.length} hetkeä valmiina
          </h2>
          <p>
            Yksi oppitunti vie noin viisi minuuttia. Vastauksen pohtimiseen saa
            käyttää pidempään. Edistymisesi tallentuu vaiheittain.
          </p>
          <div className="divider" />
          <Coffee size={26} />
          <h3>Muista vaihtaa asentoa.</h3>
          <p>
            Kun jakso päättyy, nouse tai liiku itsellesi sopivasti. Oppiminen
            tarvitsee myös palautumista.
          </p>
          <a className="text-link" href="#/">
            Palaa omaan päivään →
          </a>
        </aside>
      </div>
    </>
  );
}
