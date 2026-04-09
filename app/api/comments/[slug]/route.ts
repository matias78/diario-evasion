import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
export const dynamic = 'force-dynamic';


const COMMENTS_DIR = path.join(process.cwd(), 'data', 'comments');

// Asegurar que el directorio existe
if (!fs.existsSync(COMMENTS_DIR)) {
  fs.mkdirSync(COMMENTS_DIR, { recursive: true });
}

interface Comment {
  id: string;
  name: string;
  email?: string;
  text: string;
  date: string;
}

// GET - Obtener comentarios de un post
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const filePath = path.join(COMMENTS_DIR, `${params.slug}.json`);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ comments: [] });
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const comments = JSON.parse(fileContent);

    return NextResponse.json({ comments });
  } catch (error) {
    console.error('Error reading comments:', error);
    return NextResponse.json({ comments: [] });
  }
}

// POST - Agregar un comentario
export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const body = await request.json();
    const { name, email, text } = body;

    if (!name || !text) {
      return NextResponse.json(
        { error: 'Nombre y comentario son requeridos' },
        { status: 400 }
      );
    }

    const filePath = path.join(COMMENTS_DIR, `${params.slug}.json`);
    let comments: Comment[] = [];

    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      comments = JSON.parse(fileContent);
    }

    const newComment: Comment = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email?.trim(),
      text: text.trim(),
      date: new Date().toISOString(),
    };

    comments.push(newComment);
    fs.writeFileSync(filePath, JSON.stringify(comments, null, 2));

    return NextResponse.json({ success: true, comment: newComment });
  } catch (error) {
    console.error('Error adding comment:', error);
    return NextResponse.json(
      { error: 'Error al agregar comentario' },
      { status: 500 }
    );
  }
}
