import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import { registerSW } from "virtual:pwa-register";
import {
  BarChart3,
  BookOpen,
  ChevronRight,
  Download,
  FileText,
  Home,
  Menu,
  RotateCcw,
  Settings2,
  ShieldCheck,
  Sparkles,
  WifiOff,
  X,
  Zap,
} from "lucide-react";
import { lessonById } from "./content";
import { useOnline, useRoute } from "./lib/hooks";
import { useStudy } from "./lib/store";
import { Dashboard } from "./components/Dashboard";
import { Course } from "./components/Course";
import { LessonPlayer } from "./components/LessonPlayer";
import { Practice } from "./components/Practice";
import { Exam } from "./components/Exam";
import { Tutor } from "./components/Tutor";
import { Progress } from "./components/Progress";
import { Settings } from "./components/Settings";
import { Session } from "./components/Session";
import { Brand, ButtonLink, EmptyState, Notice } from "./components/ui";
interface InstallPrompt extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: string }>;
}
const nav = [
  { href: "/", label: "Tänään", icon: Home },
  { href: "/course", label: "Oppimispolku", icon: BookOpen },
  { href: "/practice", label: "Kertaa", icon: RotateCcw },
  { href: "/exam", label: "Harjoituskoe", icon: FileText },
  { href: "/tutor", label: "AI-opettaja", icon: Sparkles },
  { href: "/progress", label: "Edistyminen", icon: BarChart3 },
];
export default function App() {
  const route = useRoute();
  const path = route.split("?")[0];
  const params = new URLSearchParams(route.split("?")[1]);
  const online = useOnline();
  const { state, setState, storageError } = useStudy();
  const [menu, setMenu] = useState(false);
  const [offlineError, setOfflineError] = useState(false);
  const [offlineReady, setOfflineReady] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<InstallPrompt | null>(
    null,
  );
  const sidebar = useRef<HTMLElement>(null);
  const updateSW = useRef<((reload?: boolean) => Promise<void>) | null>(null);
  const onboarding = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    updateSW.current = registerSW({
      immediate: true,
      onOfflineReady: () => setOfflineReady(true),
      onRegisterError: () => setOfflineError(true),
      onNeedRefresh: () => setUpdateAvailable(true),
      onRegisteredSW: (_url, registration) => {
        if (registration?.active && navigator.serviceWorker.controller)
          setOfflineReady(true);
      },
    });
    const install = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as InstallPrompt);
    };
    window.addEventListener("beforeinstallprompt", install);
    return () => window.removeEventListener("beforeinstallprompt", install);
  }, []);
  useEffect(() => {
    if (!menu) return;
    const previous = document.activeElement as HTMLElement | null;
    const targets = () =>
      Array.from(
        sidebar.current?.querySelectorAll<HTMLElement>("a[href], button") ?? [],
      ).filter((el) => el.getClientRects().length);
    targets()[0]?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(false);
        return;
      }
      if (e.key !== "Tab") return;
      const list = targets();
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("keydown", key);
      previous?.focus();
    };
  }, [menu]);
  useEffect(() => {
    if (!state.onboarded) onboarding.current?.showModal();
    else onboarding.current?.close();
  }, [state.onboarded]);
  const lessonId = path.startsWith("/lesson/") ? path.slice(8) : undefined;
  const lesson =
    lessonId && Object.hasOwn(lessonById, lessonId)
      ? lessonById[lessonId]
      : undefined;
  const active =
    path.startsWith("/lesson/") || path === "/session" ? "/course" : path;
  let content: ReactNode;
  if (path === "/") content = <Dashboard />;
  else if (path === "/course")
    content = (
      <Course
        key={params.get("group") ?? ""}
        group={params.get("group") ?? ""}
      />
    );
  else if (path === "/practice")
    content = (
      <Practice
        key={params.get("lesson") ?? "queue"}
        initialLesson={params.get("lesson") ?? undefined}
      />
    );
  else if (path === "/exam") content = <Exam />;
  else if (path === "/tutor") content = <Tutor />;
  else if (path === "/progress") content = <Progress />;
  else if (path === "/session") content = <Session />;
  else if (path === "/settings")
    content = (
      <Settings
        offlineReady={offlineReady}
        install={
          installPrompt
            ? async () => {
                await installPrompt.prompt();
                await installPrompt.userChoice;
                setInstallPrompt(null);
              }
            : undefined
        }
        updateAvailable={updateAvailable}
        update={() => void updateSW.current?.(true)}
      />
    );
  else if (lesson)
    content = (
      <LessonPlayer
        key={lesson.id}
        lesson={lesson}
        session={params.has("session")}
      />
    );
  else
    content = (
      <EmptyState
        icon={<BookOpen />}
        title="Tätä sivua ei löytynyt."
        action={<ButtonLink href="#/course">Avaa oppimispolku</ButtonLink>}
      >
        Oppitunti on voinut siirtyä. Kaikki 13 osiota löytyvät oppimispolusta.
      </EmptyState>
    );
  return (
    <div className="app-shell">
      <a
        href="#main-content"
        className="skip-link"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("main-content")?.focus();
        }}
      >
        Siirry sisältöön
      </a>
      <aside
        ref={sidebar}
        role={menu ? "dialog" : undefined}
        aria-modal={menu || undefined}
        aria-label={menu ? "Sivuvalikko" : undefined}
        className={`sidebar ${menu ? "menu-open" : ""}`}
      >
        <div className="sidebar-top">
          <Brand />
          <button
            className="icon-button mobile-close"
            onClick={() => setMenu(false)}
            aria-label="Sulje valikko"
          >
            <X size={21} />
          </button>
        </div>
        <div className="course-label">
          <span className="course-label-icon">
            <BookOpen size={17} />
          </span>
          <div>
            TERVEYSTIETO 8<small>Sinun seuraava oivalluksesi</small>
          </div>
          <span className="live-dot" />
        </div>
        <span className="nav-label">OMA OPPIMINEN</span>
        <nav className="main-nav" aria-label="Päävalikko">
          {nav.map((n) => (
            <a
              key={n.href}
              href={`#${n.href}`}
              aria-current={active === n.href ? "page" : undefined}
              className={active === n.href ? "active" : ""}
              onClick={() => setMenu(false)}
            >
              <n.icon size={19} />
              <span>{n.label}</span>
              {n.href === "/tutor" && <span className="ai-mini">AI</span>}
              {active === n.href && (
                <ChevronRight className="nav-chevron" size={16} />
              )}
            </a>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-note">
            <span className="small-spark">✳</span>
            <p>
              Et opettele vain
              <br />
              koetta varten.
              <br />
              <strong>Opettelet elämää varten.</strong>
            </p>
          </div>
          <a
            href="#/settings"
            className={`settings-link ${active === "/settings" ? "active" : ""}`}
            onClick={() => setMenu(false)}
          >
            <Settings2 size={18} /> Asetukset<span>↗</span>
          </a>
          <div className="local-label">
            <ShieldCheck size={13} />
            Oma rauha. Omat tiedot.
          </div>
        </div>
      </aside>
      {menu && (
        <button
          className="menu-backdrop"
          aria-label="Sulje sivuvalikko"
          onClick={() => setMenu(false)}
        />
      )}
      <div className="app-main" inert={menu}>
        <header className="topbar">
          <div className="mobile-header">
            <button
              className="icon-button"
              onClick={() => setMenu(true)}
              aria-label="Avaa valikko"
              aria-expanded={menu}
            >
              <Menu size={22} />
            </button>
            <Brand />
          </div>
          <span className="topbar-breadcrumb">
            OMA OPPIMISTILA <ChevronRight size={13} />
            <strong>
              {nav.find((n) => n.href === active)?.label ?? "Asetukset"}
            </strong>
          </span>
          <div className="topbar-right">
            <span className="topbar-subject">
              <span className="live-dot" /> Terveystieto 8
            </span>
            <a
              href="#/settings"
              className="profile-button"
              aria-label="Omat asetukset"
            >
              <Zap size={18} />
            </a>
          </div>
        </header>
        <main
          id="main-content"
          tabIndex={-1}
          className={`page ${lesson ? "lesson-page" : ""}`}
        >
          {offlineError && (
            <Notice kind="error">
              Offline-tallennus epäonnistui. Tarkista selaimen tallennusluvat ja
              lataa sivu uudelleen verkossa.
            </Notice>
          )}
          {!online && (
            <Notice>
              <WifiOff size={16} />
              Offline-tila: opiskelu jatkuu tällä laitteella. AI odottaa
              verkkoyhteyttä.
            </Notice>
          )}
          {storageError && (
            <Notice kind="error">
              {storageError} <a href="#/settings">Avaa varmuuskopiointi</a>
            </Notice>
          )}
          {state.activeExam && path !== "/exam" && (
            <Notice>
              Harjoituskoe on käynnissä ja ajastin jatkuu.{" "}
              <a href="#/exam">Palaa kokeeseen →</a>
            </Notice>
          )}
          {updateAvailable && (
            <Notice>
              <Download size={17} />
              Uusi versio on valmis.{" "}
              <a href="#/settings">Ota päivitys käyttöön asetuksista</a>
            </Notice>
          )}
          <AppErrorBoundary key={path}>{content}</AppErrorBoundary>
          <footer className="page-footer">
            <span>
              KIPINÄ <span className="footer-dot">✳</span> Pieni hetki,
              vahvempi osaaminen.
            </span>
            <a href="#/settings">Tietosuoja ja lähteet</a>
          </footer>
        </main>
      </div>
      <nav className="bottom-nav" inert={menu} aria-label="Mobiilin päävalikko">
        {nav
          .filter((n) => !["/progress", "/exam"].includes(n.href))
          .map((n) => (
            <a
              href={`#${n.href}`}
              key={n.href}
              aria-current={active === n.href ? "page" : undefined}
              className={active === n.href ? "active" : ""}
            >
              <n.icon size={21} />
              <span>{n.label}</span>
            </a>
          ))}
        <button onClick={() => setMenu(true)} aria-label="Lisää sivuja">
          <Menu size={21} />
          <span>Lisää</span>
        </button>
      </nav>
      <dialog
        ref={onboarding}
        className="onboarding-dialog"
        onCancel={(e) => e.preventDefault()}
        aria-labelledby="onboarding-title"
      >
        <div className="onboarding-content">
          <span className="onboarding-mark">
            <Zap size={36} fill="currentColor" />
          </span>
          <p className="eyebrow">TERVETULOA KIPINÄÄN</p>
          <h2 id="onboarding-title">
            Oppiminen alkaa
            <br />
            yhdestä oivalluksesta.
          </h2>
          <p>
            Oma rauhallinen paikka terveystiedon kokeeseen valmistautumiseen.
            Kaikki 13 osiota ovat täällä, selitettyinä omin sanoin.
          </p>
          <div className="onboarding-points">
            <div>
              <BookOpen size={20} />
              <span>
                <strong>Ymmärrä ensin.</strong> 52 pientä oppituntia ja
                esimerkkiä.
              </span>
            </div>
            <div>
              <RotateCcw size={20} />
              <span>
                <strong>Muista omilla sanoillasi.</strong> Kertaukset ja
                soveltavat koetehtävät.
              </span>
            </div>
            <div>
              <ShieldCheck size={20} />
              <span>
                <strong>Omat tiedot omalla laitteella.</strong>AI lähettää
                tietoja vain pyynnöstä ja suostumuksella.
              </span>
            </div>
          </div>
          <button
            className="button"
            autoFocus
            onClick={() => setState((s) => ({ ...s, onboarded: true }))}
          >
            Aloita oma oppimispolku
            <ArrowRightIcon />
          </button>
          <small>Ei tiliä. Ei suorituspainetta. Omaan tahtiin.</small>
        </div>
      </dialog>
    </div>
  );
}
function ArrowRightIcon() {
  return <ChevronRight size={18} />;
}
class AppErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <div className="card empty-state">
        <h1>Näkymää ei voitu avata.</h1>
        <p>
          Tallennettu edistyminen säilyy selaimessa. Kokeile ladata sivu
          uudelleen tai vie varmuuskopio asetuksista.
        </p>
        <a className="button" href="#/settings">
          Avaa asetukset
        </a>
        <button
          className="text-button"
          onClick={() => window.location.reload()}
        >
          Lataa sivu uudelleen
        </button>
      </div>
    ) : (
      this.props.children
    );
  }
}
