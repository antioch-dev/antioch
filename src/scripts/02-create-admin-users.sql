-- Creating admin users table for authentication

-- Create admin_roles enum
CREATE TYPE admin_role AS ENUM ('admin', 'fellowship_manager', 'developer');

-- Create admin users table
CREATE TABLE admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    role admin_role NOT NULL DEFAULT 'admin',
    password_hash TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE
);

-- Create index for email lookups
CREATE INDEX idx_admin_users_email ON admin_users(email);

-- Create trigger to update updated_at for admin_users
CREATE TRIGGER update_admin_users_updated_at 
    BEFORE UPDATE ON admin_users 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample admin users (passwords should be hashed in real implementation)
INSERT INTO admin_users (email, name, role, password_hash) VALUES
('admin@example.com', 'System Admin', 'admin', '$2b$10$example_hash_for_admin'),
('fellowship@example.com', 'Fellowship Manager', 'fellowship_manager', '$2b$10$example_hash_for_fellowship'),
('dev@example.com', 'Developer', 'developer', '$2b$10$example_hash_for_dev');
