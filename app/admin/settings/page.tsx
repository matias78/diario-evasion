import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import SettingsPage from '@/components/admin/SettingsPage';

export default async function AdminSettingsPage() {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect('/admin/login');
  }

  return <SettingsPage />;
}
