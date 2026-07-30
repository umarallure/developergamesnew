"use client";

import {
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type KeyboardEvent,
} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Check,
  ChevronDown,
  CircleAlert,
  FileText,
  Plus,
  Upload,
  X,
} from "lucide-react";
import { SpecularButton } from "@/components/ui/specular-button";
import { EXPERIENCE_OPTIONS, SKILL_SUGGESTIONS } from "@/lib/constants";
import { applicationSchema, type ApplicationInput } from "@/lib/validation";
import { cn } from "@/lib/utils";

const MAX_SKILLS = 24;

type FormStatus = "idle" | "sending" | "sent" | "error" | "unconfigured";

const LABEL_CLASS = "mb-2 block text-sm font-medium text-foreground";

const INPUT_CLASS =
  "w-full rounded-md border border-line bg-surface px-4 py-3 text-[0.95rem] text-foreground transition-colors placeholder:text-muted/80 focus:border-line-active";

const NOTICE_CHIP_CLASS =
  "inline-flex items-center rounded-[4px] border px-2 py-0.5 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.18em]";

const CONTACT_EMAIL = "contact@accidentpayments.com";

function ContactMailtoLink() {
  return (
    <a
      href={`mailto:${CONTACT_EMAIL}`}
      className="underline underline-offset-4"
    >
      {CONTACT_EMAIL}
    </a>
  );
}

const CHIP_BASE_CLASS =
  "inline-flex items-center gap-1.5 rounded-[8px] border px-3.5 py-2 text-sm transition-colors";

const CHIP_IDLE_CLASS =
  "border-line text-muted hover:border-line-active hover:text-foreground";

const CHIP_SELECTED_CLASS =
  "border-line-active bg-surface-elevated text-foreground";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 flex items-center gap-1.5 text-sm text-danger">
      <CircleAlert size={14} aria-hidden="true" className="shrink-0" />
      {message}
    </p>
  );
}

