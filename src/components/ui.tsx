import { ArrowUpRight, Check, ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { mastery, masteryLabel, type Objective } from "../lib/learning";
export function Brand({ showText = true }: { showText?: boolean }) {
  return (
    <a className="brand" href="#/" aria-label="Softwired, etusivu">
      <span className="brand-icon" aria-hidden="true">
        ✳
      </span>
      {showText && (
        <span className="brand-word">
          SOFTWIRED<span className="brand-period">.</span>
        </span>
      )}
    </a>
  );
}
export function PageHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="page-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1 tabIndex={-1}>{title}</h1>
      </div>
      {children}
    </div>
  );
}
export function ArrowLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a className="text-link" href={href}>
      {children}
      <ArrowUpRight size={17} />
    </a>
  );
}
export function StatusPill({ objective }: { objective?: Objective }) {
  const status = mastery(objective);
  return (
    <span className={`status-pill ${status}`}>
      {status === "mastered" && <Check size={12} />} {masteryLabel[status]}
      {status === "mastered" &&
      objective?.delayedRecall?.method === "self" &&
      (!objective.transfer ||
        objective.transfer.score < 3 ||
        objective.delayedRecall.at > objective.transfer.at)
        ? " · oma arvio"
        : ""}
    </span>
  );
}
export function ProgressBar({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <div
      className="progress-track"
      role="progressbar"
      aria-label={label}
      aria-valuenow={Math.round(value)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <span style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  );
}
export function EmptyState({
  icon,
  title,
  children,
  action,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="empty-state">
      <div className="empty-icon">{icon}</div>
      <h2>{title}</h2>
      <p>{children}</p>
      {action}
    </div>
  );
}
export function ButtonLink({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
}) {
  return (
    <a className={`button ${secondary ? "secondary" : ""}`} href={href}>
      {children}
      <ChevronRight size={17} />
    </a>
  );
}
export function Notice({
  children,
  kind = "",
}: {
  children: ReactNode;
  kind?: string;
}) {
  return (
    <div
      className={`notice ${kind}`}
      role={kind === "error" ? "alert" : "status"}
    >
      {children}
    </div>
  );
}
