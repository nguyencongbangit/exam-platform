import fs from 'fs';
import path from 'path';

const SETTINGS_FILE = path.join(process.cwd(), 'data', 'settings.json');

interface Settings {
  claudeApiKey?: string;
  geminiApiKey?: string;
  siteName?: string;
  siteDesc?: string;
}

export function readSettings(): Settings {
  try {
    if (!fs.existsSync(SETTINGS_FILE)) return {};
    return JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf-8'));
  } catch {
    return {};
  }
}

export function writeSettings(data: Partial<Settings>): void {
  const dir = path.dirname(SETTINGS_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const current = readSettings();
  fs.writeFileSync(SETTINGS_FILE, JSON.stringify({ ...current, ...data }, null, 2), 'utf-8');
}
