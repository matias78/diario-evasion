import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import fs from 'fs';
import path from 'path';

const colorsFilePath = path.join(process.cwd(), 'config', 'colors.json');

export async function GET() {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Ensure config directory exists
    const configDir = path.dirname(colorsFilePath);
    if (!fs.existsSync(configDir)) {
      fs.mkdirSync(configDir, { recursive: true });
    }

    // Read colors or return defaults
    if (fs.existsSync(colorsFilePath)) {
      const colors = JSON.parse(fs.readFileSync(colorsFilePath, 'utf8'));
      return NextResponse.json(colors);
    } else {
      // Return default colors
      const defaultColors = {
        dark: {
          background: '#2b2b2b',
          foreground: '#e8e8e8',
          sidebarBg: '#1f1f1f',
          cardBg: '#333333',
          borderColor: '#4a4a4a',
          accentOrange: '#ff6b35',
        },
        light: {
          background: '#f5f5f5',
          foreground: '#1a1a1a',
          sidebarBg: '#ffffff',
          cardBg: '#ffffff',
          borderColor: '#e0e0e0',
          accentOrange: '#ff6b35',
        },
      };
      return NextResponse.json(defaultColors);
    }
  } catch (error) {
    console.error('Error reading colors:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const colors = await request.json();

    // Ensure config directory exists
    const configDir = path.dirname(colorsFilePath);
    if (!fs.existsSync(configDir)) {
      fs.mkdirSync(configDir, { recursive: true });
    }

    // Save colors
    fs.writeFileSync(colorsFilePath, JSON.stringify(colors, null, 2), 'utf8');

    // Update CSS file
    updateCSSFile(colors);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving colors:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

function updateCSSFile(colors: any) {
  const cssPath = path.join(process.cwd(), 'app', 'globals.css');
  let css = fs.readFileSync(cssPath, 'utf8');

  // Update dark theme colors
  css = css.replace(
    /:root\s*{[^}]*}/,
    `:root {
  --background: ${colors.dark.background};
  --foreground: ${colors.dark.foreground};
  --sidebar-bg: ${colors.dark.sidebarBg};
  --card-bg: ${colors.dark.cardBg};
  --border-color: ${colors.dark.borderColor};
  --accent-orange: ${colors.dark.accentOrange};
}`
  );

  // Update light theme colors
  css = css.replace(
    /\.light\s*{[^}]*}/,
    `.light {
  --background: ${colors.light.background};
  --foreground: ${colors.light.foreground};
  --sidebar-bg: ${colors.light.sidebarBg};
  --card-bg: ${colors.light.cardBg};
  --border-color: ${colors.light.borderColor};
  --accent-orange: ${colors.light.accentOrange};
}`
  );

  fs.writeFileSync(cssPath, css, 'utf8');
}
