'use client';

import { useState, useCallback, useEffect } from 'react';

interface SettingChange<T> {
  key: string;
  oldValue: T;
  newValue: T;
  timestamp: Date;
  description?: string;
}

interface UseSettingsChangeTrackingReturn<T> {
  changes: Record<string, SettingChange<T>>;
  trackChange: (key: string, oldValue: T, newValue: T, description?: string) => void;
  clearChange: (key: string) => void;
  clearAllChanges: () => void;
  hasChanges: boolean;
  changeCount: number;
  getChangesArray: () => SettingChange<T>[];
  getChangesByCategory: (categoryId: string, settings: Record<string, { category: string }>) => SettingChange<T>[];
  undoChange: (key: string) => T | undefined;
  getChangeDescription: (key: string) => string;
}

export function useSettingsChangeTracking<T>(): UseSettingsChangeTrackingReturn<T> {
  const [changes, setChanges] = useState<Record<string, SettingChange<T>>>({});

  const trackChange = useCallback((
    key: string, 
    oldValue: T, 
    newValue: T, 
    description?: string
  ) => {
    if (oldValue === newValue) {
      setChanges(prev => {
        const newChanges = { ...prev };
        delete newChanges[key];
        return newChanges;
      });
      return;
    }

    setChanges(prev => ({
      ...prev,
      [key]: {
        key,
        oldValue,
        newValue,
        timestamp: new Date(),
        description
      }
    }));
  }, []);

  const clearChange = useCallback((key: string) => {
    setChanges(prev => {
      const newChanges = { ...prev };
      delete newChanges[key];
      return newChanges;
    });
  }, []);

  const clearAllChanges = useCallback(() => {
    setChanges({});
  }, []);

  const getChangesArray = useCallback((): SettingChange<T>[] => {
    return Object.values(changes).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }, [changes]);

  const getChangesByCategory = useCallback((
    categoryId: string, 
    settings: Record<string, { category: string }>
  ): SettingChange<T>[] => {
    return Object.values(changes).filter(change => {
      const setting = settings[change.key];
      return setting?.category === categoryId;
    }).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }, [changes]);

  const undoChange = useCallback((key: string): T | undefined => {
    const change = changes[key];
    if (change) {
      clearChange(key);
      return change.oldValue;
    }
    return undefined;
  }, [changes, clearChange]);

  const getChangeDescription = useCallback((key: string): string => {
    const change = changes[key];
    if (!change) return '';

    const settingName = key.split('.').pop()?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || key;
    
    const formatValue = (value: T): string => {
      if (typeof value === 'boolean') {
        return value ? 'Enabled' : 'Disabled';
      }
      if (value === null || value === undefined || value === '') {
        return '(empty)';
      }
      if (typeof value === 'string' && value.length > 50) {
        return value.substring(0, 47) + '...';
      }
      return String(value);
    };

    return `${settingName}: ${formatValue(change.oldValue)} → ${formatValue(change.newValue)}`;
  }, [changes]);

  const hasChanges = Object.keys(changes).length > 0;
  const changeCount = Object.keys(changes).length;

  useEffect(() => {
    const cleanup = () => {
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
      setChanges(prev => {
        const filtered = Object.fromEntries(
          Object.entries(prev).filter(([_, change]) => change.timestamp > oneHourAgo)
        );
        return filtered;
      });
    };

    const interval = setInterval(cleanup, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return {
    changes,
    trackChange,
    clearChange,
    clearAllChanges,
    hasChanges,
    changeCount,
    getChangesArray,
    getChangesByCategory,
    undoChange,
    getChangeDescription,
  };
}