function formatMegabytes(bytes: number): string {
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function ApplicationForm() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    resetField,
    formState: { errors, isSubmitted },
  } = useForm<ApplicationInput>({
    resolver: zodResolver(applicationSchema),
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      skills: [],
    },
  });

  const [status, setStatus] = useState<FormStatus>("idle");
  const [customSkills, setCustomSkills] = useState<string[]>([]);
  const [customSkillDraft, setCustomSkillDraft] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);

  const selectedSkills = watch("skills") ?? [];
  const experienceValue = watch("experience") as string | undefined;
  const cvFile = watch("cv") as File | undefined;

  const updateSkills = (next: string[]) => {
    setValue("skills", next, {
      shouldValidate: isSubmitted,
      shouldDirty: true,
    });
  };

  const toggleSuggestedSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      updateSkills(selectedSkills.filter((entry) => entry !== skill));
      return;
    }
    if (selectedSkills.length >= MAX_SKILLS) return;
    updateSkills([...selectedSkills, skill]);
  };

  const addCustomSkill = () => {
    const raw = customSkillDraft.trim();
    if (!raw) return;

    // Matches a suggestion (case-insensitive): select the canonical chip.
    const suggestion = SKILL_SUGGESTIONS.find(
      (entry) => entry.toLowerCase() === raw.toLowerCase(),
    );
    if (suggestion) {
      if (
        !selectedSkills.includes(suggestion) &&
        selectedSkills.length < MAX_SKILLS
      ) {
        updateSkills([...selectedSkills, suggestion]);
      }
      setCustomSkillDraft("");
      return;
    }

    const alreadySelected = selectedSkills.some(
      (entry) => entry.toLowerCase() === raw.toLowerCase(),
    );
    if (alreadySelected) {
      setCustomSkillDraft("");
      return;
    }

    if (selectedSkills.length >= MAX_SKILLS) return;
    setCustomSkills((current) => [...current, raw]);
    updateSkills([...selectedSkills, raw]);
    setCustomSkillDraft("");
  };

  const removeCustomSkill = (skill: string) => {
    setCustomSkills((current) => current.filter((entry) => entry !== skill));
    updateSkills(selectedSkills.filter((entry) => entry !== skill));
  };

  const onCustomSkillKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addCustomSkill();
    }
  };

  const applyCvFile = (file: File | undefined) => {
    if (!file) return;
    setValue("cv", file, { shouldValidate: true, shouldDirty: true });
  };

  const onCvChange = (event: ChangeEvent<HTMLInputElement>) => {
    applyCvFile(event.target.files?.[0]);
  };

  const onCvDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);
    applyCvFile(event.dataTransfer.files?.[0]);
  };

  const removeCvFile = () => {
    resetField("cv");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onValid = async (data: ApplicationInput) => {
    setStatus("sending");

    const body = new FormData();
    body.append("fullName", data.fullName);
    body.append("email", data.email);
    body.append("phone", data.phone);
    body.append("experience", data.experience);
    for (const skill of data.skills) {
      body.append("skills", skill);
    }
    body.append("cv", data.cv);
    body.append("extra_field", honeypotRef.current?.value ?? "");

    try {
      const response = await fetch("/api/apply", { method: "POST", body });
      if (response.ok) {
        setStatus("sent");
        return;
      }
      if (response.status === 503) {
        const payload = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        if (payload?.error === "not_configured") {
          setStatus("unconfigured");
          return;
        }
      }
      setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  const onFormChange = () => {
    if (status === "sent") setStatus("idle");
  };

  return (
    <form
      data-reveal
      noValidate
      onSubmit={handleSubmit(onValid)}
      onChange={onFormChange}
      className="grid gap-5 sm:grid-cols-2"
    >
      <p className="tech-label sm:col-span-2">ALL FIELDS REQUIRED</p>

      {/* Honeypot — hidden from real users, checked server-side */}
      {/* Honeypot — a neutral name/label so browser autofill never touches
          it; real users never see or fill it, naive bots do. */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="extra-field">Leave this field empty</label>
        <input
          ref={honeypotRef}
          id="extra-field"
          name="extra_field"
          type="text"
          tabIndex={-1}
          autoComplete="one-time-code"
        />
      </div>

      {/* Full name */}
      <div>
        <label htmlFor="fullName" className={LABEL_CLASS}>
          Full name
        </label>
        <input
          id="fullName"
          type="text"
          autoComplete="name"
          placeholder="Ada Lovelace"
          aria-invalid={errors.fullName ? true : undefined}
          aria-describedby={errors.fullName ? "fullName-error" : undefined}
          className={cn(INPUT_CLASS, errors.fullName && "border-danger")}
          {...register("fullName")}
        />
        <FieldError id="fullName-error" message={errors.fullName?.message} />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className={LABEL_CLASS}>
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="you@example.com"
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={cn(INPUT_CLASS, errors.email && "border-danger")}
          {...register("email")}
        />
        <FieldError id="email-error" message={errors.email?.message} />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className={LABEL_CLASS}>
          Phone
        </label>
        <input
          id="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          placeholder="+30 690 000 0000"
          aria-invalid={errors.phone ? true : undefined}
          aria-describedby={errors.phone ? "phone-error" : undefined}
          className={cn(INPUT_CLASS, errors.phone && "border-danger")}
          {...register("phone")}
        />
        <FieldError id="phone-error" message={errors.phone?.message} />
      </div>

      {/* Experience */}
      <div>
        <label htmlFor="experience" className={LABEL_CLASS}>
          Experience
        </label>
        <div className="relative">
          <select
            id="experience"
            aria-invalid={errors.experience ? true : undefined}
            aria-describedby={
              errors.experience ? "experience-error" : undefined
            }
            className={cn(
              INPUT_CLASS,
              "appearance-none pr-10",
              !experienceValue && "text-muted/80",
              errors.experience && "border-danger",
            )}
            {...register("experience")}
          >
            <option value="">Select your experience</option>
            {EXPERIENCE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted"
          />
        </div>
        <FieldError
          id="experience-error"
          message={errors.experience?.message}
        />
      </div>

      {/* Skills */}
      <fieldset className="sm:col-span-2">
        <legend className="mb-3 block text-sm font-medium text-foreground">
          Skills
        </legend>
        <div className="flex flex-wrap gap-2">
          {SKILL_SUGGESTIONS.map((skill) => {
            const selected = selectedSkills.includes(skill);
            return (
              <button
                key={skill}
                type="button"
                aria-pressed={selected}
                onClick={() => toggleSuggestedSkill(skill)}
                className={cn(
                  CHIP_BASE_CLASS,
                  selected ? CHIP_SELECTED_CLASS : CHIP_IDLE_CLASS,
                )}
              >
                {selected ? (
                  <Check
                    size={13}
                    aria-hidden="true"
                    className="text-brand-light"
                  />
                ) : null}
                {skill}
              </button>
            );
          })}

          {customSkills.map((skill) => (
            <span
              key={skill}
              className={cn(CHIP_BASE_CLASS, CHIP_SELECTED_CLASS, "pr-2")}
            >
              {skill}
              <button
                type="button"
                aria-label={`Remove ${skill}`}
                onClick={() => removeCustomSkill(skill)}
                className="rounded-[4px] p-0.5 text-muted transition-colors hover:text-foreground"
              >
                <X size={13} aria-hidden="true" />
              </button>
            </span>
          ))}
        </div>

        <div className="mt-3 flex gap-2">
          <input
            type="text"
            value={customSkillDraft}
            onChange={(event) => setCustomSkillDraft(event.target.value)}
            onKeyDown={onCustomSkillKeyDown}
            aria-label="Add a custom skill"
            aria-describedby={errors.skills ? "skills-error" : undefined}
            placeholder="Add another skill…"
            maxLength={64}
            className={cn(INPUT_CLASS, "max-w-xs py-2.5")}
          />
          <button
            type="button"
            onClick={addCustomSkill}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-line px-3.5 text-sm text-muted transition-colors hover:border-line-active hover:text-foreground"
          >
            <Plus size={14} aria-hidden="true" />
            Add
          </button>
        </div>

        <FieldError id="skills-error" message={errors.skills?.message} />
      </fieldset>

      {/* CV upload */}
      <div className="sm:col-span-2">
        <span className={LABEL_CLASS}>CV</span>
        <div
          className="relative"
          onDragOver={(event: DragEvent<HTMLDivElement>) => {
            event.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={onCvDrop}
        >
          <input
            ref={fileInputRef}
            id="cv"
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            aria-label="CV upload"
            aria-invalid={errors.cv ? true : undefined}
            aria-describedby={errors.cv ? "cv-error" : undefined}
            // With a file selected the drop-zone label (and its
            // peer-focus-visible affordance) unmounts, which would leave
            // this sr-only input as an invisible tab stop — remove it from
            // the tab order; the visible Remove button covers interaction.
            tabIndex={cvFile ? -1 : undefined}
            onChange={onCvChange}
            className="peer sr-only"
          />
          {cvFile ? (
            <div className="flex items-center gap-3 rounded-md border border-line bg-surface px-4 py-3">
              <FileText
                size={18}
                aria-hidden="true"
                className="shrink-0 text-brand-light"
              />
              <span className="min-w-0 flex-1 truncate text-sm text-foreground">
                {cvFile.name}
              </span>
              <span className="shrink-0 text-sm text-muted">
                {formatMegabytes(cvFile.size)}
              </span>
              <button
                type="button"
                aria-label="Remove file"
                onClick={removeCvFile}
                className="shrink-0 rounded-[4px] p-1 text-muted transition-colors hover:text-foreground"
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>
          ) : (
            <label
              htmlFor="cv"
              className={cn(
                "block cursor-pointer rounded-md border border-dashed border-line bg-surface px-6 py-8 text-center transition-colors hover:border-line-active",
                "peer-focus-visible:border-line-active peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-energy",
                dragActive && "border-line-active bg-surface-elevated",
                errors.cv && "border-danger",
              )}
            >
              <Upload
                size={20}
                aria-hidden="true"
                className="mx-auto text-muted"
              />
              <span className="mt-3 block text-sm text-foreground">
                Drop your CV here or{" "}
                <span className="text-brand-light underline decoration-line-active underline-offset-4">
                  browse
                </span>
              </span>
              <span className="mt-1.5 block text-sm text-muted">
                PDF, DOC or DOCX · up to 10 MB
              </span>
            </label>
          )}
        </div>
        <FieldError id="cv-error" message={errors.cv?.message} />
      </div>

      {/* Submit + submission status */}
      <div className="mt-2 sm:col-span-2">
        <SpecularButton
          type="submit"
          size="md"
          disabled={status === "sending"}
          className="w-full sm:w-auto"
        >
          {status === "sending"
            ? "Sending application…"
            : "Submit application"}
        </SpecularButton>

        <div role="status">
          {status === "sending" ? (
            <p className="sr-only">Sending your application.</p>
          ) : null}
          {status === "sent" ? (
            <div className="mt-5 rounded-md border border-line-active bg-surface-elevated px-5 py-4">
              <span
                className={cn(
                  NOTICE_CHIP_CLASS,
                  "border-line text-brand-light",
                )}
              >
                Received
              </span>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Application sent. It goes straight to our team at{" "}
                {CONTACT_EMAIL} — we&apos;ll reply by email.
              </p>
            </div>
          ) : null}
        </div>

        <div role="alert">
          {status === "error" ? (
            <div className="mt-5 rounded-md border border-danger/60 bg-surface px-5 py-4">
              <p className="flex items-start gap-2 text-sm leading-relaxed text-muted">
                <CircleAlert
                  size={15}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-danger"
                />
                <span>
                  Something went wrong and your application was not sent.
                  Email it to us directly at <ContactMailtoLink />.
                </span>
              </p>
            </div>
          ) : null}
          {status === "unconfigured" ? (
            <div className="mt-5 rounded-md border border-danger/60 bg-surface px-5 py-4">
              <span
                className={cn(
                  NOTICE_CHIP_CLASS,
                  "border-danger/60 text-danger",
                )}
              >
                Offline
              </span>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Submissions aren&apos;t connected to the mail server yet. Send
                your application directly to <ContactMailtoLink />.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </form>
  );
}
