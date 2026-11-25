// Fictitious data in the format of the Harness Agents-view API (maxxing.data).
const svg = (c) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="${c}"/><circle cx="16" cy="13" r="6" fill="#fff"/><rect x="8" y="21" width="16" height="8" rx="4" fill="#fff"/></svg>`;
const now = new Date().toISOString();
const ag = (project, name, status, text, color, extra = {}) => ({
  path: `${project}/main/${name}`, project, topic: "main", name,
  display_name: name[0].toUpperCase() + name.slice(1), description: `${name} agent`,
  enabled: status !== "off", model: "sonnet", status, status_text: text, cost_today: 0.42,
  last_run: { at: now, kind: "cron", ok: status !== "failed", text },
  avatar_svg: svg(color), route: `/agents/${project}/main/${name}`, chat_route: `/chat/${project}/main/${name}`, ...extra,
});
export const data = (lang = "en") => ({
  lang, new_agent_route: "/agents/new",
  projects: [
    { name: "Webshop", emoji: "🛒", color: "#3b82f6", agents: [
      ag("webshop", "ada", "running", "Updating product feed", "#3b82f6"),
      ag("webshop", "leo", "idle", "Idle", "#3b82f6"),
      ag("webshop", "mia", "waiting", "Refund needs approval", "#3b82f6"),
    ]},
    { name: "Blog", emoji: "✍️", color: "#10b981", agents: [
      ag("blog", "noah", "running", "Drafting weekly post", "#10b981"),
      ag("blog", "zoe", "unread", "New comments to review", "#10b981"),
      ag("blog", "sam", "off", "Disabled", "#10b981"),
    ]},
    { name: "Ops", emoji: "🛠️", color: "#f59e0b", agents: [
      ag("ops", "kai", "failed", "Backup failed: disk full", "#f59e0b"),
      ag("ops", "eva", "running", "Applying security updates", "#f59e0b"),
      ag("ops", "max", "idle", "Idle", "#f59e0b"),
      ag("ops", "ivy", "idle", "Idle", "#f59e0b"),
    ]},
  ],
});
