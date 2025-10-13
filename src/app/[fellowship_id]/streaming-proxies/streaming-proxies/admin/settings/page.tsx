'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Settings, RotateCcw, Activity, AlertTriangle, Shield } from 'lucide-react';

import AdminErrorBoundary from '../_components/AdminErrorBoundary';
import SettingsCategory from './_components/SettingsCategory';
import SettingsConfirmationDialog from './_components/SettingsConfirmationDialog';
import { useSystemSettings } from '@/lib/streaming-proxies/hooks/useSystemSettings';
import { useSettingsChangeTracking } from '@/lib/streaming-proxies/hooks/useSettingsChangeTracking';
import { type SettingValue } from '@/lib/streaming-proxies/types';

// Create compatible types based on the child component expectations
interface SettingsChange {
  key: string;
  oldValue: SettingValue;
  newValue: SettingValue;
  description: string;
}

// Type for settings updates
interface SettingsUpdate {
  key: string;
  value: SettingValue | null;
}

export default function SystemSettings() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string>('general');
  const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);
  const [pendingChanges, setPendingChanges] = useState<SettingsChange[]>([]);

  const {
    settings,
    categories,
    isLoading,
    error: _error,
    updateSetting: _updateSetting,
    updateMultipleSettings,
    refreshSettings,
    getSettingsByCategory,
    hasUnsavedChanges: _hasUnsavedChanges
  } = useSystemSettings();

  const {
    trackChange,
    clearAllChanges,
    hasChanges,
  } = useSettingsChangeTracking();

  const handleCategorySave = async (categoryId: string, categoryChanges: Record<string, SettingValue>) => {
    try {
      const changesArray: SettingsChange[] = Object.entries(categoryChanges).map(([key, newValue]) => ({
        key,
        oldValue: settings[key]?.value ?? null,
        newValue,
        description: settings[key]?.description || `Updated ${key}`
      }));

      // Check if any changes are critical and require confirmation
      const criticalChanges = changesArray.filter(change => 
        change.key.includes('maintenance_mode') || 
        change.key.includes('security') ||
        change.key.includes('max_concurrent')
      );

      if (criticalChanges.length > 0) {
        setPendingChanges(changesArray);
        setShowConfirmDialog(true);
        return;
      }

      // Apply changes directly for non-critical settings
      await applyChanges(changesArray);
    } catch (err) {
      console.error('Failed to save category settings:', err);
      alert('Failed to save settings. Please try again.');
    }
  };

  const applyChanges = async (changesArray: SettingsChange[], reason?: string) => {
    try {
      const updates: SettingsUpdate[] = changesArray
        .filter(change => change.newValue !== null)
        .map(change => ({
          key: change.key,
          value: change.newValue!
        })) as Array<{ key: string; value: SettingValue}>;

      await updateMultipleSettings(updates , reason);

      // Track changes for audit
      changesArray.forEach(change => {
        trackChange(change.key, change.oldValue, change.newValue, change.description);
      });

      alert('Settings saved successfully!');
    } catch (err) {
      console.error('Failed to apply changes:', err);
      throw err;
    }
  };

  const handleConfirmChanges = async (reason?: string) => {
    try {
      await applyChanges(pendingChanges, reason);
      setShowConfirmDialog(false);
      setPendingChanges([]);
    } catch (err) {
      alert('Failed to save settings. Please try again.');
    }
  };

  const handleCategoryReset = (categoryId: string) => {
    // Reset changes for this category
    const categorySettings = getSettingsByCategory(categoryId);
    categorySettings.forEach(_setting => {
      clearAllChanges();
    });
    alert(`${categoryId} settings reset to original values`);
  };

  const getCategoryIcon = (categoryId: string) => {
    switch (categoryId) {
      case 'general':
        return <Settings className="h-4 w-4" />;
      case 'performance':
        return <Activity className="h-4 w-4" />;
      case 'security':
        return <Shield className="h-4 w-4" />;
      case 'monitoring':
        return <Activity className="h-4 w-4" />;
      default:
        return <Settings className="h-4 w-4" />;
    }
  };

  if (isLoading) {
    return (
      <AdminErrorBoundary pageName="System Settings" showAdminActions={true}>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading system settings...</p>
          </div>
        </div>
      </AdminErrorBoundary>
    );
  }

  return (
    <AdminErrorBoundary pageName="System Settings" showAdminActions={true}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  onClick={() => router.push('/streaming-proxies/admin')}
                  className="mr-4"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
                  <p className="text-sm text-gray-500">Configure global system settings</p>
                </div>
              </div>
              <div className="flex gap-2">
                {hasChanges && (
                  <Button variant="outline" onClick={clearAllChanges} className="gap-2">
                    <RotateCcw className="h-4 w-4" />
                    Clear Changes
                  </Button>
                )}
                <Button onClick={refreshSettings} variant="outline" className="gap-2">
                  <Settings className="h-4 w-4" />
                  Refresh
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Settings Categories */}
            <div className="lg:col-span-1">
              <Card className="p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-4">Settings Categories</h3>
                <nav className="space-y-1">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors ${
                        activeCategory === category.id
                          ? 'bg-blue-100 text-blue-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {getCategoryIcon(category.id)}
                      {category.name}
                    </button>
                  ))}
                </nav>
              </Card>
            </div>

            {/* Settings Content */}
            <div className="lg:col-span-3">
              {categories.find(cat => cat.id === activeCategory) && (
                <SettingsCategory
                  category={categories.find(cat => cat.id === activeCategory)!}
                  settings={getSettingsByCategory(activeCategory)}
                  onSave={handleCategorySave}
                  onReset={handleCategoryReset}
                  isLoading={isLoading}
                />
              )}
            </div>
          </div>
        </div>

        <SettingsConfirmationDialog
          isOpen={showConfirmDialog}
          onClose={() => {
            setShowConfirmDialog(false);
            setPendingChanges([]);
          }}
          onConfirm={handleConfirmChanges}
          changes={pendingChanges}
          isLoading={isLoading}
        />
      </div>
    </AdminErrorBoundary>
  );
}