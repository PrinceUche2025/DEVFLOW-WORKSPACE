export type UserRole = 'owner' | 'editor' | 'viewer';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: UserRole;
}

export type DocumentType = 'markdown' | 'code' | 'snippet';

export interface DocumentItem {
  id: string;
  title: string;
  content: string;
  type: DocumentType;
  language?: string;
  folderId: string | null;
  createdAt: string;
  updatedAt: string;
  lastEditedBy: string;
}

export interface WorkspaceFolder {
  id: string;
  name: string;
  parentId: string | null;
}

export interface UserPresence {
  userId: string;
  documentId: string | null;
  cursorPosition?: { line: number; column: number };
  lastActive: string;
}

export interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  content?: string;
  children?: FileItem[];
}