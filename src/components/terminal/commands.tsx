import React from "react";
import { SOCIAL_LINKS } from "./constants";
import {
  AboutOutput,
  ContactOutput,
  ExperienceOutput,
  HelpOutput,
  ProjectDetailsOutput,
  ProjectsOutput,
  SkillsOutput,
  SocialOutput,
} from "./templates";

export type CommandDefinition =
  | { type: "template"; render: () => React.ReactNode }
  | { type: "link"; url: string }
  | { type: "action"; action: "clear" | "exit" };

export const COMMAND_REGISTRY: Record<string, CommandDefinition> = {
  help: { type: "template", render: () => <HelpOutput /> },
  whoami: { type: "template", render: () => <AboutOutput /> },
  about: { type: "template", render: () => <AboutOutput /> },
  skills: { type: "template", render: () => <SkillsOutput /> },
  projects: { type: "template", render: () => <ProjectsOutput /> },
  experience: { type: "template", render: () => <ExperienceOutput /> },
  xp: { type: "template", render: () => <ExperienceOutput /> },
  social: { type: "template", render: () => <SocialOutput /> },
  contact: { type: "template", render: () => <ContactOutput /> },

  // Link commands
  github: { type: "link", url: SOCIAL_LINKS.github },
  linkedin: { type: "link", url: SOCIAL_LINKS.linkedin },
  email: { type: "link", url: SOCIAL_LINKS.email },

  // Special actions
  clear: { type: "action", action: "clear" },
  exit: { type: "action", action: "exit" },
  close: { type: "action", action: "exit" },
};

export function parseProjectCommand(input: string): { isValid: boolean; projectId?: number } {
  const parts = input.toLowerCase().trim().split(" ");
  if ((parts[0] === "pr" || parts[0] === "project") && parts.length === 2) {
    const num = Number(parts[1]);
    if (!isNaN(num) && num > 0 && num <= 3) {
      return { isValid: true, projectId: num };
    }
  }
  return { isValid: false };
}

export function renderProjectDetails(projectId: number) {
  return <ProjectDetailsOutput projectId={projectId} />;
}
