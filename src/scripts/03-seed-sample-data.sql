-- Sample data for testing (optional - can be run in development)

-- Sample users
INSERT INTO users (email, name, role) VALUES
('admin@church.org', 'Church Administrator', 'admin'),
('finance@church.org', 'Finance Committee Chair', 'finance_committee'),
('pastor@church.org', 'Senior Pastor', 'ministry_leader'),
('treasurer@church.org', 'Church Treasurer', 'finance_committee');

-- Sample income transactions (using category IDs from seed data)
INSERT INTO income_transactions (amount, description, category_id, transaction_date, recorded_by, payment_method, notes) VALUES
(2500.00, 'Sunday Service Tithe Collection', 1, '2024-01-07', 1, 'cash', 'Regular Sunday collection'),
(800.00, 'General Offering', 2, '2024-01-07', 1, 'cash', 'Sunday service offering'),
(1200.00, 'Building Fund Special Offering', 3, '2024-01-14', 1, 'check', 'Special collection for building repairs'),
(500.00, 'Anonymous Donation', 4, '2024-01-15', 1, 'bank_transfer', 'Online donation received');

-- Sample expense transactions
INSERT INTO expense_transactions (amount, description, category_id, transaction_date, recorded_by, payment_method, vendor, notes) VALUES
(450.00, 'Monthly Electricity Bill', 10, '2024-01-05', 1, 'bank_transfer', 'City Electric Company', 'January utility bill'),
(200.00, 'Office Supplies Purchase', 14, '2024-01-10', 1, 'check', 'Office Depot', 'Printer paper, pens, folders'),
(300.00, 'Sound System Maintenance', 11, '2024-01-12', 1, 'cash', 'Audio Tech Services', 'Quarterly maintenance check');

-- Sample budget request
INSERT INTO budget_requests (title, description, requested_amount, requested_by, ministry_department, purpose, timeline_start, timeline_end, status) VALUES
('Youth Ministry Summer Camp', 'Budget request for annual youth summer camp including transportation, accommodation, and activities', 3500.00, 3, 'Youth Ministry', 'Annual summer camp for 25 youth members', '2024-06-15', '2024-06-22', 'pending');

-- Sample assets
INSERT INTO assets (name, description, category, purchase_date, purchase_price, current_value, condition, location, notes) VALUES
('Sound System - Main Sanctuary', 'Professional audio system with microphones and speakers', 'Audio Equipment', '2022-03-15', 8500.00, 7000.00, 'good', 'Main Sanctuary', 'Under warranty until March 2025'),
('Church Van', '15-passenger van for ministry transportation', 'Vehicles', '2021-08-20', 35000.00, 28000.00, 'good', 'Church Parking Lot', 'Regular maintenance required'),
('Office Computer', 'Desktop computer for church administration', 'Office Equipment', '2023-01-10', 1200.00, 900.00, 'excellent', 'Church Office', 'Windows 11, Office Suite installed');
