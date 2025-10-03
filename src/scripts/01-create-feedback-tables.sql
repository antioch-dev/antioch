-- Creating database schema for feedback and bug submission system

-- Create feedback_categories enum
CREATE TYPE feedback_category AS ENUM ('general', 'fellowship', 'bugs');

-- Create feedback_status enum  
CREATE TYPE feedback_status AS ENUM ('new', 'in_progress', 'resolved', 'archived');

-- Create feedback_priority enum for bug reports
CREATE TYPE feedback_priority AS ENUM ('low', 'medium', 'high', 'critical');

-- Create feedback submissions table
CREATE TABLE feedback_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category feedback_category NOT NULL DEFAULT 'general',
    status feedback_status NOT NULL DEFAULT 'new',
    priority feedback_priority DEFAULT 'medium',
    contact_email VARCHAR(255),
    contact_name VARCHAR(255),
    assigned_to VARCHAR(255), -- Admin user who is handling this feedback
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    resolved_at TIMESTAMP WITH TIME ZONE,
    
    -- Additional fields for bug reports
    steps_to_reproduce TEXT,
    browser_info TEXT,
    device_info TEXT,
    screenshot_url TEXT,
    
    -- Metadata
    ip_address INET,
    user_agent TEXT
);

-- Create feedback_replies table for email communication tracking
CREATE TABLE feedback_replies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    feedback_id UUID NOT NULL REFERENCES feedback_submissions(id) ON DELETE CASCADE,
    sender_email VARCHAR(255) NOT NULL,
    sender_name VARCHAR(255),
    reply_content TEXT NOT NULL,
    is_admin_reply BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_feedback_category ON feedback_submissions(category);
CREATE INDEX idx_feedback_status ON feedback_submissions(status);
CREATE INDEX idx_feedback_created_at ON feedback_submissions(created_at DESC);
CREATE INDEX idx_feedback_assigned_to ON feedback_submissions(assigned_to);
CREATE INDEX idx_feedback_replies_feedback_id ON feedback_replies(feedback_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_feedback_updated_at 
    BEFORE UPDATE ON feedback_submissions 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample data for testing
INSERT INTO feedback_submissions (subject, description, category, contact_email, contact_name) VALUES
('Great platform!', 'I love using this platform. The interface is very intuitive and user-friendly.', 'general', 'user1@example.com', 'John Doe'),
('Fellowship application question', 'I have a question about the fellowship application process. When is the deadline?', 'fellowship', 'applicant@example.com', 'Jane Smith'),
('Login button not working', 'The login button on the homepage is not responding when clicked. Using Chrome browser.', 'bugs', 'reporter@example.com', 'Mike Johnson');
