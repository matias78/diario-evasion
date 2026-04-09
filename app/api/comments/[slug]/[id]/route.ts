import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { cookies } from 'next/headers';

const COMMENTS_DIR = path.join(process.cwd(), 'data', 'comments');

interface Comment {
  id: string;
  name: string;
  email?: string;
  text: string;
  date: string;
}

// DELETE - Borrar un comentario (solo admin)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string; id: string } }
) {
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

    const filePath = path.join(COMMENTS_DIR, `${params.slug}.json`);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'No se encontraron comentarios' },
        { status: 404 }
      );
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    let comments: Comment[] = JSON.parse(fileContent);

    const originalLength = comments.length;
    comments = comments.filter(comment => comment.id !== params.id);

    if (comments.length === originalLength) {
      return NextResponse.json(
        { error: 'Comentario no encontrado' },
        { status: 404 }
      );
    }

    fs.writeFileSync(filePath, JSON.stringify(comments, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting comment:', error);
    return NextResponse.json(
      { error: 'Error al borrar comentario' },
      { status: 500 }
    );
  }
}
