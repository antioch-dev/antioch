-- Church Finance Management System Database Schema

-- Users table for authentication and role management
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'member' CHECK (role IN ('admin', 'finance_committee', 'ministry_leader', 'member')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Transaction categories/tags
CREATE TABLE IF NOT EXISTS transaction_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    type VARCHAR(20) NOT NULL CHECK (type IN ('income', 'expense', 'both')),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Income transactions
CREATE TABLE IF NOT EXISTS income_transactions (
    id SERIAL PRIMARY KEY,
    amount DECIMAL(12, 2) NOT NULL CHECK (amount > 0),
    description TEXT NOT NULL,
    category_id INTEGER REFERENCES transaction_categories(id),
    transaction_date DATE NOT NULL,
    recorded_by INTEGER REFERENCES users(id),
    payment_method VARCHAR(50) DEFAULT 'cash' CHECK (payment_method IN ('cash', 'check', 'bank_transfer', 'online', 'other')),
    reference_number VARCHAR(100),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Expense transactions
CREATE TABLE IF NOT EXISTS expense_transactions (
    id SERIAL PRIMARY KEY,
    amount DECIMAL(12, 2) NOT NULL CHECK (amount > 0),
    description TEXT NOT NULL,
    category_id INTEGER REFERENCES transaction_categories(id),
    transaction_date DATE NOT NULL,
    recorded_by INTEGER REFERENCES users(id),
    payment_method VARCHAR(50) DEFAULT 'cash' CHECK (payment_method IN ('cash', 'check', 'bank_transfer', 'online', 'other')),
    vendor VARCHAR(255),
    receipt_url VARCHAR(500),
    reference_number VARCHAR(100),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Budget requests
CREATE TABLE IF NOT EXISTS budget_requests (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    requested_amount DECIMAL(12, 2) NOT NULL CHECK (requested_amount > 0),
    requested_by INTEGER REFERENCES users(id),
    ministry_department VARCHAR(100),
    purpose TEXT NOT NULL,
    timeline_start DATE,
    timeline_end DATE,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'denied', 'under_review')),
    approved_by INTEGER REFERENCES users(id),
    approved_amount DECIMAL(12, 2),
    approval_date TIMESTAMP,
    approval_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Church assets
CREATE TABLE IF NOT EXISTS assets (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100) NOT NULL,
    purchase_date DATE,
    purchase_price DECIMAL(12, 2),
    current_value DECIMAL(12, 2),
    condition VARCHAR(50) DEFAULT 'good' CHECK (condition IN ('excellent', 'good', 'fair', 'poor', 'needs_repair')),
    location VARCHAR(255),
    serial_number VARCHAR(100),
    warranty_expiry DATE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_income_date ON income_transactions(transaction_date);
CREATE INDEX IF NOT EXISTS idx_expense_date ON expense_transactions(transaction_date);
CREATE INDEX IF NOT EXISTS idx_income_category ON income_transactions(category_id);
CREATE INDEX IF NOT EXISTS idx_expense_category ON expense_transactions(category_id);
CREATE INDEX IF NOT EXISTS idx_budget_status ON budget_requests(status);
CREATE INDEX IF NOT EXISTS idx_assets_category ON assets(category);
