// apps/web/app/(dashboard)/documents/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Document {
  id: string;
  type: string; // "invoice", "contract", etc.
  status: 'pending' | 'analyzed' | 'error';
  fileUrl?: string;
  createdAt: string;
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      // TODO: Replace with your real API endpoint
      const res = await fetch('http://localhost:3001/api/documents/user-123');
      const data = await res.json();
      setDocuments(data);
    } catch (error) {
      console.error('Failed to fetch documents:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">📎 Documents</h1>

      {/* Quick Actions */}
      <div className="flex gap-4 mb-6">
        <Link
          href="/documents/upload"
          className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-100 transition"
        >
          Upload New Document
        </Link>
      </div>

      {/* Documents Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Uploaded At</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr key={doc.id} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-2">{doc.type}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-semibold ${
                      doc.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : doc.status === 'analyzed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {doc.status}
                  </span>
                </td>
                <td className="px-4 py-2">{new Date(doc.createdAt).toLocaleDateString('de-DE')}</td>
                <td className="px-4 py-2 flex gap-2">
                  {doc.fileUrl && (
                    <Link
                      href={doc.fileUrl}
                      target="_blank"
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </Link>
                  )}
                  <button
                    className="text-green-600 hover:underline"
                    onClick={() => alert('Analyze document: ' + doc.id)}
                  >
                    Analyze
                  </button>
                </td>
              </tr>
            ))}
            {documents.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-gray-500">
                  No documents found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}