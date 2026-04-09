import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

const COMMENTS_DIR = path.join(process.cwd(), 'data', 'comments');

interface Comment {
  id: string;
  name: string;
  email?: string;
  text: string;
  date: string;
}

export async function GET() {
  try {
    // Verificar autenticación
    const cookieStore = await cookies();
    const isAuthenticated = cookieStore.get('authenticated')?.value === 'true';

    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    if (!fs.existsSync(COMMENTS_DIR)) {
      return NextResponse.json({ commentGroups: [] });
    }

    const files = fs.readdirSync(COMMENTS_DIR).filter(file => file.endsWith('.json'));
    const commentGroups = files.map(file => {
      const postSlug = file.replace('.json', '');
      const filePath = path.join(COMMENTS_DIR, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const comments: Comment[] = JSON.parse(fileContent);

      return {
        postSlug,
        comments: comments.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
      };
    });

    // Ordenar por cantidad de comentarios (descendente)
    commentGroups.sort((a, b) => b.comments.length - a.comments.length);

    return NextResponse.json({ commentGroups });
  } catch (error) {
    console.error('Error reading comments:', error);
    return NextResponse.json(
      { error: 'Error al leer comentarios' },
      { status: 500 }
    );
  }
}
